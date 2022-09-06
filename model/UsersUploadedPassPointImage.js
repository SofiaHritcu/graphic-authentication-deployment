const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the UsersUploadedPassPointImage Schema
const UsersUploadedPassPointImageSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  uploadedImage: {
    type: String,
    required: true,
  },
  passPoints: {
    type: Array,
    required: true,
  },
});

module.exports = UsersUploadedPassPointImage = mongoose.model(
  "users_uploaded_pass_point_image",
  UsersUploadedPassPointImageSchema
);
