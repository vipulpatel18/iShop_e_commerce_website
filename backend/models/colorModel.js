const mongoose = require("mongoose")

const colorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
        colorCode: {
            type: String
        },
        status: {
            type: Boolean,
            default: 1
        }
    },
    {
        timestamps: true
    }
)

const ColorModel = mongoose.model("Color",colorSchema)
module.exports = ColorModel;