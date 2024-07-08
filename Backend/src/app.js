import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middleware/error.middleware.js";
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
        // eslint-disable-next-line no-undef
        origin: process.env.CORS,
        credentials: true,
    }),
);

// use express public to serve static files
app.use(express.static("public/temp"));

// uses custom errorHandler midddleware
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Hello World");
});

import authRoute from "./routes/auth.route.js";
import bookRoute from "./routes/book.route.js";
import addressRoute from "./routes/address.route.js";
import cartRouter from "./routes/cart.route.js";
import categoryRoute from "./routes/category.route.js";
import orderRouter from "./routes/order.route.js";

app.use("/api/v1/book", bookRoute);

app.use("/api/v1/auth", authRoute);

app.use("/api/v1/cart", cartRouter);

app.use("/api/v1/address", addressRoute);

app.use("/api/v1/admin/categories", categoryRoute);

app.use("/api/v1/orders", orderRouter);
export default app;
