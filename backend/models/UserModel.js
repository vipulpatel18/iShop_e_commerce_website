const mongoose = require('mongoose');

const ShippingAddressShema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    _id: false
  }
)

const UserSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ShippingAddress: {
    type: [ShippingAddressShema],
    default: []
  }
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
