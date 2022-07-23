<template>
  <div class="image">
    <div
      class="image-inner"
      data-test-id="movie-image"
      :style="`background-image: url(${movie.image.original})`"
    ></div>

    <div class="wrapper">
      <div class="back">
        <div class="container">
          <router-link class="back-link" to="/">&lt;- Go back</router-link>
        </div>
      </div>

      <div class="container">
        <MovieInfo :movie="movie" class="movie-info" />
      </div>
    </div>
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
  .wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }

  .container {
    margin-top: auto;
    width: 100%;
  }

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
    position: absolute;
    width: 100%;
    left: 0;
    top: 10px;
  }

  .back-link {
    display: inline-block;
    left: 10px;
    top: 10px;
    border-radius: 10px;
    padding: 10px;
    background: var(--color-blue);
    color: #fff;
  }

  .movie-info {
    margin-bottom: 10px;
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
