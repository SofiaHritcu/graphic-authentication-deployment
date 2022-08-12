const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const ImagesCategory = require("../model/ImagesCategory");

// Init gfs
let peopleFacesGridFsStream, peopleFacesGridFsStreamBucket;
let uploadedGridFsStream, uploadedGridFsStreamBucket;

// bring in the database configs and connect to the db
const db = require("../config/keys").mongoURI;
// create a new connection to the db
const imagesConn = mongoose.createConnection(db);
// initialize the gridFsStream
imagesConn.once("open", () => {
  peopleFacesGridFsStream = Grid(imagesConn.db, mongoose.mongo);
  peopleFacesGridFsStream.collection("people_faces_images");
  uploadedGridFsStream = Grid(imagesConn.db, mongoose.mongo);
  uploadedGridFsStream.collection("uploaded_images");
});

// create the storage object for the people_faces bucket
const peopleFacesImagesStorage = new GridFsStorage.GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // generate random name for the file
      crypto.randomBytes(6, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: "people_faces_images",
        };
        resolve(fileInfo);
      });
    });
  },
});

module.exports.uploadPeopleFaces = multer({
  storage: peopleFacesImagesStorage,
});

// create the storage object for the uploaded bucket
const uploadedImagesStorage = new GridFsStorage.GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // generate random name for the file
      crypto.randomBytes(6, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: "uploaded_images",
        };
        resolve(fileInfo);
      });
    });
  },
});

module.exports.loadUploaded = multer({ storage: uploadedImagesStorage });

/**
 * @route GET ga/api/images/images_categories
 * @desc Getting the available categories of images
 * @access Public
 */
module.exports.images_categories_get = (req, res) => {
  ImagesCategory.find().then((imagesCategories) => {
    if (!imagesCategories) {
      return res.status(404).json({
        msg: "There were no images categories found.",
        success: false,
      });
    }
    // if there are any images categories => send them back
    res.status(200).json({
      success: true,
      imagesCategories,
    });
  });
};

// --------------- people faces -----------------------
/**
 * @route POST ga/api/images/people_faces_image
 * @desc Uploads an image in the people_faces bucket
 * @access Public
 */
module.exports.people_faces_image_upload_post = (req, res) => {
  res.status(200).json({ success: true, file: req.file });
};

/**
 * @route GET ga/api/images/people_faces_images
 * @desc Getting all of the files from the people_faces_images
 * @access Public
 */
module.exports.people_faces_images_get = (req, res) => {
  peopleFacesGridFsStream.files.find().toArray((err, files) => {
    // check if files exist
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    // files exist
    return res.json({ success: true, peopleFacesImages: files });
  });
};

/**
 * @route GET ga/api/images/people_faces_image/:filename
 * @desc Getting a specific file from people_faces_images
 * @access Public
 */
module.exports.people_faces_image_get = (req, res) => {
  peopleFacesGridFsStream.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exist",
        });
      }

      // file exist
      return res.json({ success: true, peopleFacesImage: file });
    }
  );
};

/**
 * @route GET ga/api/images/people_faces_actual_image/:filename
 * @desc Getting the actual image from the people_faces_images
 * @access Public
 */
module.exports.people_faces_actual_image_get = (req, res) => {
  peopleFacesGridFsStream.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exist",
        });
      }

      // check the type of the file
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png"
      ) {
        // read the output from the stream
        peopleFacesGridFsStreamBucket = new mongoose.mongo.GridFSBucket(
          imagesConn.db,
          {
            bucketName: "people_faces_images",
          }
        );
        const readStream = peopleFacesGridFsStreamBucket.openDownloadStream(
          file._id
        );
        readStream.pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image!",
        });
      }
    }
  );
};

// ---------------------------- uploaded ------------------------------
/**
 * @route POST ga/api/images/uploaded_image
 * @desc Uploads an image in the uploaded bucket
 * @access Public
 */
module.exports.uploaded_image_upload_post = (req, res) => {
  res.status(200).json({ success: true, file: req.file });
};

/**
 * @route GET ga/api/images/uploaded_images
 * @desc Getting all of the files from the uploaded_images
 * @access Public
 */
module.exports.uploaded_images_get = (req, res) => {
  uploadedGridFsStream.files.find().toArray((err, files) => {
    // check if files exist
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    // files exist
    return res.json({ success: true, uploadedImages: files });
  });
};

/**
 * @route GET ga/api/images/uploaded_image/:filename
 * @desc Getting a specific file from uploaded_images
 * @access Public
 */
module.exports.uploaded_image_get = (req, res) => {
  uploadedGridFsStream.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exist",
        });
      }

      // file exist
      return res.json({ success: true, uploadedImage: file });
    }
  );
};

/**
 * @route GET ga/api/images/uploaded_actual_image/:filename
 * @desc Getting the actual image from the uploaded_images
 * @access Public
 */
module.exports.uploaded_actual_image_get = (req, res) => {
  uploadedGridFsStream.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exist",
        });
      }
      // check the type of the file
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png"
      ) {
        // read the output from the stream
        uploadedGridFsStreamBucket = new mongoose.mongo.GridFSBucket(
          imagesConn.db,
          {
            bucketName: "uploaded_images",
          }
        );
        const readStream = uploadedGridFsStreamBucket.openDownloadStream(
          file._id
        );
        readStream.pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image!",
        });
      }
    }
  );
};

/**
 * @route DELETE ga/api/images/uploaded_images
 * @desc Deleting the collections related to uploaded_images
 * @access Public
 */
module.exports.uploaded_images_delete = (req, res) => {
  mongoose.connection.db.dropCollection("uploaded_images.chunks");
  mongoose.connection.db.dropCollection("uploaded_images.files");
  return res.json({ success: true });
};
