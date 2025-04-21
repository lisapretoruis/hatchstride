<template>
  <main>
    <Login v-if="!loggedIn && showLogin" @loggedIn="loggedIn = true" @switchToRegister="showLogin = false" />
    <Register v-else-if="!loggedIn && !showLogin" @switchToLogin="showLogin = true" />
    <Pets v-else />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Pets from './views/Pets.vue';
import { isLoggedIn } from './services/auth';

const loggedIn = ref(false);
const showLogin = ref(true);

onMounted(() => {
  loggedIn.value = isLoggedIn();
});
</script>
