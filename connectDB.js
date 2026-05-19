import mongoose from "mongoose";

const connectDB = async (URL) => {
  try {
    await mongoose.connect(URL);
    console.log("Database connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
