import mongoose, { Schema, Document } from 'mongoose';

interface IEmergencyRequest extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'medical' | 'vehicle breakdown';
  status: 'pending' | 'in progress' | 'resolved';
  assignedPersonnelId: mongoose.Types.ObjectId;
}

const emergencyRequestSchema = new Schema<IEmergencyRequest>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['medical', 'vehicle breakdown'], required: true },
  status: { type: String, enum: ['pending', 'in progress', 'resolved'], default: 'pending' },
  assignedPersonnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPersonnel', required: true },
});

const EmergencyRequest = mongoose.model<IEmergencyRequest>('EmergencyRequest', emergencyRequestSchema);

export default EmergencyRequest;
