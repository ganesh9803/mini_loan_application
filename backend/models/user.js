import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['customer', 'admin'], required: true },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
