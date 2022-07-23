<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/">Movies App</router-link>
      </div>

      <div class="search">
        <HeaderSearch />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import HeaderSearch from './HeaderSearch.vue';
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    background: var(--color-main);
    padding: 10px 0;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    font-weight: 700;
    color: #fff;
  }

  .search {
    margin-left: auto;
  }
</style>
