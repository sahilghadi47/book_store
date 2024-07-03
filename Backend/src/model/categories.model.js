import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
    ],
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
