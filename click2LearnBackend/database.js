require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        console.log("MongoDB Connecting...");
        await mongoose.connect(uri);
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);  // Log just the message
        console.error("Stack Trace:", error.stack);  // Log the full stack trace
        process.exit(1); // Exit if connection fails
    }
};
connectDB();    

