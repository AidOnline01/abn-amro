import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import store from '@/store';
import { API_URL } from '@/api';
import { randomBetween } from '@/helpers/math';
import mockAxios from '@/tests/mockAxios';
import baseMovie from '@/tests/baseMovie';
import MoviesPage from './MoviesPage.vue';
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

function generateUnorderedMovies(count: number): Movie[] {
  const movies: Movie[] = [];
  let id = 0;

  for (let i = 0; i < count; i += 1, id += 1) {
    if (i === Math.ceil(count / 2)) {
      movies.push({
        ...baseMovie,
        id,
        name: 'Top Movie',
        genres: ['Comedy'],
        weight: 95,
      });
    } else {
      movies.push({
        ...baseMovie,
        id,
        genres: ['Comedy'],
        weight: randomBetween(1, 80),
      });
    }
  }

  return movies;
}

async function getWrapper(movies: Movie[], delay = 0): Promise<VueWrapper> {
  mockAxios({
    url: `${API_URL}/shows`,
    data: movies,
    delay,
  });

  const wrapper = mount(MoviesPage, {
    global: {
      provide: {
        store,
      },
      stubs: {
        'router-link': true,
      },
    },
  });

  await flushPromises();

  return wrapper;
}

describe('MoviesPage', () => {
  it('should render the genres and movies', async () => {
    const mockMovies = generateMoviesWithGenres({
      Comedy: 3,
      Drama: 5,
      Triller: 3,
      'Comedy-Drama': 2,
    });

    const wrapper = await getWrapper(mockMovies);

    expect(wrapper.findAll('[data-test-id="genre-name"]').some((el) => el.text().match(/comedy/i))).toBe(true);
    expect(wrapper.findAll('[data-test-id="genre-name"]').some((el) => el.text().match(/triller/i))).toBe(true);
    expect(wrapper.findAll('[data-test-id="movies-item"]').length).toBe(15);
  });

  it('should sort movies by order', async () => {
    const mockMovies = generateUnorderedMovies(5);

    const wrapper = await getWrapper(mockMovies);

    expect(wrapper.findAll('[data-test-id="movies-item"]')[0].find('[data-test-id="movie-name"]').text()).toMatch(/top movie/i);
  });

  it('should render maximum 10 items per genre', async () => {
    const mockMovies = generateMoviesWithGenres({
      Comedy: 15,
      'Comedy-Drama': 25,
    });

    const wrapper = await getWrapper(mockMovies);

    expect(wrapper.findAll('[data-test-id="movies-item"]').length).toBe(20);
  });

  it('should show not found error', async () => {
    const wrapper = await getWrapper([]);

    expect(wrapper.find('[data-test-id="not-found"]').exists()).toBe(true);
  });

  it('should show loading screen', async () => {
    const wrapper = await getWrapper([], 1000);

    expect(wrapper.find('[data-test-id="loading"]').exists()).toBe(true);
  });
});
