import { Document, Schema, Types, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description: string;
  location: string;
  imageUrl?: string[]; // Optional field
  price: string; // Optional field
  isFree: boolean;
  startDateTime: Date;
  endDateTime: Date;
  url?: string; // Optional field
  categoryId: { _id: string; title: string };
  organizer: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}
const eventSchema = new Schema(
  {
    title: { type: String, required: true},
    description: { type: String, required: true },
    location: { type: String, required: true},
    imageUrl: [String],
    price: String,
    isFree: { type: Boolean, default: false },
    startDateTime: Date,
    endDateTime: Date,
    url: String,
    categoryId: { type: Types.ObjectId, ref: "Category" },
    organizer: { type: Types.ObjectId, ref: "User", },
  },
  {
    timestamps: true,
    strict:true,
  }
)
eventSchema.index({ organizer:1, title:1,categoryId:1})

const eventModel = models.Event || model("Event", eventSchema)

export default eventModel;
