import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        cover: {
            type: String,
            default: "",
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

const Book = mongoose.model("Book", bookSchema);

Book.createIndexes({
    title: "text",
    author: "text",
});

export default Book;
