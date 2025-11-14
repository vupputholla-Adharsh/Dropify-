import mongoose, { Schema, Document } from 'mongoose';

interface IItem extends Document {
  name: string;
  description?: string;
  price: number;
  category: string;
  stockQuantity?: number;
}

const itemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  category: { type: String, required: false },
  stockQuantity: { type: Number, required: false },
});

const Item = mongoose.model<IItem>('Item', itemSchema);

export default Item;
