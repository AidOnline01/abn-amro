<template>
  <MainLayout>
    <router-view />
  </MainLayout>
</template>

<script lang="ts" setup>
  import MainLayout from '@/layouts/MainLayout.vue';
</script>

<style lang="scss">
  *, *:before, *:after {
    box-sizing: border-box;
  }

  body, html {
    padding: 0;
    margin: 0;
  }

  :root {
    --color-grey: #e2e5f1;
    --color-danger: #d73d3d;
    --color-danger-medium: #f7a2a2;
    --color-danger-light: #fdecec;
  }

  .container {
    max-width: 1200px;
    padding: 0 15px;
    margin: 0 auto;
  }
</style>
