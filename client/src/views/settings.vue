<template>
    <div class="settings-container">
      <div class="settings-card">
        <h2>⚙️ Account Settings</h2>
  
        <div class="user-info">
          <label>Email:</label><span>{{ email }}</span>
        </div>
  
        <div class="actions">
          <button class="logout-btn" @click="logoutAndReturn">
            Log Out
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getToken, logout } from '../services/auth';
  import { getUserProfile } from '../services/auth';
  
  const email = ref('Loading...');
  
  // Emit back to App.vue to handle logout
  const emit = defineEmits(['loggedOut']);
  
  onMounted(async () => {
  try {
    const user = await getUserProfile();
    email.value = user.email;
    // You can also access user.name, user.avatarUrl, etc.
  } catch (err) {
    email.value = '(Error loading user)';
  }
});

  function logoutAndReturn() {
    logout();
    emit('loggedOut');
  }
  </script>
  
  <style scoped>
  .settings-container {
    display: flex;
    justify-content: center;
    padding-top: 60px;
  }
  
  .settings-card {
    background-color: #fef6e4;
    border: 2px solid #ffbc42;
    padding: 30px 40px;
    border-radius: 16px;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    text-align: left;
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 1.6rem;
    color: #3f3f3f;
    text-align: center;
  }
  
  .user-info {
    margin-bottom: 30px;
    font-size: 1.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid #ccc;
  }
  
  .user-info label {
    font-weight: bold;
    color: #555;
  }
  
  .actions {
    display: flex;
    justify-content: center;
  }
  
  .logout-btn {
    background-color: #ffbaba;
    color: #5c0000;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .logout-btn:hover {
    background-color: #ff7a7a;
    color: white;
  }
  </style>
  