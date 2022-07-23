<template>
  <div class="image">
    <div
      class="image-inner"
      data-test-id="movie-image"
      :style="`background-image: url(${movie.image.original})`"
    ></div>
    <MovieInfo :movie="movie" />

    <router-link class="back" to="/">&lt;- Go back</router-link>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import type { PropType } from 'vue';
  import type Movie from '@/types/Movie';
  import MovieInfo from './MovieInfo.vue';

  const props = defineProps({
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  });

  const movie = computed(() => props.movie);
</script>

<style lang="scss" scoped>
  .image {
    position: relative;
    padding-bottom: 110%;
  }

  .image-inner {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-size: cover;
    background-position: top center;
  }

  .back {
    display: block;
    position: absolute;
    left: 10px;
    top: 10px;
    border-radius: 10px;
    padding: 10px;
    background: var(--color-blue);
    color: #fff;
  }

  @media (min-width: 400px) {
    .image {
      padding-bottom: 0;
      height: 350px;
    }

    .image-inner {
      background-position: center center;
    }
  }
</style>
