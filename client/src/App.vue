<template>
  <main>
    <!-- Settings toggle when logged in and not in settings view -->
    <div v-if="loggedIn && !showSettings" class="nav-bar">
      <button @click="showSettings = true" class="settings-btn">⚙️ Settings</button>
    </div>

    <!-- Show Settings Panel -->
    <Settings
      v-if="loggedIn && showSettings"
      @loggedOut="handleLogout"
    />

    <!-- Show Pets if logged in and not in settings -->
    <Pets
      v-else-if="loggedIn"
    />

    <!-- Auth: Login and Register -->
    <Login
      v-if="!loggedIn && showLogin"
      @loggedIn="handleLogin"
      @switchToRegister="showLogin = false"
    />

    <Register
      v-else-if="!loggedIn && !showLogin"
      @switchToLogin="showLogin = true"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Pets from './views/Pets.vue';
import Settings from './views/Settings.vue';
import { isLoggedIn, logout } from './services/auth';

const loggedIn = ref(false);
const showLogin = ref(true);
const showSettings = ref(false);

// Auto-login on page load if token exists
onMounted(() => {
  loggedIn.value = isLoggedIn();
});

// After login (from Login.vue)
function handleLogin() {
  loggedIn.value = true;
  showSettings.value = false;
}

// When user logs out (from Settings.vue)
function handleLogout() {
  logout();
  loggedIn.value = false;
  showLogin.value = true;
  showSettings.value = false;
}
</script>

<style scoped>
main {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  background-color: #fef6e4;
}

.nav-bar {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
}

.settings-btn {
  background: #ffbc42;
  color: #3f3f3f;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.settings-btn:hover {
  background: #e0a835;
}
</style>
