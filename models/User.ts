import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ["Guest", "Admin"],
    default: "Guest",
  },
});

const userModel = mongoose.model("users", userSchema);

export { userModel };
