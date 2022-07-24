import { shallowMount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import store from '@/store';
import AlertMessage from './AlertMessage.vue';

function getWrapper(message: string): VueWrapper {
  const wrapper = shallowMount(AlertMessage, {
    propsData: {
      message,
    },
  });

  return wrapper;
}

describe('AlertMessage', () => {
  it('should render message', async () => {
    const wrapper = getWrapper('The error message');

    expect(wrapper.text()).toMatch(/the error message/i);
  });
});
