import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: String,
  species: String,
  personality: [String],
  backstory: String,
  stats: {
    hunger: Number,
    mood: Number,
    energy: Number,
    cleanliness: Number
  },
  status: { type: String, enum: ['alive', 'dead'], default: 'alive' },
  dateAdopted: Date,
  dateDied: Date
});

export const Pet = mongoose.model('Pet', petSchema);
