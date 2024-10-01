<template>
    <div class="manager-management">
        <button class="btn btn-secondary mb-3 back" @click="$emit('backToMain')">
            <img src="../assets/back.png" alt="Back" />
        </button>

        <div class="container">
            <h2 class="head">Manager Management</h2>

            <h3>Add New Manager</h3>
            <form @submit.prevent="addManager">
                <div class="form-group">
                    <label for="managerName">Manager Name</label>
                    <input type="text" id="managerName" v-model="newManagerName" class="form-control"
                        placeholder="Enter Manager's Name" required />
                </div>

                <div class="form-group">
                    <label for="managerEmail">Manager Email</label>
                    <input type="email" id="managerEmail" v-model="newManagerEmail" class="form-control"
                        placeholder="Enter Manager's Email" required />
                </div>

                <div class="form-group mt-4">
                    <label for="role">
                        <h5>
                            Role
                        </h5>
                    </label>
                    <select v-model="newManagerRole" class="form-control" required>
                        <option value="" disabled>Select Role</option>
                        <option value="manager">Manager</option>
                        <option value="supervisor">Supervisor</option>
                    </select>
                </div>
                <hr>
                <button type="submit" class="btn btn-primary mt-2">Add Manager</button>
            </form>

            <!-- Current Managers List -->
            <h4 class="mt-4">Current Managers</h4>
            <ul class="list-group">
  <li v-for="manager in managers" :key="manager.id" class="list-group-item d-flex justify-content-between align-items-center">
    <div>
      <strong>Name:</strong> {{ manager.name }}<br>
      <strong>Email:</strong> {{ manager.email }}<br>
      <strong>Role:</strong> {{ manager.role }}
    </div>
  </li>
</ul>


        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            activeTab: null,
            managers: [],
            newManagerName: '',
            newManagerEmail: '',
            newManagerRole: '', // Add this to store the selected role
            token: localStorage.getItem('token'),
        };
    },

    mounted() {
        if (!this.token) {
            alert('Unauthorized. Please log in.');
            this.$router.push({ name: 'login' });
        } else {
            this.fetchManagers();
        }
    },


    methods: {

        showManagers() {
            this.activeTab = 'managers';
        },

        capitalize(str) {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        },

        statusClass(status) {
            const normalizedStatus = status.toLowerCase();
            if (normalizedStatus === 'accepted') {
                return 'badge bg-success';
            } else if (normalizedStatus === 'pending') {
                return 'badge bg-warning';
            } else if (normalizedStatus === 'rejected') {
                return 'badge bg-danger';
            }
            return '';
        },

        async addManager() {
            try {
                const response = await axios.post('http://192.168.15.205:8000/api/add-role', {
                    name: this.newManagerName,
                    email: this.newManagerEmail,
                    role: this.newManagerRole,
                }, {
                    headers: { Authorization: `Bearer ${this.token}` },
                });

                if (response.data.success) {
                    console.log('Added Manager:', response.data.data); // Log added manager data
                    const newManager = {
                        id: response.data.data.user.id,
                        name: response.data.data.user.name,
                        email: response.data.data.user.email,
                        role: response.data.data.role,
                    };
                    this.managers.push(newManager);
                    alert(response.data.message);
                    // Clear fields
                    this.newManagerName = '';
                    this.newManagerEmail = '';
                    this.newManagerRole = '';
                } else {
                    alert('Failed to add manager.');
                }
            } catch (error) {
                if (error.response) {
                    console.error('Error response:', error.response);
                    alert(`Error: ${error.response.data.message}`);
                } else {
                    console.error('Error:', error);
                    alert('An unexpected error occurred.');
                }
            }
        },


        async fetchManagers() {
  try {
    const response = await axios.get('http://192.168.15.205:8000/api/show-roles');
    if (response.data.success) {
      console.log('All Roles:', response.data.data); // Log all the data
      this.managers = response.data.data; // Assign all roles without filtering
    }
  } catch (error) {
    console.error('Error fetching managers:', error);
  }
},

        statusClass(status) {
            if (status === 'active') {
                return 'active-class'; // Add your desired class here
            } else if (status === 'inactive') {
                return 'inactive-class'; // Add your desired class here
            }
            return '';
        },


        backToMain() {
            this.activeTab = null;
        },
        created() {
            this.fetchManagers();
        }
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
</style>