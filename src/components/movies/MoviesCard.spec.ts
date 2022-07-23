import { shallowMount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import baseMovie from '@/tests/baseMovie';
import LazyImage from '@/components/ui/LazyImage.vue';
import MoviesCard from './MoviesCard.vue';
import type Movie from '@/types/Movie';

function getWrapper(movie: Movie): VueWrapper {
  const wrapper = shallowMount(MoviesCard, {
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

describe('MoviesCard', () => {
  it('should render title', async () => {
    const movie: Movie = { ...baseMovie, name: 'Shrek' };

    const wrapper = getWrapper(movie);

    expect(wrapper.find('[data-test-id="movie-name"]').text()).toMatch(/shrek/i);
  });

  it('should render image', async () => {
    const movie: Movie = { ...baseMovie };

    const wrapper = getWrapper(movie);

    expect(wrapper.findComponent(LazyImage).exists()).toBe(true);
  });
});
