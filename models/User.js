import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["Guest", "Admin"],
    default: "Guest",
  },
});

const userModel = model("users", userSchema);

export { userModel };
