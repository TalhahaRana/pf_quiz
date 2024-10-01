
// import { createRouter, createWebHistory } from 'vue-router';
// import Login from '@/views/Login.vue';
// import DashboardView from '@/views/DashboardView.vue';
// import UserForm from '../components/UserForm.vue';

// const routes = [
//   { path: '/', redirect: '/login' },
//   { path: '/login', name: 'login', component: Login },
//   { path: '/dashboard/:role', name: 'dashboard', component: DashboardView }, // Updated this line
//   // Add other routes as necessary
//   { path: '/signup', name: 'signup', component: UserForm },
// ];

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

// export default router;


import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import DashboardView from '@/views/DashboardView.vue';
import UserForm from '../components/UserForm.vue';
import ForgotPassword from '../components/ForgotPassword.vue';
import ResetPassword from '../components/ResetPassword.vue';

// const routes = [
//   { path: '/', redirect: '/login' },
//   { path: '/login', name: 'login', component: Login },
//   { path: '/dashboard/:role', name: 'dashboard', component: DashboardView }, // Updated this line
//   { path: '/signup', name: 'signup', component: UserForm },
//   { path: '/forgot-password',name: 'forgotPassword',component: ForgotPassword,},
//   { path: '/reset-password/:email/:token', name: 'resetPassword', component: ResetPassword },
// ];


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/dashboard/:role',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true } // Add requiresAuth meta
  },
  { path: '/signup', name: 'signup', component: UserForm },
  { path: '/forgot-password', name: 'forgotPassword', component: ForgotPassword },
  { path: '/reset-password/:email/:token', name: 'resetPassword', component: ResetPassword },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Ensure this middleware redirects unauthenticated users to the login page
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;