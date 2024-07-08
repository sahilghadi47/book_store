import Order from "../model/order.model.js";
import { functionHandler } from "../utils/functionHandler.js";
import {
    BadRequestError,
    UnauthorisedError,
    InternalServerError,
    ForbiddenError,
    NotFoundError,
} from "../utils/ErrorHandler.js";
import {
    SuccessResponse as success,
    CreatedResponse as created,
} from "../utils/ResponseHandler.js";
import mongoose from "mongoose";

const getUserOrders = functionHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new UnauthorisedError("Login to access order details");
    }

    const orders = await Order.aggregate([
        {
            $match: {
                user: user._id,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userDetails",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            fullName: 1,
                            email: 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: "books",
                localField: "books",
                foreignField: "_id",
                as: "bookDetails",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            author: 1,
                            price: 1,
                            coverImage: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$bookDetails",
        },
        {
            $project: {
                _id: 1,
                books: 1,
                user: 1,
                quantity: 1,
                status: 1,
                bookDetails: 1,
            },
        },
    ]);

    if (!orders || orders.length === 0) {
        throw new NotFoundError("Orders not found");
    }

    const data = orders.map((order) => ({
        _id: order._id,
        books: order.books,
        user: order.user,
        quantity: order.quantity,
        status: order.status,
        bookDetails: order.bookDetails,
    }));

    const response = new success("Orders fetched successfully", data);
    res.status(response.statusCode).json(response);
});

const deleteOrder = functionHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new UnauthorisedError("Login to access order details");
    }

    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
        throw new NotFoundError("Order not found");
    }

    if (order.user.toString() !== user._id.toString()) {
        throw new ForbiddenError("You are not authorized to delete this order");
    }

    const deletedOrder = await Order.findByIdAndDelete(order._id);

    if (!deletedOrder) {
        throw new InternalServerError("Failed to delete order");
    }

    const response = new success("Order deleted successfully", deletedOrder);
    res.status(response.statusCode).json(response);
});

const updateOrderStatus = functionHandler(async (req, res) => {
    const user = req.user;
    if (!user || user.role !== "admin") {
        throw new ForbiddenError("Only admin can update order status");
    }

    const { id } = req.params;
    if (!id) {
        throw new BadRequestError("Please provide order ID");
    }

    const { status } = req.body;
    if (!status) {
        throw new BadRequestError("Please provide new status");
    }

    const order = await Order.findById(id);
    if (!order) {
        throw new NotFoundError("Order not found");
    }

    order.status = status;
    await order.save();

    const response = new success("Order status updated successfully", order);
    res.status(response.statusCode).json(response);
});

const createOrder = functionHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new UnauthorisedError("Login to place an order");
    }

    const { books, quantity } = req.body;
    if (!books || !books.length) {
        throw new BadRequestError("Please add books to your order");
    }

    const order = await Order.create({
        books,
        quantity,
        user: user._id,
    });

    if (!order) {
        throw new InternalServerError("Failed to place order");
    }

    const response = new created("Order placed successfully", order);
    res.status(response.statusCode).json(response);
});

const getOrderbyId = functionHandler(async (req, res) => {
    const { id } = req.params;

    const order = await Order.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userDetails",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            fullName: 1,
                            email: 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: "books",
                localField: "books",
                foreignField: "_id",
                as: "bookDetails",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            author: 1,
                            price: 1,
                            coverImage: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$bookDetails",
        },
        {
            $project: {
                _id: 1,
                books: 1,
                user: 1,
                quantity: 1,
                status: 1,
                bookDetails: 1,
            },
        },
    ]);

    if (!order || order.length === 0) {
        throw new NotFoundError("Order not found");
    }

    const response = new success("Order fetched successfully", order);
    res.status(response.statusCode).json(response);
});

export {
    getUserOrders,
    deleteOrder,
    updateOrderStatus,
    createOrder,
    getOrderbyId,
};
