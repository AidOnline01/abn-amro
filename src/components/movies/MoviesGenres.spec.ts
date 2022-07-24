import type { Store } from 'vuex';
import { createStore } from 'vuex';
import type { State } from '@/store';
import { shallowMount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import baseMovie from '@/tests/baseMovie';
import { getModule } from 'vuex-module-decorators';
import Movies from '@/store/modules/Movies';
import MoviesGenres from './MoviesGenres.vue';
import type Movie from '@/types/Movie';

function generateMoviesWithGenres(genres: Record<string, number>): Movie[] {
  const movies: Movie[] = [];
  let id = 0;

  Object.keys(genres).forEach((genresString) => {
    const genresList = genresString.split('-');
    const count = genres[genresString];

    for (let i = 0; i < count; i += 1) {
      id += 1;

      const movie: Movie = { ...baseMovie, id, genres: genresList };

      movies.push(movie);
    }
  });

  return movies;
}

function getWrapper(genres: string[], genresMovies: Record<string, Movie[]>): VueWrapper {
  const wrapper = shallowMount(MoviesGenres, {
    global: {
      stubs: {
        'router-link': true,
      },
    },
    propsData: {
      genres,
      genresMovies,
    },
  });

  return wrapper;
}

describe('MoviesGenres', () => {
  let store: Store<State> = null;
  let module: Movies = null;

  beforeEach(() => {
    store = createStore<State>({
      modules: {
        movies: Movies,
      },
    });

    module = getModule(Movies, store);
  });

  it('should render the genres and movies', () => {
    const mockMovies = generateMoviesWithGenres({
      Comedy: 3,
      Drama: 5,
      Triller: 3,
      'Comedy-Drama': 2,
    });

    module.setMovies(mockMovies);

    const wrapper = getWrapper(module.getGenres, module.getGenresMovies);

    expect(wrapper.findAll('[data-test-id="genre-name"]').some((el) => el.text().match(/comedy/i))).toBe(true);
    expect(wrapper.findAll('[data-test-id="genre-name"]').some((el) => el.text().match(/triller/i))).toBe(true);
    expect(wrapper.findAll('[data-test-id="movies-item"]').length).toBe(15);
  });

  it('should render maximum 10 items per genre', () => {
    const mockMovies = generateMoviesWithGenres({
      Comedy: 15,
      'Comedy-Drama': 25,
    });

    module.setMovies(mockMovies);

    const wrapper = getWrapper(module.getGenres, module.getGenresMovies);

    expect(wrapper.findAll('[data-test-id="movies-item"]').length).toBe(20);
  });
});
