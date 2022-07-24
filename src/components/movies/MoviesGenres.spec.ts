import { nextTick } from 'vue';
import type { Store } from 'vuex';
import { createStore } from 'vuex';
import type { State } from '@/store';
import { shallowMount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import baseMovie from '@/tests/baseMovie';
import { getModule } from 'vuex-module-decorators';
import Movies from '@/store/modules/Movies';
import MoviesGenres from './MoviesGenres.vue';
import MoviesGenre from './MoviesGenre.vue';
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

async function getWrapper(
  genres: string[],
  genresMovies: Record<string, Movie[]>,
): Promise<VueWrapper> {
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

  await nextTick();

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

  it('should render MoviesGenre', async () => {
    const mockMovies = generateMoviesWithGenres({
      Comedy: 3,
      Drama: 5,
      Triller: 3,
      'Comedy-Drama': 2,
    });

    module.setMovies(mockMovies);

    const wrapper = await getWrapper(module.getGenres, module.getGenresMovies);

    expect(wrapper.findAllComponents(MoviesGenre).length).toBe(3);
  });
});
