<template>
  <DashboardLayout>
    <div v-if="role === 'admin' && mockUser.admin">
      <AdminPanel :user="mockUser.admin" />
    </div>
    <div v-else-if="role === 'manager' && mockUser.manager">
      <ManagerPanel :user="mockUser.manager" />
    </div>
    <div v-else-if="role === 'student' && mockUser.student">
      <StudentPanel :user="mockUser.student" />
    </div>
    <div v-else-if="role === 'supervisor' && mockUser.supervisor">
      <SupervisorPanel :user="mockUser.supervisor" />
    </div>
    <div v-else>
      <ErrorPage />
    </div>
  </DashboardLayout>
</template>

<script>
import { userData } from '../mocks/userData';
import AdminPanel from '@/components/AdminPanel.vue';
import ManagerPanel from '@/components/ManagerPanel.vue';
import StudentPanel from '@/components/StudentPanel.vue';
import SupervisorPanel from '@/components/SupervisorPanel.vue'; // Ensure the correct spelling
import ErrorPage from '@/views/ErrorPage.vue';

export default {
  components: {
    AdminPanel,
    ManagerPanel,
    StudentPanel,
    SupervisorPanel, // Ensure the correct spelling here too
    ErrorPage,
  },
  data() {
    return {
      role: this.$route.params.role,
      mockUser: userData,
    };
  },
};
</script>
