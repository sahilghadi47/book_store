import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
