<template>
  <div class="container mt-4">
    <div class="card-header">
      <h2>Personal Details Form</h2>
    </div>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              v-model="name"
              class="form-control"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="file" class="form-label">Upload CV</label>
            <input
              type="file"
              @change="onFileChange"
              class="form-control"
              id="file"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      file: null,
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    submitForm() {
      // Handle form submission
      console.log({ name: this.name, email: this.email, file: this.file });
      // Here you can add the logic to send the data to your backend or handle it as required
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 500px; /* Set max width for the card */
  margin: auto; /* Center the card */
}
.card-header h2{
  background-color: #d7f5fc;
    border-color: #b3edf9;
    color: #03c3ec;
  padding: 23px;
  width: 473px;

  border-radius: 16px;
}
</style>
