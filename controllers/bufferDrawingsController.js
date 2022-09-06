const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const UploadedBufferDrawings = require("../model/UploadedBufferDrawings");

// Init gfs
let bufferDrawingsGridFsStream, bufferDrawingsGridFsStreamBucket;

// bring in the database configs and connect to the db
const db = require("../config/keys").mongoURI;
// create a new connection to the db
const bufferDrawingsConn = mongoose.createConnection(db);
// initialize the gridFsStream
bufferDrawingsConn.once("open", () => {
  bufferDrawingsGridFsStream = Grid(bufferDrawingsConn.db, mongoose.mongo);
  bufferDrawingsGridFsStream.collection("buffer_drawings");
});

// create the storage object for the drawings bucket
const bufferDrawingsStorage = new GridFsStorage.GridFsStorage({
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
          bucketName: "buffer_drawings",
        };
        resolve(fileInfo);
      });
    });
  },
});

module.exports.uploadBufferDrawings = multer({
  storage: bufferDrawingsStorage,
});

// --------------- buffer drawings -----------------------
/**
 * @route POST ga/api/buffer_drawings/drawings
 * @desc Uploads an image in the buffer drawings bucket
 * @access Public
 */
module.exports.buffer_drawing_upload_post = (req, res) => {
  res.status(200).json({ success: true, file: req.file });
};

/**
 * @route GET ga/api/buffer_drawings/drawings
 * @desc Getting all of the files from the buffer drawings
 * @access Public
 */
module.exports.buffer_drawings_get = (req, res) => {
  bufferDrawingsGridFsStream.files.find().toArray((err, files) => {
    // check if files exist
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    // files exist
    return res.json({ success: true, bufferDrawings: files });
  });
};

/**
 * @route GET ga/api/buffer_drawings/drawing/:filename
 * @desc Getting a specific file from drawings
 * @access Public
 */
module.exports.buffer_drawing_get = (req, res) => {
  bufferDrawingsGridFsStream.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exist",
        });
      }

      // file exist
      return res.json({ success: true, bufferDrawings: file });
    }
  );
};

/**
 * @route GET ga/api/buffer_drawings/buffer_drawing_actual/:filename
 * @desc Getting the actual image from the drawings
 * @access Public
 */
module.exports.buffer_drawings_actual_get = (req, res) => {
  bufferDrawingsGridFsStream.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }

      // check the type of the file
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png" ||
        file.contentType === "image/gif"
      ) {
        // read the output from the stream
        bufferDrawingsGridFsStreamBucket = new mongoose.mongo.GridFSBucket(
          bufferDrawingsConn.db,
          {
            bucketName: "buffer_drawings",
          }
        );
        const readStream = bufferDrawingsGridFsStreamBucket.openDownloadStream(
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

// ------------------------ uploaded buffer drawings ----------------
/**
 * @route GET ga/api/buffer_drawings/uploaded_drawings
 * @desc Getting all the available buffer drawings uploaded
 * @access Public
 */
module.exports.uploaded_drawings_get = (req, res) => {
  UploadedBufferDrawings.find().then((uploadedBufferDrawing) => {
    if (!uploadedBufferDrawing) {
      return res.status(404).json({
        msg: "There were no users uploaded buffer drawings found.",
        success: false,
      });
    }
    // if there are any users uploaded drawings => send them back
    res.status(200).json({
      success: true,
      uploadedBufferDrawing,
    });
  });
};
