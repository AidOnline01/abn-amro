import { createStore } from 'vuex';

import movies from './modules/movies';

const store = createStore({
  modules: {
    movies,
  },
});

export default store;
