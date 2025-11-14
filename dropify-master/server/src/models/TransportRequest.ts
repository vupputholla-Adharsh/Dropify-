import mongoose, { Schema, Document } from 'mongoose';

interface ITransportRequest extends Document {
  userId: mongoose.Types.ObjectId;
  vehicleType: string;
  dropOffLocation: { lat: number, lng: number };
  vehicleStatus: 'pending' | 'in transit' | 'delivered';
}

const transportRequestSchema = new Schema<ITransportRequest>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicleType: { type: String, required: true },
  dropOffLocation: {
    lat: { type: Number, required: true },    
    lng: { type: Number, required: true },
  },
  vehicleStatus: { type: String, enum: ['pending', 'in transit', 'delivered'], default: 'pending' },
});

const TransportRequest = mongoose.model<ITransportRequest>('TransportRequest', transportRequestSchema);

export default TransportRequest;
