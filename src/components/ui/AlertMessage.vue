<template>
  <div class="alert" :class="`alert--${type}`" v-html="message"></div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import type { PropType } from 'vue';

  const props = defineProps({
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<'info' | 'error'>,
      default: 'error',
    },
  });

  const message = computed(() => props.message);
</script>

<style lang="scss" scope>
  .alert {
    border: 1px solid;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    font-size: 20px;
  }

  .alert--error {
    background: var(--color-danger-light);
    border-color: var(--color-danger-medium);
    color: var(--color-danger);
  }

  .alert--info {
    background: var(--color-blue-light);
    border-color: var(--color-blue-medium);
    color: var(--color-blue);
  }
</style>
