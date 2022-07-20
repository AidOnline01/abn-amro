import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const HomePage = () => import('@/pages/HomePage.vue');
const MoviePage = () => import('@/pages/MoviePage.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/movie',
    name: 'MoviePage',
    component: MoviePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
