const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  cart: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      dairport: { type: String, required: true },
      arairport: { type: String, required: true },
      airlname: { type: String, required: true },
      airlcode: { type: String, required: true },
      diata: { type: String, required: true },
      aiata: { type: String, required: true },
      from: { type: String, required: true },
      to: { type: String, required: true },
      date: {
        type: Date,
        default: Date.now(),
      },
      time: { type: String, require: true },
      clas: { type: String, require: true },
      flightnum: { type: String, require: true },
      price: { type: Number, require: true },
      qty: { type: Number, require: true },
    },
  ],

  history: [
    {
      _id: mongoose.Schema.Types.ObjectId,

      dairport: { type: String, required: true },
      arairport: { type: String, required: true },
      airlname: { type: String, required: true },
      airlcode: { type: String, required: true },
      diata: { type: String, required: true },
      aiata: { type: String, required: true },
      from: { type: String, required: true },
      to: { type: String, required: true },
      date: {
        type: Date,
        default: Date.now(),
      },
      time: { type: String, require: true },
      clas: { type: String, require: true },
      flightnum: { type: String, require: true },
      price: { type: Number, require: true },
      qty: { type: Number, require: true },
    },
  ],
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
