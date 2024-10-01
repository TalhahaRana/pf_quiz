<template>
  <div class="container">
    <!-- Display list of available quizzes if none has been started -->
    <div v-if="quizzes && !quizStarted && !quizEnded" class="available">
      <h2>Select available quiz to attempt:</h2>
      <div v-for="(quizItem, index) in quizzes" :key="index" class="quiz-item mt-3">
        <h4>{{ quizItem.quiz_name }}</h4>
        <button @click="selectQuiz(quizItem)" class="btn btn-secondary m-2">Start {{ quizItem.quiz_name }}</button>
      </div>
    </div>

    <!-- Show message if no quiz is available -->
    <div v-else-if="!quizzes && !quizStarted && !quizEnded" class="not-available">
      <h2>No quizzes available.</h2>
    </div>

    <!-- Quiz and Video Recording Display -->
    <div v-if="quizStarted && quiz && !quizEnded">
      <h2 class="start-quiz">{{ quiz.quiz_name }}</h2>
      <div class="video-container">
        <video ref="video" width="300" autoplay></video>
      </div>

      <transition name="slide-right" mode="out-in">
        <div v-if="currentQuestion" class="card p-4 m-2" :key="currentQuestionIndex">
          <h5>{{ currentQuestion.question_text }}</h5>

          <!-- Display options -->
          <div v-for="(option, index) in currentQuestion.options" :key="index" class="m-2">
            <input type="radio" :value="option" v-model="answers[currentQuestionIndex]" class="form-check-input"
              :id="'option' + index" @change="submitAnswer(currentQuestionIndex, option)" />
            <label class="form-check-label" :for="'option' + index">{{ option }}</label>
          </div>

          <!-- Next Question Button -->
          <button @click="nextQuestion" class="btn btn-primary mt-3" v-if="!isLastQuestion">Next Question</button>

          <!-- Submit Quiz Button -->
          <button @click="submitQuiz" class="btn btn-secondary mt-3" v-if="isLastQuestion">Submit Quiz</button>
        </div>
      </transition>
    </div>

    <!-- Quiz Ended Message -->
    <div v-if="quizEnded" class="end-quiz">
      <h2>Quiz Ended</h2>
      <p>Your quiz has been submitted, and the video recording has been saved.</p>
    </div>
  </div>
</template>
<!-- <script>
import axios from "axios";

export default {
  data() {
    return {
      quizzes: [],
      quiz: null,
      quizStarted: false,
      quizEnded: false,
      currentQuestionIndex: 0,
      answers: {},
      mediaRecorder: null,
      recordedChunks: [],
      isRecording: false,
    };
  },
  computed: {
    currentQuestion() {
      const question = this.quiz && this.quiz.questions
        ? this.quiz.questions[this.currentQuestionIndex]
        : null;
      return question;
    },
    isLastQuestion() {
      return (
        this.quiz &&
        this.quiz.questions &&
        this.currentQuestionIndex === this.quiz.questions.length - 1
      );
    },
  },
  mounted() {
    this.fetchQuizzes();
  },
  methods: {
    async fetchQuizzes() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found. Please login.");
        return;
      }

      try {
        const response = await axios.get('http://192.168.15.205:8000/api/student/show-quiz', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.quizzes = response.data.data || [];
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    },

    async loadQuizQuestions(quizId) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found. You may not be logged in.');
        return;
      }

      try {
        const response = await axios.get(`http://192.168.15.205:8000/api/quiz/show-quiz/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.success) {
          this.quiz = { ...this.quiz, questions: response.data.data || [] };
        } else {
          console.error('No questions found for the quiz.');
        }
      } catch (error) {
        console.error('Error loading quiz questions:', error);
      }
    },

    async selectQuiz(quiz) {
      this.quiz = quiz;
      await this.startAttempt();
      if (this.quizStarted) {
        await this.loadQuizQuestions(quiz.id);
      }
    },

    async startAttempt() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(`http://192.168.15.205:8000/api/start-quiz/${this.quiz.id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          this.quizStarted = true;
          this.startRecording();
        } else {
          console.error("Quiz already started or completed");
        }
      } catch (error) {
        console.error("Error starting the quiz:", error);
      }
    },

    async submitAnswer(questionIndex, selectedOption) {
      const question = this.currentQuestion;
      if (!question) return;

      const adjustedIndex = questionIndex + 1;

      try {
        const response = await axios.post(
          `http://192.168.15.205:8000/api/answer-quiz/${this.quiz.id}/${adjustedIndex}`,
          { selected_option: selectedOption },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        if (response.data.success) {
          console.log("Answer submitted successfully:", response.data.message);
        } else {
          console.error("Failed to submit answer:", response.data.message);
        }
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    },

    nextQuestion() {
      if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
        this.currentQuestionIndex += 1;
      }
    },

    startRecording() {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.$refs.video.srcObject = stream;
        this.mediaRecorder.start();

        this.mediaRecorder.ondataavailable = (event) => {
          this.recordedChunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          console.log("Video recording saved:", url);
        };
      }).catch((error) => {
        console.error("Error accessing media devices:", error);
      });
    },

    stopRecording() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        console.log("Recording stopped...");
      }
    },

    async submitQuiz() {
      console.log("Submitting quiz...");

      this.stopRecording(); // Stop the recording first

      // Create a Blob from the recorded chunks
      const videoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const formData = new FormData();
      formData.append('video', videoBlob, 'quiz-video.webm'); // Video file

      const quizId = this.quiz.id;

      const status = 'completed';

      formData.append('quiz_id', quizId);
      formData.append('student_id', studentId);
      formData.append('status', status);

      // Log the data being sent to ensure it’s correct
      console.log('Form Data:', {
        quiz_id: quizId,
        student_id: studentId,
        status: status,
        video: videoBlob,
      });

      const token = localStorage.getItem('token');

      try {
        const response = await axios.post(
          `http://192.168.15.205:8000/api/end-quiz/${quizId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.data.success) {
          this.quizEnded = true;
          console.log("Quiz ended successfully:", response.data.message);
        } else {
          console.error("Failed to end quiz:", response.data.message);
        }
      } catch (error) {
        console.error("Error ending the quiz:", error.response ? error.response.data : error.message);
      }
    }


  },
};
</script> -->
<script>
import axios from "axios";

export default {
  data() {
    return {
      quizzes: [],
      quiz: null,
      quizStarted: false,
      quizEnded: false,
      currentQuestionIndex: 0,
      answers: {},
      mediaRecorder: null,
      recordedChunks: [],
      isRecording: false,
    };
  },
  computed: {
    currentQuestion() {
      return this.quiz?.questions?.[this.currentQuestionIndex] || null;
    },
    isLastQuestion() {
      return (
        this.quiz &&
        this.quiz.questions &&
        this.currentQuestionIndex === this.quiz.questions.length - 1
      );
    },
  },
  mounted() {
    this.fetchQuizzes();
  },
  methods: {
    async fetchQuizzes() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found. Please login.");
        return;
      }

      try {
        const response = await axios.get('http://192.168.15.205:8000/api/student/show-quiz', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.quizzes = response.data.data || [];
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    },

    async loadQuizQuestions(quizId) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found. You may not be logged in.');
        return;
      }

      try {
        const response = await axios.get(`http://192.168.15.205:8000/api/quiz/show-quiz/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.success) {
          this.quiz.questions = response.data.data || [];
        } else {
          console.error('No questions found for the quiz.');
        }
      } catch (error) {
        console.error('Error loading quiz questions:', error);
      }
    },

    async selectQuiz(quiz) {
      this.quiz = quiz;
      await this.startAttempt();
      if (this.quizStarted) {
        await this.loadQuizQuestions(quiz.id);
      }
    },

    async startAttempt() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(`http://192.168.15.205:8000/api/start-quiz/${this.quiz.id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          this.quizStarted = true;
          this.startRecording();
        } else {
          console.error("Quiz already started or completed");
        }
      } catch (error) {
        console.error("Error starting the quiz:", error);
      }
    },

    async submitAnswer(questionIndex, selectedOption) {
      const question = this.currentQuestion;
      if (!question) return;

      try {
        const response = await axios.post(
          `http://192.168.15.205:8000/api/answer-quiz/${this.quiz.id}/${questionIndex + 1}`, 
          { selected_option: selectedOption },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        if (response.data.success) {
          console.log("Answer submitted successfully");
        } else {
          console.error("Failed to submit answer:", response.data.message);
        }
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    },

    nextQuestion() {
      if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
        this.currentQuestionIndex += 1;
      }
    },

    startRecording() {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.$refs.video.srcObject = stream;
          this.mediaRecorder.start();

          this.mediaRecorder.ondataavailable = (event) => {
            this.recordedChunks.push(event.data);
          };

          this.mediaRecorder.onstop = () => {
            const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            console.log("Video recording saved:", url);
          };
        })
        .catch((error) => {
          console.error("Error accessing media devices:", error);
        });
    },

    async submitQuiz() {
      this.stopRecording();
      const videoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const formData = new FormData();
      formData.append('video', videoBlob, 'quiz-video.webm');
      formData.append('quiz_id', this.quiz.id);
      formData.append('student_id', 'FCCU2');
      formData.append('status', 'completed');

      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(`http://192.168.15.205:8000/api/end-quiz/${this.quiz.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          this.quizEnded = true;
          console.log("Quiz ended successfully");
        } else {
          console.error("Failed to end quiz:", response.data.message);
        }
      } catch (error) {
        console.error("Error ending the quiz:", error);
      }
    },

    stopRecording() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.recordedChunks = [];
      }
    },
  },
};
</script>

<style>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

/* Slide animation */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s ease;
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(100%);
}

.video-container {
  margin: 20px 0;
}

.available h2 {
  background-color: #fff2d6;
  border-color: #ffe6b3;
  color: #ffab00;
  width: 50%;
  padding: 23px;
  border-radius: 16px;
}

.start-quiz {
  background-color: #fff2d6;
  border-color: #ffe6b3;
  color: #ffab00;
  width: 473px;
  padding: 23px;
  border-radius: 16px;
}

.not-available h2 {
  background-color: #ffe0db;
  border-color: #ffc5bb;
  color: #ff3e1d;
  width: 473px;
  padding: 23px;
  border-radius: 16px;
}

.video-container video {
  border-radius: 16px;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12)
}

.end-quiz .quiz-item h4 {
  background-color: #dcdfe1;
  border-color: #bdc2c8;
  color: #233446;
  padding: 23px;
  border-radius: 18px;
  box-shadow: 0 2px 6px 0 rgb(67 89 113 / 55%)
}

.quiz-item h4 {
  background-color: #dcdfe1;
  border-color: #bdc2c8;
  color: #233446;
  padding: 23px;
  border-radius: 18px;
  box-shadow: 0 2px 6px 0 rgb(67 89 113 / 55%)
}
</style>