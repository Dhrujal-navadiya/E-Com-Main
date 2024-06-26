const mongoose = require("mongoose");

const categoeySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
});

const Category = mongoose.model("categories", categoeySchema);

module.exports = Category;
