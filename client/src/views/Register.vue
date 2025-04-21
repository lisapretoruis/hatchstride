<template>
    <div>
      <h2>Register a New Account</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      <p @click="switchToLogin" style="cursor: pointer;">Already have an account? Login</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { register } from '../services/auth';
  
  const email = ref('');
  const password = ref('');
  
  const emit = defineEmits(['switchToLogin']);
  
  async function handleRegister() {
    try {
      await register(email.value, password.value);
      alert('Registered! Please log in.');
      emit('switchToLogin');
    } catch (err) {
      alert('Registration failed');
    }
  }
  
  function switchToLogin() {
    emit('switchToLogin');
  }
  </script>

<style scoped>
form {
  background-color: #fef6e4;
  border: 2px solid #ffbc42;
  padding: 30px;
  border-radius: 12px;
  max-width: 400px;
  margin: 40px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

button {
  background: #4caf50;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  margin-top: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #45a049;
}

h2 {
  text-align: center;
  color: #3f3f3f;
  font-size: 1.6rem;
  margin-bottom: 20px;
}

p {
  text-align: center;
  margin-top: 15px;
  color: #236d1f;
  cursor: pointer;
  font-weight: 500;
}
</style>

  