const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the UsersUploadedImages Schema
const UsersUploadedImagesSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  uploadedImages: {
    type: Array,
    required: true,
  },
});

module.exports = UsersUploadedImages = mongoose.model(
  "users_uploaded_images",
  UsersUploadedImagesSchema
);
