import Address from "../model/address.model.js";
import User from "../model/user.model.js";
import {
    BadRequestError,
    CustomError,
    NotFoundError,
    UnAuthorizedError,
} from "../utils/ErrorHandler.js";
import {
    SuccessResponse as success,
    CreatedResponse as created,
} from "../utils/ResponseHandler.js";

import { functionHandler } from "../utils/functionHandler.js";

const addAddress = functionHandler(async (req, res) => {
    try {
        const user = req.user;
        if (!user)
            throw new UnAuthorizedError(
                "You must be logged in to add an address",
            );

        const { street, area, city, state, country, pincode } = req.body;

        if (!street || !area || !city || !state || !country || !pincode)
            throw new BadRequestError("All fields are required");

        const address = await Address.create({
            user: user._id,
            street,
            area,
            city,
            state,
            country,
            pincode,
        });
        await User.findByIdAndUpdate(user._id, {
            $push: { addresses: address._id },
        });

        const response = new created("Address added successfully", address);

        return res.status(response.statusCode).json(response);
    } catch (error) {
        if (error instanceof ValidationError) {
            const response = new BadRequestError(error.message);
            return res.status(response.statusCode).json(response);
        }
        throw new InternalServerError(error.message);
    }
});

const updateAddress = functionHandler(async (req, res) => {
    try {
        const user = req.user;
        if (!user)
            throw new UnAuthorizedError(
                "You must be logged in to update an address",
            );
        const { addressId } = req.params;
        const { street, area, city, state, country, pincode } = req.body;

        if (!street || !area || !city || !state || !country || !pincode)
            throw new BadRequestError("All fields are required");

        const address = await Address.findById(addressId);
        if (!address) throw new NotFoundError("Address not found");

        address.street = street;
        address.area = area;
        address.city = city;
        address.state = state;
        address.country = country;
        address.pincode = pincode;
        await address.save();

        const response = new success("Address updated successfully", address);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        throw new CustomError(error?.status, error.message);
    }
});

const deleteAddress = functionHandler(async (req, res) => {
    try {
        const user = req.user;
        if (!user)
            throw new UnAuthorizedError(
                "You must be logged in to delete an address",
            );
        const { addressId } = req.params;

        const address = await Address.findByIdAndDelete(addressId);

        if (!address) throw new NotFoundError("Address not found");

        await User.findByIdAndUpdate(user._id, {
            $pull: { addresses: address._id },
        });

        const response = new success("Address deleted successfully", address);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        throw new CustomError(error?.status, error.message);
    }
});

export { addAddress, updateAddress, deleteAddress };
