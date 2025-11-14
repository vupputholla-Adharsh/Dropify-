import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  currentLocation: { lat: number, lng: number };
  preferences: {
    food: string[];
    transport: string[];
    entertainment: string[];
  };
  rewardPoints: number;
  carbonFootprintReduction: number;
  greentip: number;
  password: string; // Add password field
  role: 'user'; // Add role field
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false },
  currentLocation: {
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
  },
  preferences: {
    food: { type: [String], default: [] },
    transport: { type: [String], default: [] },
    entertainment: { type: [String], default: [] },
  },
  rewardPoints: { type: Number, default: 0 },
  carbonFootprintReduction: { type: Number, default: 0 },
  password: { type: String, required: true }, // Make sure to require the password
  role: { type: String, default: 'user' }, // Set default role to 'user'
  greentip: { type: Number, default: 0 }

});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
