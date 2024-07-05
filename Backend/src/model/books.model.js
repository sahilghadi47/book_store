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
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        cover: {
            type: Object,
            default: {
                url: "",
                publicId: "",
            },
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

bookSchema.toJSON = function () {
    const book = this.toObject();
    delete book.updatedAt;
    delete book.createdAt;
    delete book.__v;
    return book;
};

bookSchema.pre("save", function (next) {
    this.title = this.title.toLowerCase();
    this.author = this.author.toLowerCase();
    this.summary = this.summary.toLowerCase();
    next();
});

const Book = mongoose.model("Book", bookSchema);

bookSchema.indexes({
    title: "text",
    author: "text",
    summary: "text",
});

export default Book;
