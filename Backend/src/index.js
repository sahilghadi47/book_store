/* eslint-disable no-undef */
import { connectMongo } from "./config/db.config.js";
import dotenv from "dotenv";
import app from "./app.js";

// config env variables
dotenv.config({
    path: ".env",
});
const PORT = process.env.PORT;

// connect to mongo db and then run server

await connectMongo()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`app is running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        throw new Error(err);
    });
