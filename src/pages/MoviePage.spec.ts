import VueRouter from 'vue-router';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import store from '@/store';
import { API_URL } from '@/api';
import mockAxios from '@/tests/mockAxios';
import baseMovie from '@/tests/baseMovie';
import MovieImage from '@/components/movie/MovieImage.vue';
import MovieDescription from '@/components/movie/MovieDescription.vue';
import MoviePage from './MoviePage.vue';
import type Movie from '@/types/Movie';

async function getWrapper(movie: Movie | boolean, delay = 0): Promise<VueWrapper> {
  /** @ts-ignore */
  jest.spyOn(VueRouter, 'useRoute').mockReturnValue({ params: { id: '1' } });

  if (movie !== false) {
    mockAxios({
      url: `${API_URL}/shows/1`,
      data: movie,
      delay,
    });
  }

  const wrapper = mount(MoviePage, {
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
  it('should show loading', async () => {
    const wrapper = await getWrapper({ ...baseMovie, id: 1 }, 1000);

    expect(wrapper.find('[data-test-id="loading"]').exists()).toBe(true);
  });

  it('should render MovieImage', async () => {
    const wrapper = await getWrapper({ ...baseMovie, id: 1 });

    expect(wrapper.findComponent(MovieImage).exists()).toBe(true);
  });

  it('should render MovieDescription', async () => {
    const wrapper = await getWrapper({ ...baseMovie, id: 1 });

    expect(wrapper.findComponent(MovieDescription).exists()).toBe(true);
  });

  it('should show NotFound error, if no film found', async () => {
    const wrapper = await getWrapper(false);

    expect(wrapper.find('[data-test-id="not-found"]').exists()).toBe(true);
  });
});
