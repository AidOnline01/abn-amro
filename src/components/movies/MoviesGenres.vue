<template>
  <div class="genres">
    <template v-for="genre in genres" :key="genre">
      <div :data-lazy="genre" ref="wrapEls" class="wrap">
        <MoviesGenre :genre="genre" :movies="genresMovies[genre]" v-if="inView[genre]" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import {
    computed, onMounted, reactive, ref,
  } from 'vue';
  import type { PropType } from 'vue';
  import type Movie from '@/types/Movie';
  import MoviesGenre from './MoviesGenre.vue';

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
  const genresMovies = computed(() => props.genresMovies);

  const inView = reactive<Record<string, unknown>>({});
  const wrapEls = ref<HTMLElement[]>([]);

  onMounted(() => {
    setupIntersections();
  });

  function setupIntersections(): void {
    wrapEls.value.forEach((wrapEl) => {
      const observer = new IntersectionObserver(intersectionHandler, { root: null, threshold: 0 });

      observer.observe(wrapEl);
    });
  }

  function intersectionHandler(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const genre = entry.target.dataset.lazy;

        inView[genre] = true;

        observer.unobserve(entry.target);
      }
    });
  }
</script>

<style lang="scss" scoped>
  .wrap {
    min-height: 360px;
  }
</style>
