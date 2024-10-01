<!-- <template>
    <div class="reset-password-container animate__animated animate__fadeIn">
      <h2>Reset Your Password</h2>
      <form @submit.prevent="resetPassword">
        <div class="form-group">
          <label for="password">New Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Enter new password"
            required
          />
        </div>
        <div class="form-group mt-3">
          <label for="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="form-control"
            placeholder="Confirm your new password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary mt-3">Reset Password</button>
      </form>
    </div>
  </template>
   -->
  <template>
    <div class="reset-password-container animate__animated animate__fadeIn">
      <h2>Reset Your Password</h2>
      <form @submit.prevent="resetPassword">
        <div class="form-group">
          <label for="password">New Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Enter new password"
            required
          />
        </div>
        <div class="form-group mt-3">
          <label for="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="form-control"
            placeholder="Confirm your new password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary mt-3">Reset Password</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        password: '',
        confirmPassword: '',
        email: this.$route.params.email || '', // Capture email from route
        token: this.$route.params.token || '', // Capture token from route
      };
    },
    methods: {
      async resetPassword() {
  if (this.password !== this.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const response = await axios.post(`http://192.168.15.205:8000/api/set-password/${this.email}/${this.token}`, {
      password: this.password,
    });

    if (response.data.success) {
      alert('Password reset successfully!');
      this.$router.push({ name: 'login' }); // Redirect to login
    } else {
      alert('Failed to reset password');
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    alert('An error occurred. Please try again.');
  }
}

    },
  };
  </script>
  
  
  <style scoped>

  .reset-password-container {
    max-width: 400px;
    margin: 140px auto 50px auto;
    padding: 35px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  button{
    background-color: #d7f5fc !important;
    color: #03c3ec !important;
    border: none;
  }
  button:hover{
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  
<!-- 
   <template>
    <div class="reset-password-container animate__animated animate__fadeIn">
      <h2>Reset Your Password</h2>
      <form @submit.prevent="resetPassword">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">New Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Enter new password"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="form-control"
            placeholder="Confirm your new password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Reset Password</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '', // Add email data property
        password: '',
        confirmPassword: '',
        token: this.$route.params.token || '', // Token passed via route params
      };
    },
    methods: {
      async resetPassword() {
        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
  
        try {
          const response = await axios.post('http://192.168.15.205:8000/api/reset-password', {
            token: this.token,
            email: this.email, // Include email in the request
            password: this.password,
          });
  
          if (response.data.success) {
            alert('Password reset successfully!');
            this.$router.push({ name: 'login' }); // Redirect to login
          } else {
            alert('Failed to reset password');
          }
        } catch (error) {
          console.error('Error resetting password:', error);
          alert('An error occurred. Please try again.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
 .reset-password-container {
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
   -->