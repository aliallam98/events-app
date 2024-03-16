import { Schema, model, models, Document, Types } from "mongoose";

export interface IOrder extends Document {
  _id: string;
  stripeId: string;
  totalAmount: string;
  eventId: {
    _id: string;
    title: string;
  };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  
}

export type IOrderItem = {
  _id: string
  totalAmount: string
  createdAt: Date
  eventTitle: string
  eventId: string
  buyer: string
}

const orderSchema = new Schema(
  {
    stripeId: {
      type: String,
      required: true,
      unique: true,
    },
    totalAmount: String,
    eventId: {
      type: Types.ObjectId,
      ref: "Event",
    },
    buyerId: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const orderModel = models.Order || model("Order", orderSchema);

export default orderModel;
