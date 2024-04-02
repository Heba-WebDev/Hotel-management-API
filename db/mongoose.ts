import mongoose from "mongoose";
const mongo_url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    
    await mongoose.connect(mongo_url as string);
    console.log("Database successfully connected 🚀😎");
  } catch (error) {
    if(error instanceof Error) {
      console.error(error.message);
    }
  }
};


export default connectDB;
