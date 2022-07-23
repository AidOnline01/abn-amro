<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/">Movies App</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
  .header {
    background: var(--color-main);
    padding: 10px 0;
  }

  .logo {
    font-weight: 700;
    color: #fff;
  }
</style>
