import mongoose, { Schema, Document } from 'mongoose';

interface ITrafficUpdate extends Document {
  userId: mongoose.Types.ObjectId;
  location: { lat: number, lng: number };
  description: string;
  verified: boolean;
  timestamp: Date;
}

const trafficUpdateSchema = new Schema<ITrafficUpdate>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  description: { type: String, required: true },
  verified: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

const TrafficUpdate = mongoose.model<ITrafficUpdate>('TrafficUpdate', trafficUpdateSchema);

export default TrafficUpdate;
