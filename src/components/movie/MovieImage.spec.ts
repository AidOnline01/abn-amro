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

describe('MoviesImage', () => {
  it('should render image', async () => {
    const mockMovie: Movie = { ...baseMovie };

    const wrapper = await getWrapper(mockMovie);

    const imageEl = wrapper.find('[data-test-id="movie-image"]');

    expect((imageEl.element as HTMLElement).style.backgroundImage).toBe(`url(${mockMovie.image.original})`);
  });
});
