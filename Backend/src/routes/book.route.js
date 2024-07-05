import { Router } from "express";

import {
    getBookById,
    getBooks,
    addBook,
    deleteBook,
    updateBook,
    searchBook,
} from "../controller/book.controller.js";

import { verifyJwt, hasRole } from "../middleware/auth.middleware.js";
const bookRoute = Router();

bookRoute.get("/getBooks", getBooks);
bookRoute.get("/getBookById/:id", getBookById);

bookRoute.post("/createBook", verifyJwt, hasRole("admin"), addBook);
bookRoute.put("/updateBook/:id", verifyJwt, hasRole("admin"), updateBook);
bookRoute.delete("/deleteBook/:id", verifyJwt, hasRole("admin"), deleteBook);
bookRoute.get("/searchBook", searchBook);

export default bookRoute;
