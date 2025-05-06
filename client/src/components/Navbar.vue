<template>
    <nav class="navbar" v-if="isLoggedIn()">
      <router-link to="/pets" class="nav-link">🐾 Pets</router-link>
      <router-link to="/settings" class="nav-link">⚙️ Settings</router-link>
      <button class="logout-btn" @click="handleLogout">🚪 Logout</button>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { logout, isLoggedIn } from '../services/auth';
  
  const router = useRouter();
  
  function handleLogout() {
    logout();
    router.push('/login');
  }
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background-color: #fff3c7;
    border-bottom: 2px solid #ffbc42;
  }
  
  .nav-link {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    padding: 6px 10px;
    border-radius: 6px;
    transition: background 0.2s ease;
  }
  
  .nav-link:hover {
    background-color: #ffe9a6;
  }
  
  .logout-btn {
    background: #ffbaba;
    color: #5c0000;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    padding: 6px 12px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .logout-btn:hover {
    background: #ff7a7a;
    color: white;
  }
  </style>
  