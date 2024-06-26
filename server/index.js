const express = require("express");
const bodyParser = require("body-parser");
const port = 8000;
const app = express();
require("./config/db");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

app.get("/", (req, res) => {
  res.send("Hello from express.");
});

const authRouter = require("./Routers/authRoutes");
app.use("/auth", authRouter);

const ProductRouter = require("./Routers/SellerRouter/ProductRouter");
app.use("/api", ProductRouter);

const CategoriesRouter = require("./Routers/SellerRouter/CategoryRouter");
app.use("/Category", CategoriesRouter);

const BuyerRouter = require("./Routers/BuyerRouter/BuyerRouter");
app.use("/Buyer", BuyerRouter);

const SellerRouter = require("./Routers/SellerRouter/SellerRouter");
app.use("/Seller", SellerRouter);

const SellerCartRouter = require("./Routers/SellerRouter/SellerCartRouter");
app.use("/Sellercart", SellerCartRouter);

const BuyerCartRouter = require("./Routers/BuyerRouter/BuyerCartRouter");
app.use("/Buyercart", BuyerCartRouter);

app.listen(port, () => {
  console.log("server run on port no :", port);
});
