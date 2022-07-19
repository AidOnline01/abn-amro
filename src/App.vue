<template>
  <div>
    Home <span>{{count}}</span>

    <br>

    <button @click="count++">Click me</button>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        count: 0
      }
    }
  }
</script>