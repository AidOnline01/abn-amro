import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import store from '@/store';
import LazyImage from './LazyImage.vue';
import type Movie from '@/types/Movie';

function getWrapper(src: string): VueWrapper {
  const wrapper = mount(LazyImage, {
    global: {
      provide: {
        store,
      },
      stubs: {
        'router-link': true,
      },
    },
    propsData: {
      src,
    },
  });

  return wrapper;
}

describe('LazyImage', () => {
  it('should render image', async () => {
    const src = 'https://website.com/image.png';

    const wrapper = getWrapper(src);

    expect((wrapper.find('[data-test-id="lazy-image"]').element as HTMLElement).style.backgroundImage).toBe(`url(${src})`);
  });
});
