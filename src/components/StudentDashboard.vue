<template>
  <div class="container">
    <div class="dash">
      <h2>Student Dashboard</h2>
    </div>

    <!-- Assigned Quizzes Table -->
    <div class="dash-assigned m-3">
      <h3>Assigned Quizzes</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Quiz Title</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="quiz in assignedQuizzes" :key="quiz.id">
            <td>{{ quiz.title }}</td>
            <td>{{ quiz.dueDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pending Quizzes Table -->
    <div class="dash-pendi m-3">
      <h3>Pending Quizzes</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Quiz Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="quiz in pendingQuizzes" :key="quiz.id">
            <td>{{ quiz.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Attempted Quizzes Table -->
    <div class="dash-attemp m-3">
      <h3>Attempted Quizzes</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Quiz Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="quiz in attemptedQuizzes" :key="quiz.id">
            <td>{{ quiz.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    quizzes: Array,
  },
  computed: {
    assignedQuizzes() {
      return this.quizzes.filter(quiz => quiz.assignedTo.includes(3));
    },
    pendingQuizzes() {
      return this.quizzes.filter(quiz => !quiz.assignedTo.includes(3) && !quiz.attempted);
    },
    attemptedQuizzes() {
      return this.quizzes.filter(quiz => quiz.attempted);
    },
  },
};
</script>

<style scoped>
.dash {
  background-color: #e7e7ff;
  border-color: #d2d3ff;
  color: #696cff;
  width: 100%;
  padding: 23px;
  border-radius: 16px;
}

.table {
  background-color: #f8f9fa; /* Light background for tables */
}

.m-3 h3 {
  background-color: #dcdfe1;
  border-color: #bdc2c8;
  color: #233446;
 
    padding: 23px;
    border-radius: 16px;
  box-shadow: 0 2px 6px 0 rgb(67 89 113 / 90%);
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
