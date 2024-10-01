<template>
  <div>
    <h2 class="result">Quiz Results</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Quiz Title</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in filteredResults" :key="result.quizId">
          <td>{{ result.quizTitle }}</td>
          <td>{{ result.score }}%</td>
          <td>{{ result.date || 'N/A' }}</td> <!-- Display date or 'N/A' if not available -->
        </tr>
        <tr v-if="filteredResults.length === 0">
          <td colspan="3" class="text-center">No results available.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: [],
      studentId: "a911", // Ensure this matches the ID of the logged-in student
    };
  },
  computed: {
    filteredResults() {
      // Filter results based on the logged-in student's ID
      return this.results.filter(result => result.studentId === this.studentId);
    },
  },
  created() {
    this.fetchResults();
  },
  methods: {
    async fetchResults() {
      try {
        const response = await fetch('http://localhost:3000/attempts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.results = data; // Store results fetched from the API
      } catch (error) {
        console.error('Error fetching quiz results:', error);
      }
    },
  },
};
</script>

<style scoped>
.result{
  background-color: #e8fadf;
    border-color: #d4f5c3;
    color: #71dd37;
    width: 473px;
    padding: 23px;
    border-radius: 16px;
}
.table {
  margin-top: 20px;
}
</style>
