import mongoose from "mongoose";
const connectDB = async () => {
  await mongoose.connect(process.env.DB_URL).then(() => {
    console.log("connected to db");
  });
};

export default connectDB