import { createStore } from 'vuex';
import type { MoviesState } from './modules/Movies';

import movies from './modules/Movies';

export interface State {
  movies: MoviesState
}

const store = createStore<State>({
  modules: {
    movies,
  },
});

export default store;
