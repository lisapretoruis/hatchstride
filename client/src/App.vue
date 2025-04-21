<template>
  <main>
    <div v-if="loggedIn">
      <button class="logout-btn" @click="handleLogout">Logout</button>
    </div>

    <Login
      v-if="!loggedIn && showLogin"
      @loggedIn="loggedIn = true"
      @switchToRegister="showLogin = false"
    />
    <Register
      v-else-if="!loggedIn && !showLogin"
      @switchToLogin="showLogin = true"
    />
    <Pets v-else />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Pets from './views/Pets.vue';
import { isLoggedIn, logout } from './services/auth';

const loggedIn = ref(false);
const showLogin = ref(true);

onMounted(() => {
  loggedIn.value = isLoggedIn();
});

function handleLogout() {
  logout();
  loggedIn.value = false;
  showLogin.value = true;
}
</script>
<style scoped>
.logout-btn {
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: bold;
  margin: 10px;
  cursor: pointer;
  float: right;
}

.logout-btn:hover {
  background: #e03a3a;
}
</style>

