<template>
  <div class="genres">
    <template v-for="genre in genres" :key="genre">
      <div class="genre">
        <div class="genre-name" data-test-id="genre-name">{{genre}}</div>
        <div class="movies-items" ref="itemsEls">
          <div
            class="movies-item"
            v-for="(movie, index) in genresMovies[genre]"
            :key="index"
            data-test-id="movies-item"
          >
            <MoviesCard :movie="movie" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import MoviesCard from '@/components/movies/MoviesCard.vue';
  import { computed } from 'vue';
  import type { PropType } from 'vue';
  import type Movie from '@/types/Movie';

  const props = defineProps({
    genres: {
      type: Array as PropType<string[]>,
      required: true,
    },
    genresMovies: {
      type: Object as PropType<Record<string, Movie[]>>,
      required: true,
    },
  });

  const genres = computed(() => props.genres);
  const genresMovies = computed(() => sliceMovies(10));

  function sliceMovies(limit: number) {
    const map: Record<string, Array<Movie>> = {};

    props.genres.forEach((genre) => {
      map[genre] = props.genresMovies[genre].slice(0, limit);
    });

    return map;
  }
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
