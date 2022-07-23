import { shallowMount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import HeaderWrapper from './HeaderWrapper.vue';
import HeaderSearch from './HeaderSearch.vue';

function getWrapper(): VueWrapper {
  const wrapper = shallowMount(HeaderWrapper, {
    global: {
      stubs: {
        'router-link': true,
      },
    },
  });

  return wrapper;
}

describe('HeaderWrapper', () => {
  it('should render search', async () => {
    const wrapper = getWrapper();

    expect(wrapper.findComponent(HeaderSearch).exists()).toBe(true);
  });
});
