import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export async function login(email: string, password: string) {
  const res = await API.post('/auth/login', { email, password });
  localStorage.setItem('token', res.data.token);
}

export async function register(email: string, password: string) {
  await API.post('/auth/register', { email, password });
}

export function getToken() {
  return localStorage.getItem('token');
}

export function isLoggedIn() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem('token');
}