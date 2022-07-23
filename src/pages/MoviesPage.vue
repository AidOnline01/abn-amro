<template>
  <div class="movies-page">
    <div class="container">

      <div class="loading" data-test-id="loading" v-if="loading">
        Loading movies
      </div>

      <div class="genres" data-test-id="genres" v-else-if="Object.keys(genres).length">
        <template v-for="genre in genres" :key="genre">
          <div class="genre">
            <div class="genre-name" data-test-id="genre-name">{{genre}}</div>
            <div class="movies-items" ref="itemsEls">
              <div
                class="movies-item"
                v-for="(movie, index) in genresMoviesLimited[genre]"
                :key="index"
                data-test-id="movies-item"
              >
                <MoviesCard :movie="movie" />
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="not-found" data-test-id="not-found" v-else>No film was found</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getModule } from 'vuex-module-decorators';
  import Movies from '@/store/modules/Movies';
  import { useStore } from 'vuex';
  import MoviesCard from '@/components/movies/MoviesCard.vue';
  import {
    computed, ref, onBeforeUpdate,
  } from 'vue';
  import type Movie from '@/types/Movie';

  const store = useStore();

  const moviesModule = getModule(Movies, store);

  const { setMovies, loadMovies } = moviesModule;

  const genres = computed(() => moviesModule.getGenres);
  const genresMovies = computed(() => moviesModule.getGenresMovies);

  const genresMoviesLimited = computed(() => sliceMovies(10));

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

  function sliceMovies(limit: number) {
    const map: Record<string, Array<Movie>> = {};

    Object.keys(genresMovies.value).forEach((genre) => {
      map[genre] = genresMovies.value[genre].slice(0, limit);
    });

    return map;
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

  .genre-name {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 15px;
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
    width: 240px;

    &:last-child {
      margin-right: 0;
    }
  }

  .not-found {
    background: var(--color-danger-light);
    border: 1px solid var(--color-danger-medium);
    color: var(--color-danger);
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    font-size: 20px;
  }
</style>
