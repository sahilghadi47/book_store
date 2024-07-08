/* eslint-disable no-undef */
import mongoose from "mongoose";
import dotenv from "dotenv";

// config env variables
dotenv.config({
    path: ".env",
});

// import env variables
const uri = process.env.MONGO_URI;
const db_name = process.env.DB_NAME;

// create database connection
const connectMongo = async () => {
    try {
        const db = await mongoose.connect(`${uri}/${db_name}`);
        console.log(`MongoDB connected: ${db.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export { connectMongo };
