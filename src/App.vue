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
    font-family: Arial, Helvetica, sans-serif;
  }

  :root {
    --color-grey: #e2e5f1;
    --color-danger: #d73d3d;
    --color-danger-medium: #f7a2a2;
    --color-danger-light: #fdecec;
    --color-main: #ff424f;
    --color-main-light: #ff858d;
    --color-purple: #bb06fc;
    --color-yellow: #fbb006;
    --color-light-grey: #c0c0c0;

    --color-blue: #4475de;
    --color-blue-light: #edf3fe;
    --color-blue-medium: #a6c1fb;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .container {
    max-width: 1200px;
    padding: 0 15px;
    margin: 0 auto;
  }
</style>
