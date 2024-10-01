<template>
    <div class="forgot-password-container animate__fadeIn animate__animated">
      <h2>Forgot Password</h2>
      <form @submit.prevent="submitForgotPassword">
        <div class="form-group">
          <label for="email">Enter your registered email</label>
          <input type="email" id="email" v-model="email" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary mt-3">Reset Password</button>
      </form>
  
      <div v-if="message" class="alert mt-2" :class="{'alert-success': success, 'alert-success': !success}">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        message: '',
        success: false,  // For conditional styling of message
      };
    },
    methods: {
        async submitForgotPassword() {
  try {
    const response = await axios.post('http://192.168.15.205:8000/api/reset-password', {
      email: this.email,
    });
    if (response.data.success) {
      this.success = true;
      this.message = 'Password reset link sent successfully. Check your email.';
    } else {
      this.success = false;
      this.message = response.data.message || 'Failed to send reset link. Please try again.';
    }
  } catch (error) {
    console.error('Error submitting forgot password request:', error.response ? error.response.data : error);
    this.success = false;
    this.message = error.response?.data?.message || 'An error occurred. Please try again later.';
  }
}

    },
  };
  </script>
  
  <style scoped>
  .forgot-password-container {
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
  
