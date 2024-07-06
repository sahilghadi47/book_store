import Book from "../model/books.model.js";
import { functionHandler } from "../utils/functionHandler.js";
import {
    CustomError,
    NotFoundError,
    BadRequestError,
} from "../utils/ErrorHandler.js";
import {
    SuccessResponse as success,
    CreatedResponse as created,
} from "../utils/ResponseHandler.js";
import { cloudDelete, cloudUpload } from "../utils/cloudStorage.js";

const getBooks = functionHandler(async (req, res) => {
    try {
        const { category, sortBy, sortOrder, page, limit } = req.query;

        // Setting default values for pagination
        const pageNumber = parseInt(page) || 1;
        const resultsPerPage = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * resultsPerPage;

        // Building the match object for filtering
        const match = {};
        if (category) {
            match.category = category;
        }

        // Building the sort object for sorting
        const sort = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === "desc" ? -1 : 1;
        }

        // Querying the database with aggregation pipeline
        const books = await Book.aggregate([
            { $match: match },
            { $sort: sort },
            { $skip: skip },
            { $limit: resultsPerPage },
            {
                $project: {
                    title: 1,
                    author: 1,
                    summary: 1,
                    category: 1,
                    price: 1,
                    cover: 1,
                    stock: 1,
                },
            },
        ]);

        if (books.length === 0) {
            throw new NotFoundError("No books found");
        }

        const response = new success("Books fetched successfully", books);
        res.status(response.statusCode).json(response);
    } catch (error) {
        throw new CustomError(error.message);
    }
});

const getBookById = functionHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new BadRequestError("Book id is required");

        const book = await Book.findById(id);

        if (!book) throw new NotFoundError("Book not found");

        const response = new success(
            "Book featched successfully",
            book.toJSON(),
        );

        res.status(response.statusCode).json(response);
    } catch (error) {
        throw new CustomError(error.message, error.statusCode);
    }
});

const addBook = functionHandler(async (req, res) => {
    try {
        const { title, author, summary, category, price } = req.body;

        if (!title || !author || !summary || !category || !price) {
            throw new BadRequestError("All fields are required");
        }
        const file = req.file ? req.file.path : "";

        const book = await Book.create({
            title,
            author,
            summary,
            category,
            price,
        });

        if (file) {
            const coverImage = await cloudUpload(file, "books");
            book.cover.url = coverImage.url;
            book.cover.publicId = coverImage.public_id;
            await book.save();
        }

        const response = new created("Book added successfully", book.toJSON());

        res.status(response.statusCode).json(response);
    } catch (error) {
        throw new CustomError(error.message);
    }
});

const deleteBook = functionHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            throw new NotFoundError("Book not found");
        }

        await Book.findByIdAndDelete(id);
        await cloudDelete(book.cover.publicId);

        const response = new success(
            "Book deleted successfully",
            book.toJSON(),
        );

        res.status(response.statusCode).json(response);
    } catch (error) {
        throw new CustomError(error.message);
    }
});

const updateBook = functionHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new BadRequestError("Book id is required");

        const { title, author, summary, category, price } = req.body;

        const book = await Book.findById(id);

        if (!book) throw new NotFoundError("Book not found");

        title ? (book.title = title) : null;
        author ? (book.author = author) : null;
        summary ? (book.summary = summary) : null;
        category ? (book.category = category) : null;
        price ? (book.price = price) : price;

        await book.save();

        const response = new success(
            "Book updated successfully",
            book.toJSON(),
        );

        res.status(response.statusCode).json(response);
    } catch (error) {
        throw new CustomError(error.message);
    }
});

const searchBook = functionHandler(async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) throw new BadRequestError("Search query is required");

        const books = await Book.aggregate([
            {
                $search: {
                    index: "books",
                    text: {
                        query: q,
                        path: {
                            wildcard: "*",
                        },
                    },
                },
            },
            {
                $project: {
                    title: 1,
                    author: 1,
                    summary: 1,
                    category: 1,
                    price: 1,
                    cover: 1,
                    stock: 1,
                    score: { $meta: "searchScore" },
                },
            },
        ]);
        if (books.length === 0) {
            throw new NotFoundError("No books found");
        }

        const response = new success("Books featched successfully", books);
        return res.status(response.statusCode).json(response);
    } catch {
        throw new CustomError(error.message);
    }
});

export { getBooks, getBookById, addBook, deleteBook, updateBook, searchBook };
