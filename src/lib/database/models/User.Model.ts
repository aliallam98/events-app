import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    firstName: String,
    LastName: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const userModel = models.User || model("User",userSchema )

export default userModel