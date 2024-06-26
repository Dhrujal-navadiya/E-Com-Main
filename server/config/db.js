const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/no1")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Could not connect to MongoDB", error);
  });
