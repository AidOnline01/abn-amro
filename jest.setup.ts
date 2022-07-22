import nock from 'nock';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

nock.disableNetConnect();

global.mockAdapter = new MockAdapter(axios);
