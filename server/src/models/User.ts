import { Schema, model, connect } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  bio: string;
  image: string;
  role: "user" | "admin";
  isActive: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    password: { type: String, required: true },
    bio: { type: String, required: false },
    image: { type: String, required: false },
    role: { type: String, required: true, default: "user" },
    isActive: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
