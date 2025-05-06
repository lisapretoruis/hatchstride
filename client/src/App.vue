<template>
  <div id="app">
    <Navbar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<style scoped>
#app {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  background-color: #fef6e4;
}
</style>
