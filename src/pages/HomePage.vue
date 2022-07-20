<template>
  <div class="home">
    Home <span>{{count}}</span>

    <br>

    {{name}}

    <button class="button" @click="incrementCount()">Click me</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const count = ref(0);
  const name = ref('Hello World');

  const incrementCount = () => {
    count.value += 1;
  };
</script>

<style lang="scss" scoped>
  .home {
    .button {
      color: red;
      background: blue;
    }
  }
</style>
