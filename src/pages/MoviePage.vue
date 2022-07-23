<template>
  <div v-if="movie">
    <MovieImage :movie="movie" />

    <MovieDescription :movie="movie" />
  </div>
</template>

<script lang="ts" setup>
  import { useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { getModule } from 'vuex-module-decorators';
  import Movies from '@/store/modules/Movies';
  import MovieImage from '@/components/movie/MovieImage.vue';
  import MovieDescription from '@/components/movie/MovieDescription.vue';

  const store = useStore();

  const moviesModule = getModule(Movies, store);

  const { loadMovie, setMovie } = moviesModule;

  const movie = computed(() => moviesModule.movie);

  const route = useRoute();

  onMounted(() => fetchMovie());

  onBeforeRouteLeave(() => clearState());
  onBeforeRouteUpdate(() => clearState());

  async function fetchMovie() {
    const loadedMovie = await loadMovie(+route.params.id);

    setMovie(loadedMovie);
  }

  function clearState() {
    setMovie(null);
  }
</script>
