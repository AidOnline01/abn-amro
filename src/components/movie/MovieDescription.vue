<template>
  <div class="description">
    <div class="container">
      <div class="description-title">Description</div>

      <div
        class="description-content"
        data-test-id="movie-description"
        v-html="movie.summary"
      ></div>
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
  .description {
    padding: 20px 0;
  }

  .description-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .description-content {
    font-size: 14px;
    line-height: 1.5;
  }
</style>
