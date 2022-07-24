<template>
  <div class="movie-page">
    <div v-if="loading" data-test-id="loading" class="loading">
      <div class="container">
        <AlertMessage message="Loading movie..." type="info" />
      </div>
    </div>

    <div v-else-if="movie">
      <MovieImage :movie="movie" />

      <MovieDescription :movie="movie" />
    </div>

    <div v-else data-test-id="not-found" class="not-found">
      <div class="container">
        <AlertMessage message="No film was found" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
  import {
    computed, onMounted, watch, ref,
  } from 'vue';
  import { useStore } from 'vuex';
  import { getModule } from 'vuex-module-decorators';
  import Movies from '@/store/modules/Movies';
  import MovieImage from '@/components/movie/MovieImage.vue';
  import MovieDescription from '@/components/movie/MovieDescription.vue';
  import AlertMessage from '@/components/ui/AlertMessage.vue';

  const store = useStore();

  const moviesModule = getModule(Movies, store);

  const { loadMovie, setMovie } = moviesModule;

  const movie = computed(() => moviesModule.movie);

  const route = useRoute();

  onMounted(() => fetchMovie());
  watch(() => route.params.id, () => fetchMovie());

  onBeforeRouteLeave(() => clearState());
  onBeforeRouteUpdate(() => clearState());

  const loading = ref(true);
  async function fetchMovie() {
    loading.value = true;

    const loadedMovie = await loadMovie(+route.params.id);

    setMovie(loadedMovie);
    loading.value = false;
  }

  function clearState() {
    setMovie(null);
  }
</script>

<script lang="ts">
  export default {
    name: 'MoviePage',
  };
</script>

<style lang="scss" scoped>
  .not-found, .loading {
    padding: 20px 0;
  }
</style>
