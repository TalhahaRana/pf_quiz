export default {
    state: {
      quizzes: [],
    },
    mutations: {
      setQuizzes(state, quizzes) {
        state.quizzes = quizzes;
      },
    },
    actions: {
      fetchQuizzes({ commit }) {
        // Fetch quizzes from API
        const quizzes = []; // Replace with real data
        commit('setQuizzes', quizzes);
      },
    },
    getters: {
      getQuizzes: state => state.quizzes,
    },
  };
  