const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
        slug: {
            type: String,
            unique: true
        },
        img_name: {
            type: String,
            default: null
        },
        status: {
            type: Boolean,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const CategoryModel = mongoose.model("Category",categorySchema)
module.exports = CategoryModel;