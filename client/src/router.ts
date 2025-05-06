// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Pets from './views/Pets.vue';
import Settings from './views/Settings.vue';

const routes = [
  { path: '/', redirect: '/pets' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/pets', component: Pets },
  { path: '/settings', component: Settings }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
