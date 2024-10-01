
<template>
  <div class="container user-from animate__animated animate__fadeIn">
    <div class="card p-4">
      <h3 class="mb-4">User Registration</h3>
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <div class="form-group mb-3">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="name" placeholder="Enter your name" required />
        </div>
        <div class="form-group mb-3">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" required />
        </div>
        <div class="form-group mb-3">
          <label for="cv">Upload CV</label>
          <input type="file" class="form-control" id="cv" @change="handleFileUpload" required />
        </div>
        <button type="submit" class="btn w-100">Register</button>
      </form>
      <!-- Display the error message if any -->
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      cvFile: null, // Store the selected CV file
      status: "pending", // Initial status set to pending
      errorMessage: "", // To store error messages
    };
  },
  methods: {
    // Method to handle file selection
    handleFileUpload(event) {
      this.cvFile = event.target.files[0]; // Save the selected file
    },
    async handleSubmit() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("status", this.status);
      formData.append("cv", this.cvFile); // Append the CV file

      try {
        const response = await fetch("http://192.168.15.205:8000/api/form-submit", {
          method: "POST",
          body: formData,
        });

        // Log response as text to inspect the actual response from the server
        const resultText = await response.text();
        console.log("Raw response:", resultText);

        // Attempt to parse JSON if possible
        let result;
        try {
          result = JSON.parse(resultText);
        } catch (e) {
          console.error("Failed to parse JSON:", e);
          this.errorMessage = "Server returned an unexpected response.";
          return;
        }

        if (response.ok && result.success) {
          alert(`Registration successful!`);
          this.$router.push({ name: "login" });
        } else {
          // Handle validation errors like duplicate email
          if (result.data && result.data.includes("The email has already been taken.")) {
            this.errorMessage = "This email is already registered.";
          } else {
            this.errorMessage = result.message || "Registration failed!";
          }
        }
      } catch (error) {
        console.error("Error during registration:", error);
        this.errorMessage = "There was a network error. Please try again.";
      }
    },
  },
};
</script>



<style scoped>
.user-from {
  max-width: 400px;
  margin: 150px auto 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
button{
  /* background-color: #dcdfe1 !important;
  color: #233446 !important; */
  background-color: #d7f5fc !important;
  color: #03c3ec !important;
  border: none;
}
button:hover{
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>

