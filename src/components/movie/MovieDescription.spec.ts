import { shallowMount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import baseMovie from '@/tests/baseMovie';
import MovieDescription from './MovieDescription.vue';
import type Movie from '@/types/Movie';

function getWrapper(movie: Movie): VueWrapper {
  const wrapper = shallowMount(MovieDescription, {
    propsData: {
      movie,
    },
  });

  return wrapper;
}

describe('MoviesImage', () => {
  it('should render description', async () => {
    const mockMovie: Movie = { ...baseMovie };

    const wrapper = await getWrapper(mockMovie);

    const descriptionEl = wrapper.find('[data-test-id="movie-description"]');

    expect(descriptionEl.html()).toMatch(new RegExp(mockMovie.summary));
  });
});
