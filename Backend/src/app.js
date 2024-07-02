import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

//use cookies middleware to maintain sessions
app.use(cookieParser());

//user bodyparser middleware to accept form data
app.use(express.json({ limit: "1mb" }));

//use url encoder
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// use cors middleware allow access control
app.use(
    cors({
        origin: process.env.CORS,
        credentials: true,
    }),
);

// use express public to serve static files
app.use(express.static("public/temp"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

export default app;
