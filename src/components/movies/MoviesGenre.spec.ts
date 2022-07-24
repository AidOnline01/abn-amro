import { shallowMount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import baseMovie from '@/tests/baseMovie';
import MoviesGenre from './MoviesGenre.vue';
import type Movie from '@/types/Movie';

function generateMovies(amount: number): Movie[] {
  const movies: Movie[] = [];
  let id = 0;

  for (let i = 0; i < amount; i += 1) {
    id += 1;

    const movie: Movie = { ...baseMovie, id, genres: ['Comedy', 'Horror'] };

    movies.push(movie);
  }

  return movies;
}

function getWrapper(genre: string, movies: Movie[]): VueWrapper {
  const wrapper = shallowMount(MoviesGenre, {
    global: {
      stubs: {
        'router-link': true,
      },
    },
    propsData: {
      genre,
      movies,
    },
  });

  return wrapper;
}

describe('MoviesGenre', () => {
  it('should render the genres and movies', () => {
    const mockMovies = generateMovies(15);

    const wrapper = getWrapper('Comedy', mockMovies);

    expect(wrapper.find('[data-test-id="genre-name"]').text()).toMatch(/comedy/i);
  });

  it('should render maximum 10 items per genre', () => {
    const mockMovies = generateMovies(15);

    const wrapper = getWrapper('Comedy', mockMovies);

    expect(wrapper.findAll('[data-test-id="movies-item"]').length).toBe(10);
  });
});
