<template>
  <div class="search">
    <input name="search" class="input" placeholder="Search" v-model="query" />

    <div class="results" v-if="movies.length" data-test-id="results">
      <div class="result" v-for="movie in movies" :key="movie.id" data-test-id="result">
        <router-link
          :to="`/movie/${movie.id}`"
          @click="clearState()"
        >{{movie.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useStore } from 'vuex';
  import { getModule } from 'vuex-module-decorators';
  import Movies from '@/store/modules/Movies';
  import throttle from 'lodash.throttle';
  import type Movie from '@/types/Movie';

  const store = useStore();

  const moviesModule = getModule(Movies, store);

  const query = ref('');
  const movies = ref<Movie[]>([]);

  const { loadSearch } = moviesModule;

  const throttledFetchMovies = throttle(fetchMovies, 100);

  watch(query, (currentValue) => {
    if (!currentValue) movies.value = [];
    else throttledFetchMovies();
  });

  async function fetchMovies() {
    const loadedMovies = await loadSearch(query.value);

    movies.value = loadedMovies;
  }

  function clearState() {
    movies.value = [];
    query.value = '';
  }
</script>

<style lang="scss" scoped>
  .input {
    border: 1px solid var(--color-light-grey);
    box-shadow: none;
    padding: 5px 10px;
    border-radius: 10px;
    width: 150px;

    &::placeholder {
      color: var(--color-light-grey);
    }

    &:focus {
      outline: none;
    }
  }

  .results {
    position: absolute;
    left: 0;
    top: 100%;
    background: var(--color-main-light);
    z-index: 2;
    right: 0;
    padding: 10px;
    max-height: 200px;
    overflow: auto;
  }

  .result {
    color: #fff;
    margin-bottom: 5px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: 480px) {
    .input {
      width: 250px;
    }
  }

  @media (min-width: 768px) {
    .input {
      width: 300px;
    }

    .results {
      width: 300px;
      left: auto;
      right: 0;
    }

    .search {
      position: relative;
    }
  }
</style>
