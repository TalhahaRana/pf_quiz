// import { createStore } from 'vuex'

// export default createStore({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

import { createStore } from 'vuex';
import auth from './modules/auth';
import quiz from './modules/quiz';

export default createStore({
  modules: {
    auth,
    quiz,
  },
});
