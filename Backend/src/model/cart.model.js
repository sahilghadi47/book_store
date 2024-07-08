import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        books: [
            {
                booksID: {
                    type: mongoose.Schema.ObjectId,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
