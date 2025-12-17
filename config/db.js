const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/secure_document_vault");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("DB connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
