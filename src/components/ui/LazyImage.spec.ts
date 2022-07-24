import { shallowMount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import createStore from '@/store';
import LazyImage from './LazyImage.vue';

function getWrapper(src: string): VueWrapper {
  const wrapper = shallowMount(LazyImage, {
    global: {
      provide: {
        store: createStore(),
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
