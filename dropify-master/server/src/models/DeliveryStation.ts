import mongoose, { Schema, Document } from "mongoose"

interface IDeliveryStation extends Document {
  location: { lat: number; lng: number }
  availableItems: mongoose.Types.ObjectId[] // Array of ObjectIds referencing Item
  activeDeliveries: mongoose.Types.ObjectId[] // Array of ObjectIds referencing Order
  status: "active" | "inactive" // Define possible status values
}

const deliveryStationSchema = new Schema<IDeliveryStation>({
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  availableItems: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  ],
  activeDeliveries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  status: { type: String ,default: 'active', enum: ['active', 'inactive'] },
})

const DeliveryStation = mongoose.model<IDeliveryStation>(
  "DeliveryStation",
  deliveryStationSchema
)

export default DeliveryStation
