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
      name: { type: String, required: true },
      quantity: { type: Number },
    },
  ],
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
