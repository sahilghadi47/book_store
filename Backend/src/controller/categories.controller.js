import Categories from "../model/categories.model.js";
import { functionHandler } from "../utils/functionHandler.js";
import {
    SuccessResponse as success,
    CreatedResponse as created,
} from "../utils/ResponseHandler.js";
import {
    BadRequestError,
    UnauthorisedError,
    CustomError,
    NotFoundError,
} from "../utils/ErrorHandler.js";

const addCategories = functionHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) throw new BadRequestError("Name is required");

        const newCategories = await Categories.create({ name });
        const response = new created("new category added", newCategories);

        return res.status(response.statusCode).json(response);
    } catch (error) {
        throw new CustomError(error?.status, error.message);
    }
});

const deleteCategories = functionHandler(async (req, res) => {
    try {
        const user = req.user;
        if (!user)
            throw new UnauthorisedError(
                "You must be logged in to delete a category",
            );
        const { categoryId } = req.params;
        if (!categoryId) throw new BadRequestError("category id is required");

        const category = await Categories.findByIdAndDelete(categoryId);
        if (!category) throw new NotFoundError("category not found");

        const response = new success("category deleted successfully", category);

        return res.status(response.statusCode).json(response);
    } catch (error) {
        throw new CustomError(error?.status, error.message);
    }
});

export { deleteCategories, addCategories };
