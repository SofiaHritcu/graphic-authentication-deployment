const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the UploadedBufferPeopleFacesImages Schema
const UploadedBufferPeopleFacesImagesSchema = new Schema({
  bufferImagesFilenames: {
    type: Array,
    required: true,
  },
});

module.exports = UploadedBufferPeopleFacesImages = mongoose.model(
  "uploaded_buffer_people_faces_images",
  UploadedBufferPeopleFacesImagesSchema
);
