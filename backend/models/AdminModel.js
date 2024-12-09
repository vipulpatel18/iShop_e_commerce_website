const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },
        contact: {
            type: String,
            required: [true, "Number is required"],
            // unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
        },
        role: {
            type: Boolean,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);


const AdminModel = mongoose.model("Admin", adminSchema);

module.exports = AdminModel;