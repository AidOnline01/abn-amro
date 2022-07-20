import { createRouter, createWebHistory } from 'vue-router';

const HomePage = import('@/pages/HomePage.vue');
const MoviePage = import('@/pages/MoviePage.vue');

const routes = [
  { path: '/', component: HomePage },
  { path: '/movie', component: MoviePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
