import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from './order.interface';

// Extend the IOrder interface with Mongoose's Document type
export interface OrderDocument extends IOrder, Document {}

// Define the schema for the Order model
const OrderSchema = new Schema<OrderDocument>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'], // Validates email
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Refers to the Product model
      required: [true, 'Product is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'], // Validates minimum quantity
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'], // Ensures total price is provided
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

export const Order = mongoose.model<OrderDocument>('Order', OrderSchema);
