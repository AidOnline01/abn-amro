<template>
  <div class="main-layout">
    <LayoutHeader />

    <slot />

    <LayoutFooter />
  </div>
</template>

<script lang="ts" setup>
  import LayoutHeader from '@/components/layout/LayoutHeader.vue';
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
