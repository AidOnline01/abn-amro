import flushPromises from 'flush-promises';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import mockAxios from '@/tests/mockAxios';
import baseMovie from '@/tests/baseMovie';
import { API_URL } from '@/api';
import createStore from '@/store';
import HeaderSearch from './HeaderSearch.vue';
import type Movie from '@/types/Movie';

interface Result {
  score: number,
  show: Movie
}

function getWrapper(results: Result[]): VueWrapper {
  mockAxios({
    url: `${API_URL}/search/shows`,
    data: results,
    params: {
      q: 'Shrek',
    },
  });

  const wrapper = shallowMount(HeaderSearch, {
    global: {
      provide: {
        store: createStore(),
      },
      stubs: {
        'router-link': RouterLinkStub,
      },
    },
  });

  return wrapper;
}

function generateResults(): Result[] {
  const results = [];

  for (let i = 1; i <= 5; i += 1) {
    results.push({ score: 0.1 * (6 - i), show: { ...baseMovie, id: i, name: `Shrek ${i}` } });
  }

  return results;
}

describe('HeaderSearch', () => {
  it('should render results', async () => {
    const mockResults = generateResults();

    const wrapper = getWrapper(mockResults);

    await wrapper.find('[name="search"]').setValue('Shrek');

    await flushPromises();

    const resultEls = wrapper.findAll('[data-test-id="result"]');

    expect(resultEls.length).toBe(5);
    expect(resultEls[0].text()).toMatch(/shrek 1/i);
  });

  it('should not render anything for empty results', async () => {
    const mockResults = [];

    const wrapper = await getWrapper(mockResults);

    await wrapper.find('[name="search"]').setValue('Shrek');

    await flushPromises();

    const resultsEl = wrapper.find('[data-test-id="results"]');

    expect(resultsEl.exists()).toBe(false);
  });

  it('should remove results after clearing input', async () => {
    const mockResults = generateResults();

    const wrapper = await getWrapper(mockResults);

    await wrapper.find('[name="search"]').setValue('Shrek');

    await flushPromises();

    await wrapper.find('[name="search"]').setValue('');

    const resultsEl = wrapper.find('[data-test-id="results"]');

    expect(resultsEl.exists()).toBe(false);
  });

  it('should remove results after clicking link', async () => {
    const mockResults = generateResults();

    const wrapper = await getWrapper(mockResults);

    await wrapper.find('[name="search"]').setValue('Shrek');

    await flushPromises();

    let resultsEl = wrapper.find('[data-test-id="results"]');

    const linkEl = resultsEl.find('a');

    await linkEl.trigger('click');

    resultsEl = wrapper.find('[data-test-id="results"]');

    expect(resultsEl.exists()).toBe(false);
  });
});
