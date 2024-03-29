import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const MoviesPage = () => import('@/pages/MoviesPage.vue');
const MoviePage = () => import('@/pages/MoviePage.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MoviesPage',
    component: MoviesPage,
  },
  {
    path: '/movie/:id',
    name: 'MoviePage',
    component: MoviePage,
  },
];

export default () => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  return router;
};
