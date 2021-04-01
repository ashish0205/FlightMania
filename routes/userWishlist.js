const express = require("express");

const router = express.Router();

const { MongoClient, ObjectID } = require("mongodb");
//const auth = require("../middleware/auth");

const User = require("../model/userSchema");
const mongoose = require("mongoose");

router.post("/addtowishlist", async (req, res) => {
  const { name, iduser } = req.body;
  console.log(name, iduser);

  const updatCart = {
    _id: new mongoose.Types.ObjectId(),
    name: name,
    quantity: 1,
  };
  try {
    let wishlist = await User.findOneAndUpdate(
      iduser,
      { $push: { cart: updatCart } },
      { safe: true, upsert: true, new: true },
      (err, user) => {
        if (err) {
          console.log(err);
        }

        console.log("hello" + user);
      }
    );
    if (!wishlist) {
      return res.status(200).json({
        msg: "Not able to save to cart",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
});

router.post("/wishlist", async (req, res) => {
  const { iduser } = req.body;
  User.findById(iduser)
    .populate("cart")
    .exec((err, posts) => {
      res.json({
        status: "200",
        posts,
        message: "data recieved successfully",
      });
    });
});
module.exports = router;
