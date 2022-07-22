import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import store from '@/store';
import { API_URL } from '@/api';
import MoviesPage from './MoviesPage.vue';
import type Movie from '@/types/Movie';

const mockMovies: Movie[] = [
  {
    id: 1,
    name: 'Movie name',
    genres: ['Comedy', 'Triller'],
    image: {
      medium: '',
      original: '',
    },
    slug: 'movie-name',
    weight: 25,
  },
  {
    id: 2,
    name: 'Movie name 2',
    genres: ['Horror', 'Triller'],
    image: {
      medium: '',
      original: '',
    },
    slug: 'movie-2',
    weight: 55,
  },
];

describe('MoviesPage', () => {
  it('Renders the genres and movies', async () => {
    global.mockAdapter.onGet(`${API_URL}/shows`).reply(200, mockMovies);

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

    expect(wrapper.text()).toMatch(/comedy/i);
    expect(wrapper.text()).toMatch(/horror/i);

    expect(wrapper.text()).toMatch(/movie name 2/i);
  });
});
