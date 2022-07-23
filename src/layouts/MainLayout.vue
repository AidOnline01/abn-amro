<template>
  <div class="main-layout">
    <HeaderWrapper />

    <slot />

    <LayoutFooter />
  </div>
</template>

<script lang="ts" setup>
  import HeaderWrapper from '@/components/header/HeaderWrapper.vue';
  import LayoutFooter from '@/components/layout/LayoutFooter.vue';
</script>

<style lang="scss" scoped>
  .main-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .footer {
    margin-top: auto;
  }
</style>
