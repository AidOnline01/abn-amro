<template>
  <div class="genre">
    <div class="genre-name" data-test-id="genre-name">{{genre}}</div>
    <div class="movies-items" ref="itemsEls">
      <div
        class="movies-item"
        v-for="(movie, index) in movies"
        :key="index"
        data-test-id="movies-item"
      >
        <MoviesCard :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import type { PropType } from 'vue';
  import MoviesCard from '@/components/movies/MoviesCard.vue';
  import type Movie from '@/types/Movie';

  const props = defineProps({
    genre: {
      type: String as PropType<string>,
      required: true,
    },
    movies: {
      type: Array as PropType<Movie[]>,
      required: true,
    },
  });

  const movies = computed(() => props.movies.slice(0, 10));
  const genre = computed(() => props.genre);
</script>

<style lang="scss" scoped>
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
</style>
