<template>
  <div>
    <h2>Your Pets</h2>
    <button @click="adoptPet">Adopt New Pet 🐾</button>

  <div class="pet-grid">
  <div class="pet-card" v-for="pet in pets" :key="pet._id">
    <h3>{{ pet.name }}</h3>
    <p><strong>Species:</strong> {{ pet.species }}</p>
    <p><strong>Personality:</strong> {{ pet.personality.join(', ') }}</p>
    <p class="quote">“{{ pet.backstory }}”</p>
    <p class="status">Status: <em>{{ pet.status }}</em></p>
  </div>
</div>


  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import API from '../services/api';
import { generateRandomPet } from '../utils/petGenerator';

const pets = ref([]);

const loadPets = async () => {
  const res = await API.get('/pets');
  pets.value = res.data;
};

const adoptPet = async () => {
  const newPet = generateRandomPet();
  await API.post('/pets', newPet);
  loadPets(); // refresh list
};

onMounted(() => {
  loadPets();
});
</script>

<style scoped>
button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px 14px;
  margin-bottom: 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background: #45a049;
}
.pet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.pet-card {
  background: #fef6e4;
  border: 2px solid #ffbc42;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.pet-card:hover {
  transform: scale(1.02);
}

h3 {
  font-size: 1.4rem;
  margin-bottom: 0.4rem;
  color: #3f3f3f;
}

.quote {
  font-style: italic;
  color: #7c5e10;
  margin: 10px 0;
}

.status {
  font-weight: bold;
  color: #236d1f;
}
</style>
