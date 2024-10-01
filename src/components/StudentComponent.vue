<template>
  <div v-if="activeTab === 'students'">
    <button class="btn btn-secondary mb-3 back" @click="$emit('backToMain')">
      <img src="../assets/back.png" alt="" srcset="">
    </button>

    <div class="container">
      <h2 class="head mb-5">Student Management</h2>

      <div class="filter-container mb-3">
        <label for="filterStatus">Filter by status:</label>
        <select v-model="filterStatus" class="dropdown-toggle">
          <option value="all">All</option>
          <option value="accepted">Approved</option>
          <option value="pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <!-- Student Table -->
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Student</th>
            <th>Email</th>
            <th>Profile</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in filteredStudents" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>
              <img :src="student.avatar || 'https://via.placeholder.com/40'" class="rounded-circle me-2" width="40" height="40" />
            </td>
            <td>
              <span :class="statusClass(student.status)">{{ capitalize(student.status) }}</span>
            </td>
            <td class="btn-wrapper">
              <button class="select btn btn-success" @click="approveStudent(student.id)" :disabled="student.status !== 'pending'">Approve</button>
              <button class="reject btn btn-danger" @click="rejectStudent(student.id)" :disabled="student.status !== 'pending'">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>


      <div class="quiz-creation mt-5">
      <h3>Create New Quiz</h3>
      <form @submit.prevent="saveQuiz">
        <div class="mb-3">
          <label for="quizName">Quiz Name:</label>
          <input type="text" v-model="quiz.title" id="quizName" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="quizDuration">Duration (minutes):</label>
          <input type="number" v-model="quiz.duration" id="quizDuration" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="totalMarks">Total Marks:</label>
          <input type="number" v-model="quiz.totalMarks" id="totalMarks" class="form-control" required />
        </div>

        <!-- Dynamic Questions -->
        <div v-for="(question, index) in quiz.questions" :key="index" class="question-group mb-3">
          <label>Question {{ index + 1 }}:</label>
          <input type="text" v-model="question.question_text" placeholder="Enter question" class="form-control" required />

          <label>Options:</label>
          <div v-for="(option, optIndex) in question.options" :key="optIndex" class="input-group mb-2">
            <input type="text" v-model="question.options[optIndex]" class="form-control" placeholder="Option" required />
            <button @click.prevent="removeOption(index, optIndex)" class="btn btn-danger">Remove Option</button>
          </div>

          <button @click.prevent="addOption(index)" class="btn btn-secondary mb-3">Add Option</button>
          <br>
          <label for="correctAnswer">Select Correct Answer:</label>
          <select v-model="question.answer" class="form-control w-25" required>
            <option disabled value="">Select the correct answer</option>
            <option v-for="(opt, optIndex) in question.options" :key="optIndex" :value="opt">{{ opt }}</option>
          </select>
          <label>Marks:</label>
          <input type="number" v-model="question.marks" placeholder="Marks for this question" class="form-control" />
        </div>

        <div class="row">
          <button @click.prevent="addQuestion" class="btn btn-primary mb-3">Add Question</button>
  
          <button type="submit" class="btn btn-success">Save Quiz</button>
        </div>
      </form>
    </div>

      <!-- Quiz Selection Dropdown -->
      <div class="quiz-selection mt-4">
        <h3>Select Quiz Subject</h3>
        <select v-model="selectedQuiz" @change="loadStudentsForQuiz" class="quiz-select">
          <option value="" disabled>Select a quiz</option>
          <option v-for="quiz in quizSubjects" :key="quiz.id" :value="quiz.id">{{ quiz.quiz_name }}</option>
        </select>
      </div>

      <!-- Approved Students Table for Quiz Assignment -->
      <div v-if="selectedQuiz" class="student-assignment mt-4">
        <h4>Available Approved Students for Selected Quiz</h4>
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Student ID</th>
              <th scope="col">Select</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in approvedStudents" :key="student.student_id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ student.student_id }}</td>
              <td>
                <input type="checkbox" :value="student.student_id" v-model="selectedStudents" />
              </td>
              <td>{{ student.name }}</td>
              <td>{{ student.email }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="assignQuizToStudents" class="assign-btn btn btn-primary">Assign Quiz</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      students: [],
      selectedQuiz: '',
      selectedStudents: [],
      filterStatus: 'all',
      token: localStorage.getItem('token'),
      activeTab: 'students',
      quizSubjects: [],
      approvedStudents: [],

      quiz: {
        title: "",
        duration: "", // Duration in minutes
        totalMarks: "", // Total marks for the quiz
        questions: [
          {
            question_text: "",
            options: ["", ""], // Minimum two options
            answer: "", // Correct answer
            marks: 0, // Marks for this question
          },
        ],
      },
    };
  },

  mounted() {
    if (!this.token) {
      alert('Unauthorized. Please log in.');
      this.$router.push({ name: 'login' });
    } else {
      this.fetchStudents();
      this.fetchQuizzes();
    }
  },

  computed: {
    filteredStudents() {
      if (this.filterStatus === 'all') return this.students;
      return this.students.filter((student) => student.status.toLowerCase() === this.filterStatus.toLowerCase());
    },
  },

  methods: {
    capitalize(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    async fetchStudents() {
      try {
        const response = await axios.get('http://192.168.15.205:8000/api/show-students', {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        if (response.data.success) {
          this.students = response.data.data;
        } else {
          alert('Failed to fetch students.');
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        if (error.response && error.response.status === 401) {
          alert('Unauthorized. Please check your token.');
          this.$router.push({ name: 'login' });
        }
      }
    },

    async fetchQuizzes() {
      try {
        const response = await axios.get('http://192.168.15.205:8000/api/show-quiz', {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        if (response.data.success) {
          this.quizSubjects = response.data.data;
        } else {
          alert('Failed to fetch quizzes.');
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        alert('Error while fetching quizzes.');
      }
    },

    addQuestion() {
      this.quiz.questions.push({
        question_text: "",
        options: ["", ""],
        answer: "",
        marks: 0,
      });
    },
    removeOption(questionIndex, optionIndex) {
      this.quiz.questions[questionIndex].options.splice(optionIndex, 1);
    },

    // Method to add an option to a specific question
    addOption(questionIndex) {
      this.quiz.questions[questionIndex].options.push("");
    },

    async assignQuizToStudents() {
      if (this.selectedStudents.length === 0) {
        alert('Please select at least one student to assign the quiz.');
        return;
      }

      for (const studentId of this.selectedStudents) {
        try {
          const url = `http://192.168.15.205:8000/api/assign-quiz/${this.selectedQuiz}/${studentId}`;
          const response = await axios.post(url, null, {
            headers: { Authorization: `Bearer ${this.token}` },
          });

          if (response.data.success) {
            alert(`Quiz assigned to student ID ${studentId} successfully!`);
          } else {
            alert(`Failed to assign quiz to student ID ${studentId}.`);
          }
        } catch (error) {
          console.error(`Error assigning quiz to student ID ${studentId}:`, error);
          alert(`Error while assigning quiz to student ID ${studentId}: ${error.message}`);
        }
      }
    },

    loadStudentsForQuiz() {
      this.approvedStudents = this.students.filter(student => student.status === 'accepted');

      if (this.approvedStudents.length === 0) {
        alert('No approved students available for this quiz.');
      }
    },

    statusClass(status) {
      switch (status.toLowerCase()) {
        case 'accepted':
          return 'badge bg-success accepted';
        case 'pending':
          return 'badge bg-warning pending';
        case 'rejected':
          return 'badge bg-danger rejected';
        default:
          return 'badge bg-secondary';
      }
    },

    async approveStudent(studentId) {
      try {
        const response = await axios.post(`http://192.168.15.205:8000/api/accept-form/${studentId}`, null, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        if (response.data.message && response.data.message.toLowerCase().includes('success')) {
          const studentIndex = this.students.findIndex(s => s.id === studentId);
          if (studentIndex !== -1) {
            this.students[studentIndex].status = 'accepted';
          }
          alert('Student approved successfully.');
        } else {
          alert('Failed to approve student.');
        }
      } catch (error) {
        alert('Error while approving student.');
      }
    },

    async rejectStudent(studentId) {
      try {
        const response = await axios.post(`http://192.168.15.205:8000/api/reject-form/${studentId}`, null, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        if (response.data.message && response.data.message.toLowerCase().includes('success')) {
          const studentIndex = this.students.findIndex(s => s.id === studentId);
          if (studentIndex !== -1) {
            this.students[studentIndex].status = 'rejected';
          }
          alert('Student rejected successfully.');
        } else {
          alert('Failed to reject student.');
        }
      } catch (error) {
        alert('Error while rejecting student.');
      }
    },
    async saveQuiz() {
      if (!this.quiz.title || this.quiz.questions.length === 0) {
        alert("Please fill in all required fields.");
        return;
      }

      const quizData = {
        quiz_name: this.quiz.title,
        duration: this.quiz.duration,
        total_marks: this.quiz.totalMarks,
      };

      try {
        const response = await axios.post("http://192.168.15.205:8000/api/add-quiz", quizData, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        if (response.data.success) {
          const quizId = response.data.data.id;

          // Add the quiz to the local list
          this.quizSubjects.unshift(response.data.data);

          // Loop through questions and add each to the quiz
          for (const question of this.quiz.questions) {
            const questionData = {
              question_text: question.question_text,
              options: question.options,
              answer: question.answer,
              marks: question.marks,
            };
            await this.addQuestionToQuiz(quizId, questionData);
          }

          alert("Quiz saved successfully!");
          this.resetForm();
        } else {
          alert("Failed to save quiz.");
        }
      } catch (error) {
        console.error("Error saving quiz:", error);
        alert("An error occurred while saving the quiz.");
      }
    },

    // Method to add a question to a quiz
    async addQuestionToQuiz(quizId, questionData) {
      try {
        await axios.post(`http://192.168.15.205:8000/api/add-question/${quizId}`, questionData, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
      } catch (error) {
        console.error("Error adding question:", error);
        alert("An error occurred while adding a question.");
      }
    },

    // Reset the quiz form after successful submission
    resetForm() {
      this.quiz = {
        title: "",
        duration: "",
        totalMarks: "",
        questions: [
          {
            question_text: "",
            options: ["", ""],
            answer: "",
            marks: 0,
          },
        ],
      };
    },
  },
};
</script>
<style scoped>
body {
  background-color: antiquewhite !important
}

.welcome {
  margin-top: 34px;
  padding: 32px;
  box-shadow: 0 .1875rem .5rem 0 rgba(34, 48, 66, .1);
}

.welcome img {
  max-width: 164px;

}

.dashboard {
  padding: 20px;
}

.button-container {
  margin: 20px 0;
}

.filter-container {
  margin-bottom: 20px;
}

.card {
  margin-top: 20px;
}

.table {
  margin-top: 20px;
}

/* ------------------ */

.education {
  --bg-color: #ffd861;
  --bg-color-light: #ffeeba;
  --text-color-hover: #4C5656;
  --box-shadow-color: rgba(255, 215, 97, 0.48);
}

.human-resources {
  --bg-color: #DCE9FF;
  --bg-color-light: #f1f7ff;
  --text-color-hover: #4C5656;
  --box-shadow-color: rgba(220, 233, 255, 0.48);
}

.card {
  height: 222px;
  background: #fff;
  border-top-right-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease-out;
  text-decoration: none;
}

.card:hover {
  transform: translateY(-5px) scale(1.005) translateZ(0);
  box-shadow: 0 24px 36px rgba(0, 0, 0, 0.11),
    0 24px 46px var(--box-shadow-color);
}

.card:hover .overlay {
  transform: scale(4) translateZ(0);
}

.card:hover .circle {
  border-color: var(--bg-color-light);
  background: var(--bg-color);
}

.card:hover .circle:after {
  background: var(--bg-color-light);
}

.card:hover p {
  color: var(--text-color-hover);
}

.card:active {
  transform: scale(1) translateZ(0);
  box-shadow: 0 15px 24px rgba(0, 0, 0, 0.11),
    0 15px 24px var(--box-shadow-color);
}

.card p {
  font-size: 17px;
  color: #4C5656;
  margin-top: 30px;
  z-index: 1000;
  transition: color 0.3s ease-out;
}

.circle {
  width: 131px;
  height: 131px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease-out;
}

.circle:after {
  content: "";
  width: 118px;
  height: 118px;
  display: block;
  position: absolute;
  background: var(--bg-color);
  border-radius: 50%;
  top: 7px;
  left: 7px;
  transition: opacity 0.3s ease-out;
}

.circle svg {
  z-index: 10000;
  transform: translateZ(0);
}

.overlay {
  width: 118px;
  position: absolute;
  height: 118px;
  border-radius: 50%;
  background: var(--bg-color);
  top: 12px;
  left: 235px;
  z-index: 0;
  transition: transform 0.3s ease-out;
}

.back img {
  width: 26px;
}

.pending {
  background-color: #fff2d6 !important;
  color: #ffab00 !important;
}

.accepted {
  background-color: #e8fadf !important;
  color: #71dd37 !important;
}

span {
  color: #646e78;
}

.head {
  background-color: #e7e7ff !important;
  color: #696cff !important;
  width: 389px;
  height: 64px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 23px;
}

.back {
  width: 40px;
  background-color: #d7f5fc !important;
  border: none;
}

.manager-btn {
  color: #fff;
  background-color: #696cff;
  border-color: #696cff;
  box-shadow: 0 .125rem .25rem 0 rgba(105, 108, 255, .4);
  margin-top: 7px;
  width: 109px;
}

.btn-wrapper {
  display: flex;
  gap: 10px;
}

select {
  border: none;
  justify-content: center;
  background: #5f61e6;
  color: white;
  height: 37px;
  width: 102px;
  border-radius: 10px;
  box-shadow: 0 .125rem .25rem 0 rgba(105, 108, 255, .4);
}
.option-select-from select{
  border: none;
  justify-content: center;
  background: #5f61e6;
  color: white;
  height: 37px;
  border-radius: 10px;
  box-shadow: 0 .125rem .25rem 0 rgba(105, 108, 255, .4);
}

.rejected {
  background-color: #ffe0db !important;
  color: #ff3e1d !important;
}

.quiz-assignment select {
  width: 241px;
}

.quiz-wrapper {
  margin-top: 15px;
}

.assign-btn {
  color: #fff;
  background-color: #ff3e1d;
  border-color: #ff3e1d;
  box-shadow: 0 1px 20px 1px #ff3e1d;
  width: 117px;
  border-radius: 8px;
}
.quiz-select{
  width: 236px;
}
</style>