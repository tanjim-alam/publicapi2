import mongoose from "mongoose";
import { config } from "dotenv";
config();
const dbConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    } catch (error) {
        console.log("Failed to connect db")
    }
};

export default dbConnection;