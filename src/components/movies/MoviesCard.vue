<template>
  <div class="movies-card">
    <div class="image">
      <LazyImage
        :src="(movie.image && movie.image.medium) ? movie.image.medium : '/images/placeholder.png'"
      />
    </div>

    <div class="info" data-info>
      <div class="title" data-test-id="movie-name">{{movie.name}}</div>

      <router-link class="link" :to="'/movie/' + movie.id">Details</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import type { PropType } from 'vue';
  import LazyImage from '@/components/ui/LazyImage.vue';
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
  .movies-card {
    width: 100%;
    max-width: 100%;
    border: 1px solid var(--color-grey);
    border-radius: 10px;
  }

  .image {
    padding-bottom: 100%;
    position: relative;
  }

  .image .lazy-image {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .info {
    padding: 15px 10px;
  }

  .title {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .link {
    font-size: 18px;
    color: var(--color-blue);
  }
</style>
