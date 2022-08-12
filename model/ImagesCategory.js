const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the ImagesCategory Schema
const ImagesCategorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
});

module.exports = ImagesCategory = mongoose.model(
  "images",
  ImagesCategorySchema
);
