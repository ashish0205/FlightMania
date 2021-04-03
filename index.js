const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
const InitiateMongoServer = require("./config/database");
const addprod = require("./addProduct");
const user = require("./routes/user");
const wishlist = require("./routes/userWishlist");

const searchEngine = require("./routes/searchEngine");

InitiateMongoServer();
// PORT
const PORT = process.env.PORT || 4000;
app.use(cors());
// Middleware
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});
app.use("/user", user);

//app.post("/uu", wishlist.addwish);
app.use("/user", wishlist);
app.use("/user", searchEngine);
// mongoose
//   .connect(
//     "mongodb+srv://admin:020593@cluster0.rrtec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//   )
//   .then((result) => app.listen(8080))
//   .catch((err) => {
//     console.log(err);
//   });

//app.post("/api/addProd", addprod.addProduct);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
