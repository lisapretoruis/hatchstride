const names = ['Fluffykins', 'Sparkle', 'Wiggles', 'Mochi', 'Noodle'];
const species = ['Dragoncat', 'Slime Pup', 'Glow Worm', 'Cactus Bunny', 'Puffloon'];
const personalities = ['grumpy', 'clingy', 'hyperactive', 'sleepy', 'curious'];

const backstories = [
  'Born in a volcano and raised by raccoons.',
  'Once got lost in a sock drawer for a week.',
  'Used to be a cloud before falling to earth.',
  'Won a staring contest with a mirror.',
  'Escaped from the dream of a jellyfish.'
];

export function generateRandomPet() {
  return {
    name: names[Math.floor(Math.random() * names.length)],
    species: species[Math.floor(Math.random() * species.length)],
    personality: [
      personalities[Math.floor(Math.random() * personalities.length)],
      personalities[Math.floor(Math.random() * personalities.length)]
    ],
    backstory: backstories[Math.floor(Math.random() * backstories.length)],
    stats: {
      hunger: Math.floor(Math.random() * 10),
      mood: Math.floor(Math.random() * 10),
      energy: Math.floor(Math.random() * 10),
      cleanliness: Math.floor(Math.random() * 10)
    },
    status: 'alive',
    dateAdopted: new Date()
  };
}
