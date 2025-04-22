import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required:true }, // can be blank for Google accounts
  name: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  bio: { type: String, default: '' },
  steps: { type: Number, default: 0 },
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

export const User = mongoose.model('User', userSchema);
