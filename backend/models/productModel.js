const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 100,
            unique: true
        },
        slug: {
            type: String,
            maxLength: 100,
            unique: true
        },
        category_id: {
            type: mongoose.Schema.ObjectId,
            ref: "Category"
        },
        colors: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Color"
            }
        ],
        main_image: {
            type: String,
            default: null
        },
        others_images: [
            {
                type: String
            }
        ],
        original_price: {
            type: Number,
            default: 1
        },
        discounted_price: {
            type: Number,
            default: 0
        },
        final_price: {
            type: Number,
            min: 1
        },
        long_description: {
            type: String
        },
        short_description: {
            type: String
        },
        status: {
            type: Boolean,
            default: 1
        },
        stock: {
            type: Boolean,
            default: 0
        },
        top_selling: {
            type: Boolean,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
