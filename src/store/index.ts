import { createStore } from 'vuex';

import movies from './modules/Movies';

const store = createStore({
  modules: {
    movies,
  },
});

export default store;
