import { createApp } from 'vue';
import createRouter from '@/router';
import createStore from '@/store';

import App from './App.vue';

const app = createApp(App);

app.use(createRouter());

app.use(createStore());

app.mount('#app');

export default app;
