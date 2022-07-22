<template>
  <div class="movies-card">
    <div class="title">{{movie.name}}</div>

    <router-link class="link" :to="'/movie/' + movie.slug">Details</router-link>
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
  .movies-card {
    width: 100%;
    max-width: 100%;
    border: 1px solid var(--color-grey);
    padding: 20px;
    border-radius: 10px;
  }

  .title {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 20px;
  }
</style>
