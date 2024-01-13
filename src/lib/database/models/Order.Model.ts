import { Schema, model, models, Document, Types } from "mongoose";

export interface IOrder extends Document {
  _id: string;
  stripeId: string;
  totalAmount: string;
  event: {
    _id: string;
    title: string;
  };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
}

const orderSchema = new Schema(
  {
    stripeId: {
      type: String,
      required: true,
      unique: true,
    },
    totalAmount: String,
    event: {
      type: Types.ObjectId,
      ref: "Event",
    },
    buyer: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = models.Order || model("Order", orderSchema);

export default orderModel;
