import { shallowMount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import baseMovie from '@/tests/baseMovie';
import MovieImage from './MovieImage.vue';
import type Movie from '@/types/Movie';

function getWrapper(movie: Movie): VueWrapper {
  const wrapper = shallowMount(MovieImage, {
    global: {
      stubs: {
        'router-link': true,
      },
    },
    propsData: {
      movie,
    },
  });

  return wrapper;
}

describe('MovieImage', () => {
  it('should render image', async () => {
    const mockMovie: Movie = { ...baseMovie };

    const wrapper = getWrapper(mockMovie);

    const imageEl = wrapper.find('[data-test-id="movie-image"]');

    expect((imageEl.element as HTMLElement).style.backgroundImage).toBe(`url(${mockMovie.image.original})`);
  });

  it('should render without image', async () => {
    const mockMovie: Movie = { ...baseMovie, image: null };

    const wrapper = getWrapper(mockMovie);

    const imageEl = wrapper.find('[data-test-id="movie-image"]');

    expect(imageEl.exists()).toBe(true);
  });

  it('should render without original image', async () => {
    const mockMovie: Movie = { ...baseMovie, image: { } };

    const wrapper = getWrapper(mockMovie);

    const imageEl = wrapper.find('[data-test-id="movie-image"]');

    expect(imageEl.exists()).toBe(true);
  });
});
