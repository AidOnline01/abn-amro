import { shallowMount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import baseMovie from '@/tests/baseMovie';
import MovieInfo from './MovieInfo.vue';
import type Movie from '@/types/Movie';

function getWrapper(movie: Movie): VueWrapper {
  const wrapper = shallowMount(MovieInfo, {
    propsData: {
      movie,
    },
  });

  return wrapper;
}

describe('MoviesImage', () => {
  it('should render rating', async () => {
    const mockMovie: Movie = { ...baseMovie, rating: { average: 8 } };

    const wrapper = getWrapper(mockMovie);

    const ratingEl = wrapper.find('[data-test-id="movie-rating"]');

    expect(ratingEl.text()).toMatch(/8/i);
  });

  it('should not render missing rating', async () => {
    const mockMovie: Movie = { ...baseMovie };

    const wrapper = getWrapper(mockMovie);

    const ratingEl = wrapper.find('[data-test-id="movie-rating"]');

    expect(ratingEl.exists()).toBe(false);
  });

  it('should render language', async () => {
    const mockMovie: Movie = { ...baseMovie };

    const wrapper = getWrapper(mockMovie);

    const languageEl = wrapper.find('[data-test-id="movie-language"]');

    expect(languageEl.text()).toMatch(/english/i);
  });

  it('should render title', async () => {
    const mockMovie: Movie = { ...baseMovie };

    const wrapper = getWrapper(mockMovie);

    expect(wrapper.find('[data-test-id="movie-title"]').text()).toMatch('Hulk');
  });

  it('should render genres', async () => {
    const mockMovie: Movie = { ...baseMovie };

    const wrapper = getWrapper(mockMovie);

    expect(wrapper.findAll('[data-test-id="movie-genre"]').some((el) => el.text().match(/comedy/i))).toBe(true);
    expect(wrapper.findAll('[data-test-id="movie-genre"]').some((el) => el.text().match(/drama/i))).toBe(true);
  });
});
