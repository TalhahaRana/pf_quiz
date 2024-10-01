// export default {
//     state: {
//       user: null,
//       role: null,
//       token: localStorage.getItem('token') || null,
//     },
//     mutations: {
//       setUser(state, user) {
//         state.user = user;
//         state.role = user.role;  // 'admin', 'manager', 'student'
//       },
//       setToken(state, token) {
//         state.token = token;
//         localStorage.setItem('token', token);
//       },
//       logout(state) {
//         state.user = null;
//         state.token = null;
//         localStorage.removeItem('token');
//       },
//     },
//     actions: {
//       login({ commit }, { user, token }) {
//         commit('setUser', user);
//         commit('setToken', token);
//       },
//       logout({ commit }) {
//         commit('logout');
//       },
//     },
//     getters: {
//       isAuthenticated: state => !!state.token,
//       userRole: state => state.role,
//     },
//   };
  

const state = {
  role: null, // Store the user's role
};

const mutations = {
  SET_ROLE(state, role) {
    state.role = role;
  },
};

const actions = {
  login({ commit }, role) {
    commit('SET_ROLE', role);
  },
  logout({ commit }) {
    commit('SET_ROLE', null);
  },
};

const getters = {
  isAdmin: state => state.role === 'admin',
  isManager: state => state.role === 'manager',
  isStudent: state => state.role === 'student',
};

export default {
  state,
  mutations,
  actions,
  getters,
};
