<template>
  <div class="lazy-image" ref="imageEl" data-test-id="lazy-image"></div>
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted } from 'vue';

  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
  });

  const src = computed(() => props.src);

  const imageEl = ref<HTMLElement>(null);

  onMounted(() => {
    setupIntersection();
  });

  function setupIntersection(): void {
    const observer = new IntersectionObserver(intersectionHandler, { root: null, threshold: 0 });

    observer.observe(imageEl.value);
  }

  function intersectionHandler(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        imageEl.value.style.backgroundImage = `url(${src.value})`;

        observer.unobserve(imageEl.value);
      }
    });
  }
</script>
