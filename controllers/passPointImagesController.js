const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

// Init gfs
let passPointImagesGridFsStream, passPointImagesGridFsStreamBucket;

// bring in the database configs and connect to the db
const db = require("../config/keys").mongoURI;
// create a new connection to the db
const passPointImagesConn = mongoose.createConnection(db);
// initialize the gridFsStream
passPointImagesConn.once("open", () => {
  passPointImagesGridFsStream = Grid(passPointImagesConn.db, mongoose.mongo);
  passPointImagesGridFsStream.collection("pass_point_images");
});

// create the storage object for the pass point images bucket
const passPointImagesStorage = new GridFsStorage.GridFsStorage({
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
          bucketName: "pass_point_images",
        };
        resolve(fileInfo);
      });
    });
  },
});

module.exports.uploadPassPointImages = multer({
  storage: passPointImagesStorage,
});

// --------------- pass point images -----------------------
/**
 * @route POST ga/api/pass_point/upload_image
 * @desc Uploads a image in the pass-point bucket
 * @access Public
 */
module.exports.pass_point_image_upload_post = (req, res) => {
  res.status(200).json({ success: true, file: req.file });
};

/**
 * @route GET ga/api/pass_point/images
 * @desc Getting all of the files from the pass-point images
 * @access Public
 */
module.exports.pass_point_images_get = (req, res) => {
  passPointImagesGridFsStream.files.find().toArray((err, files) => {
    // check if files exist
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    // files exist
    return res.json({ success: true, images: files });
  });
};

/**
 * @route GET ga/api/pass_point/image/:filename
 * @desc Getting a specific file from pass-point images
 * @access Public
 */
module.exports.pass_point_image_get = (req, res) => {
  passPointImagesGridFsStream.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exist",
        });
      }

      // file exist
      return res.json({ success: true, image: file });
    }
  );
};

/**
 * @route GET ga/api/pass_point/image_actual/:filename
 * @desc Getting the actual image from the pass-point images
 * @access Public
 */
module.exports.pass_point_image_actual_get = (req, res) => {
  passPointImagesGridFsStream.files.findOne(
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
        file.contentType === "image/png" ||
        file.contentType === "image/gif"
      ) {
        // read the output from the stream
        passPointImagesGridFsStreamBucket = new mongoose.mongo.GridFSBucket(
          passPointImagesConn.db,
          {
            bucketName: "pass_point_images",
          }
        );

        const readStream = passPointImagesGridFsStreamBucket.openDownloadStream(
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
