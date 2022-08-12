const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the UsersUploadedDrawings Schema
const UploadedBufferDrawingsSchema = new Schema({
  bufferDrawingsFilenames: {
    type: Array,
    required: true,
  },
});

module.exports = UploadedBufferDrawings = mongoose.model(
  "uploaded_buffer_drawings",
  UploadedBufferDrawingsSchema
);
