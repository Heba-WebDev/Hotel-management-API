import mongoose from "mongoose";

const mongo_url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    mongoose.connect(mongo_url);
    console.log("Database successfully connected 🚀😎");
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;
