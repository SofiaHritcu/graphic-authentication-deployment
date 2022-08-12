const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the UsersUploadedDrawings Schema
const UsersUploadedDrawingsSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  uploadedDrawings: {
    type: Array,
    required: true,
  },
});

module.exports = UsersUploadedDrawings = mongoose.model(
  "users_uploaded_drawings",
  UsersUploadedDrawingsSchema
);
