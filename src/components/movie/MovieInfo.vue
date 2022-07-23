<template>
  <div class="info">
    <div class="title" data-test-id="movie-title">
      {{movie.name}}
    </div>

    <div class="labels">
      <!-- Genres -->
      <div
        class="label label--genre"
        v-for="genre in movie.genres"
        :key="genre"
        data-test-id="movie-genre"
      >{{genre}}</div>

      <!-- Language -->
      <div class="label label--rating" data-test-id="movie-language">
        {{movie.language}}
      </div>

      <!-- Rating -->
      <div
        class="label label--rating"
        data-test-id="movie-rating"
        v-if="movie.rating && movie.rating.average"
      >
        {{movie.rating.average}} of 10
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import type { PropType } from 'vue';
  import type Movie from '@/types/Movie';

  const props = defineProps({
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  });

  const movie = computed(() => props.movie);
</script>

<style lang="scss" scoped>
  .info {
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 10px 15px;
    min-height: 70px;
    border-radius: 10px;
  }

  .title {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .rating {

  }

  .labels {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px -10px;
  }

  .label {
    margin: 0 5px 10px;
    border-radius: 100px;
    padding: 5px 10px;
    font-size: 14px;
  }

  .label--genre {
    background: var(--color-blue);
  }

  .label--language {
    background: var(--color-purple);
  }

  .label--rating {
    background: var(--color-yellow);
  }

  @media (min-width: 430px) {
    .info {
      width: 400px;
    }
  }
</style>
