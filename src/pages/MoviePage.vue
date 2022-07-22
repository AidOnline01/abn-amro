<template>
  <div>
    <button @click="onLoadMovie()">Load movie</button>

    <div v-if="movie">
      {{ movie.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { getModule } from 'vuex-module-decorators';
  import Movies from '@/store/modules/movies';

  const store = useStore();

  const moviesModule = getModule(Movies, store);

  const { getMovie, setMovie } = moviesModule;

  const movie = computed(() => moviesModule.movie);

  const onLoadMovie = async () => {
    const loadedMovie = await getMovie();

    setMovie(loadedMovie);
  };
</script>
