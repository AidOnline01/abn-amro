import nock from 'nock';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

nock.disableNetConnect();

global.mockAdapter = new MockAdapter(axios);

window.IntersectionObserver = class MockObserver {
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  callback = null;

  root = null;

  rootMargin = null;

  thresholds = null;

  disconnect = jest.fn();

  observe(element: HTMLElement) {
    this.callback([{ isIntersecting: true, target: element }], this);
  }

  unobserve = jest.fn();

  takeRecords = jest.fn();
};

jest.mock('vue-router', () => ({
  useRoute: () => jest.fn(),
  onBeforeRouteUpdate: jest.fn(),
  onBeforeRouteLeave: jest.fn(),
}));
