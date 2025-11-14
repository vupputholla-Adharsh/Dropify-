import mongoose, { Schema, Document } from 'mongoose';

export interface IDeliveryPersonnel extends Document {
  name: string;
  email: string; // Add email
  phoneNumber: string; // Add phone number
  vehicleType: string;
  currentLocation: { lat: number; lng: number };
  assignedOrders: mongoose.Types.ObjectId[];
  status: 'active' | 'busy' | 'offline'; // Define possible status values
  password: string; // Add password field
  role: 'delivery'; // Add role field
}

const deliveryPersonnelSchema = new Schema<IDeliveryPersonnel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: false }, // Make email required and unique
  phoneNumber: { type: String, required: false }, // Make phone number required
  vehicleType: { type: String, required: false },
  currentLocation: {
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
  },
  assignedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  status: {
    type: String,
    enum: ['active', 'busy', 'offline'], // Restrict to specific values
    default: 'active', // Default status
  },
  password: { type: String, required: false }, // Make password required
  role: { type: String, default: 'delivery' }, // Set default role to 'delivery'
});

const DeliveryPersonnel = mongoose.model<IDeliveryPersonnel>('DeliveryPersonnel', deliveryPersonnelSchema);

export default DeliveryPersonnel;
