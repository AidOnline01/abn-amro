import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import store from '@/store';
import MoviesCard from './MoviesCard.vue';
import type Movie from '@/types/Movie';

const baseMovie: Movie = {
  id: 1,
  name: 'Shrek',
  genres: ['Comedy', 'Drama'],
  image: {
    original: '/images/sample.jpg',
    medium: '/images/sample.jpg',
  },
  slug: 'movie',
  weight: 55,
};

function getWrapper(movie: Movie): VueWrapper {
  const wrapper = mount(MoviesCard, {
    global: {
      provide: {
        store,
      },
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
    const movie: Movie = { ...baseMovie };

    const wrapper = getWrapper(movie);

    expect(wrapper.find('[data-test-id="movie-name"]').text()).toMatch(/shrek/i);
  });

  it('should render image', async () => {
    const movie: Movie = { ...baseMovie };

    const wrapper = getWrapper(movie);

    expect((wrapper.find('[data-test-id="lazy-image"]').element as HTMLElement).style.backgroundImage)
      .toMatch(/\/images\/sample\.jpg/i);
  });
});
