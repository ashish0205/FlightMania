"use strict";

const Prd = require("./model/product");
const mongoose = require("mongoose");

module.exports.addProduct = function (req, res) {
  let title = req.body.title;
  let price = req.body.price;
  let description = req.body.description;
  console.log(title, description);

  Prd.create(
    {
      _id: new mongoose.Types.ObjectId(),
      title: title,
      price: price,
      description: description,
    },
    (error, post) => {
      console.log(error, post);
    }
  );

  res
    .status(201)
    .json({ message: "inserted successfully", createdProduct: Prd });
};
