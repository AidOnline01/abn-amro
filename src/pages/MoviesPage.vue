<template>
  <div class="movies-page">
    <div class="genres">
      <div class="genre" v-for="genre in genres" :key="genre">
        <div class="genre-name">{{genre}}</div>
        <div class="movies-items">
          <div
            class="movies-item"
            v-for="(movie, index) in genresMoviesLimited[genre]"
            :key="index"
          >
            <MoviesCard :movie="movie" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getModule } from 'vuex-module-decorators';
  import Movies from '@/store/modules/Movies';
  import { useStore } from 'vuex';
  import MoviesCard from '@/components/movies/MoviesCard.vue';
  import { computed, ref } from 'vue';
  import type Movie from '@/types/Movie';

  const store = useStore();

  const moviesModule = getModule(Movies, store);

  const { setMovies, loadMovies } = moviesModule;

  const genres = computed(() => moviesModule.getGenres);
  const genresMovies = computed(() => moviesModule.getGenresMovies);

  const genresMoviesLimited = computed(() => {
    const map: Record<string, Array<Movie>> = {};
    const moviesLimit = 10;

    Object.keys(genresMovies.value).forEach((genre) => {
      map[genre] = genresMovies.value[genre].slice(0, moviesLimit);
    });

    return map;
  });

  fetchMovies();

  async function fetchMovies() {
    const loadedMovies = await loadMovies();

    setMovies(loadedMovies);
  }
</script>

<style lang="scss" scoped>
  .movies-page {
    padding: 10px 0;
  }

  .genre {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .movies-items {
    display: flex;
    flex-shrink: 0;
    max-width: 100%;
    overflow-x: auto;
  }

  .movies-item {
    flex-shrink: 0;
    margin-right: 10px;
    width: 140px;

    &:last-child {
      margin-right: 0;
    }
  }
</style>
