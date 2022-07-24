<template>
  <div class="movies-page">
    <div class="container">

      <div class="loading" data-test-id="loading" v-if="loading">
        <AlertMessage message="Loading movies..." type="info"></AlertMessage>
      </div>

      <MoviesGenres
        :genres="genres"
        :genresMovies="genresMovies"
        v-else-if="Object.keys(genres).length"
      />

      <div v-else data-test-id="not-found" class="not-found">
        <AlertMessage message="Not found" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getModule } from 'vuex-module-decorators';
  import Movies from '@/store/modules/Movies';
  import { useStore } from 'vuex';
  import {
    computed, ref, onBeforeUpdate,
  } from 'vue';
  import AlertMessage from '@/components/ui/AlertMessage.vue';
  import MoviesGenres from '@/components/movies/MoviesGenres.vue';

  const store = useStore();

  const moviesModule = getModule(Movies, store);

  const { setMovies, loadMovies } = moviesModule;

  const genres = computed(() => moviesModule.getGenres);
  const genresMovies = computed(() => moviesModule.getGenresMovies);

  fetchMovies();

  const itemsEls = ref([] as HTMLElement[]);
  onBeforeUpdate(() => {
    itemsEls.value = [];
  });

  const loading = ref(true);
  async function fetchMovies() {
    const loadedMovies = await loadMovies();

    setMovies(loadedMovies);
    loading.value = false;
  }
</script>

<script lang="ts">
  export default {
    name: 'MoviesPage',
  };
</script>

<style lang="scss" scoped>
  .movies-page {
    padding: 10px 0;
  }

  .loading, .not-found {
    padding: 20px 0;
  }
</style>
