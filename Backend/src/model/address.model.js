import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        street: {
            type: String,
            required: true,
        },
        area: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
            validate: {
                validator: function (v) {
                    return /^[1-9][0-9]{5}$/.test(v);
                },
                message: "Pincode must be a 6-digit number",
            },
        },
        country: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
const Address = mongoose.model("Address", addressSchema);
export default Address;
