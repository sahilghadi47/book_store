import Cart from "../model/cart.model.js";
import User from "../model/user.model.js";
import { functionHandler } from "../utils/functionHandler.js";
import {
    NotFoundError,
    UnauthorisedError,
    BadRequestError,
} from "../utils/ErrorHandler.js";
import {
    SuccessResponse as success,
    CreatedResponse as created,
} from "../utils/ResponseHandler.js";

const addToCart = functionHandler(async (req, res) => {
    const userID = req.user?._id;
    if (!userID) {
        throw new UnauthorisedError("Login to add items to cart");
    }

    const user = await User.findById(userID);
    if (!user) {
        throw new NotFoundError("User not found");
    }

    const { booksID, quantity } = req.body;
    if (!booksID) {
        throw new BadRequestError("Invalid book ID");
    }

    const cart = await Cart.findOne({ user: userID });
    if (!cart) {
        const newCart = await Cart.create({
            user: userID,
            books: { booksID, quantity: quantity || 1 },
        });
        const response = new created("New cart created successfully", newCart);
        return res.status(response.statusCode).json(response);
    }

    cart.books.push({ booksID, quantity: quantity || 1 });
    await cart.save();
    const response = new success("Book added to cart successfully", cart);
    return res.status(response.statusCode).json(response);
});

const getCart = functionHandler(async (req, res) => {
    const userID = req.user?._id;
    if (!userID) {
        throw new UnauthorisedError("Login to get cart details");
    }

    const user = await User.findById(userID);
    if (!user) {
        throw new NotFoundError("User not found");
    }

    const cart = await Cart.findOne({ user: userID });
    if (!cart) {
        throw new NotFoundError("Cart not found");
    }

    const response = new success("Cart fetched successfully", cart);
    return res.status(response.statusCode).json(response);
});

const removeFromCart = functionHandler(async (req, res) => {
    const userID = req.user?._id;
    if (!userID) {
        throw new UnauthorisedError("Login to access cart");
    }

    const user = await User.findById(userID);
    if (!user) {
        throw new NotFoundError("User not found");
    }

    const { booksID } = req.body;
    if (!booksID) {
        throw new BadRequestError("Invalid book ID");
    }

    const cart = await Cart.findOne({ user: userID });
    if (!cart) {
        throw new NotFoundError("Cart not found");
    }

    cart.books = cart.books.pull({ _id: booksID });
    await cart.save();
    const response = new success("Book removed from cart successfully", cart);
    return res.status(response.statusCode).json(response);
});

export { addToCart, getCart, removeFromCart };
