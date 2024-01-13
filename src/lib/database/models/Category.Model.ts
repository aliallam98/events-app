import { Document, Schema, Types, model, models } from "mongoose";

export interface ICategory extends Document {
  title: string;
  imageUrl: string;
}
const categorySchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

const categoryModel = models.Category || model("Category", categorySchema);

export default categoryModel;
