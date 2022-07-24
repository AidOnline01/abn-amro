import { shallowMount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import store from '@/store';
import { API_URL } from '@/api';
import mockAxios from '@/tests/mockAxios';
import baseMovie from '@/tests/baseMovie';
import MoviesGenres from '@/components/movies/MoviesGenres.vue';
import MoviesPage from './MoviesPage.vue';
import type Movie from '@/types/Movie';

async function getWrapper(movies: Movie[], delay = 0): Promise<VueWrapper> {
  mockAxios({
    url: `${API_URL}/shows`,
    data: movies,
    delay,
  });

  const wrapper = shallowMount(MoviesPage, {
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
  it('should render genres', async () => {
    const mockMovies = [{ ...baseMovie, genres: ['Comedy', 'Triller'] }];

    const wrapper = await getWrapper(mockMovies);

    expect(wrapper.findComponent(MoviesGenres).exists()).toBe(true);
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
