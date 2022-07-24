import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import createStore from '@/store';
import { API_URL } from '@/api';
import mockAxios from '@/tests/mockAxios';
import baseMovie from '@/tests/baseMovie';
import MovieImage from '@/components/movie/MovieImage.vue';
import MovieDescription from '@/components/movie/MovieDescription.vue';
import createRouter from '@/router';
import App from '@/App.vue';
import type { Router } from 'vue-router';
import type Movie from '@/types/Movie';

async function getWrapper(movie: Movie | boolean, delay = 0): Promise<[VueWrapper, Router]> {
  const router = createRouter();

  router.push('/movie/1');

  await router.isReady();

  if (movie !== false) {
    mockAxios({
      url: `${API_URL}/shows/1`,
      data: movie,
      delay,
    });
  }

  const wrapper = mount(App, {
    shallow: true,
    global: {
      plugins: [router],
      provide: {
        store: createStore(),
      },
      stubs: {
        MoviePage: false,
        MainLayout: {
          template: '<div><slot /></div>',
        },
        RouterView: false,
      },
    },
  } as unknown);

  await flushPromises();

  return [wrapper, router];
}

describe('MoviePage', () => {
  it('should show loading', async () => {
    const [wrapper] = await getWrapper({ ...baseMovie, id: 1 }, 1000);

    expect(wrapper.find('[data-test-id="loading"]').exists()).toBe(true);
  });

  it('should render MovieImage', async () => {
    const [wrapper] = await getWrapper({ ...baseMovie, id: 1 });

    expect(wrapper.findComponent(MovieImage).exists()).toBe(true);
  });

  it('should render MovieDescription', async () => {
    const [wrapper] = await getWrapper({ ...baseMovie, id: 1 });

    expect(wrapper.findComponent(MovieDescription).exists()).toBe(true);
  });

  it('should show NotFound error, if no film found', async () => {
    const [wrapper] = await getWrapper(false);

    expect(wrapper.find('[data-test-id="not-found"]').exists()).toBe(true);
  });

  it('should show loading on movie change', async () => {
    const [wrapper, router] = await getWrapper({ ...baseMovie, id: 1 });

    mockAxios({
      url: `${API_URL}/shows/2`,
      data: { ...baseMovie, id: 2 },
      delay: 1000,
    });

    router.push('/movie/2');

    await flushPromises();

    await wrapper.vm.$forceUpdate();

    expect(wrapper.find('[data-test-id="loading"]').exists()).toBe(true);
  });
});
