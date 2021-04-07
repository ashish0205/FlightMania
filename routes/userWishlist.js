const express = require("express");

const router = express.Router();

const { MongoClient, ObjectID } = require("mongodb");
//const auth = require("../middleware/auth");

const User = require("../model/userSchema");
const mongoose = require("mongoose");

router.post("/addtowishlist", async (req, res) => {
  const {
    dairport,
    arairport,
    airlname,
    airlcode,
    diata,
    aiata,
    from,
    to,
    time,
    clas,
    flightnum,
    price,
    qty,
    iduser,
  } = req.body;
  // console.log(name, iduser);

  const updatCart = {
    _id: new mongoose.Types.ObjectId(),
    dairport: dairport,
    arairport: arairport,
    airlname: airlname,
    airlcode: airlcode,
    diata: diata,
    aiata: aiata,
    from: from,
    to: to,
    time: time,
    clas: clas,
    flightnum: flightnum,
    price: price,
    qty: qty,
  };
  try {
    let wishlist = User.findOneAndUpdate(
      iduser,
      { $push: { cart: updatCart } },
      { safe: true, upsert: true, new: true },
      (err, user) => {
        if (err) {
          res.json({
            status: 400,
            err,
          });
        }
        res.json({
          status: 200,
          user,
          message: "data added successfully",
        });
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
      const { post1, cart, history } = posts;
      console.log(cart);
      res.json({
        status: "200",
        cart: cart,
        history: history,
        message: "data recieved successfully",
      });
    });
});

router.post("/removewishlistitem", async (req, res) => {
  const { iduser, cartid } = req.body;

  User.updateOne(
    { _id: iduser },
    { $pull: { cart: { _id: cartid } } },
    function (err, results) {
      if (!err) {
        res.json({
          status: 200,
          message: "Deleted Successfully",
        });
      } else {
        res.json({
          status: 200,
          message: "There is some problem in deleting",
          err,
        });
        //    res.redirect("/");
      }
    }
  );
});

router.post("/updatewishlistitem", async (req, res) => {
  const { iduser, cartid, qty, clas, price } = req.body;

  User.updateOne(
    { _id: iduser, "cart._id": cartid },
    { $set: { "cart.$.qty": qty, "cart.$.clas": clas, "cart.$.price": price } },

    function (err, results) {
      if (!err) {
        res.json({
          status: 200,
          message: "Updated Successfully",
        });
        //   res.redirect("data");
      } else {
        res.json({
          status: 200,
          message: "There is some Issue",
          err,
        });
      }
    }
  );
});

router.post("/userhistory", async (req, res) => {
  const {
    dairport,
    arairport,
    airlname,
    airlcode,
    diata,
    aiata,
    from,
    to,
    time,
    clas,
    flightnum,
    price,
    qty,
    iduser,
  } = req.body;
  // console.log(name, iduser);

  const userhistory = {
    _id: new mongoose.Types.ObjectId(),
    dairport: dairport,
    arairport: arairport,
    airlname: airlname,
    airlcode: airlcode,
    diata: diata,
    aiata: aiata,
    from: from,
    to: to,
    time: time,
    clas: clas,
    flightnum: flightnum,
    price: price,
    qty: qty,
  };
  try {
    let histry = User.findOneAndUpdate(
      iduser,
      { $push: { history: userhistory } },
      { safe: true, upsert: true, new: true },
      (err, user) => {
        if (err) {
          res.json({
            status: 400,
            err,
          });
        }
        res.json({
          status: 200,
          user,
          message: "added to history",
        });
      }
    );
    if (!histry) {
      return res.status(200).json({
        msg: "Not able to save to cart",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
});

module.exports = router;
