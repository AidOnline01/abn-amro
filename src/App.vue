<template>
  <div>
    Home <span>{{count}}</span>

    <br>

    <button @click="incrementCount()">Click me</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const count = ref(0)
  const name = ref('Hello World')

  const incrementCount = () => count.value++
</script>