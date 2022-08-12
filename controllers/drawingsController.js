const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

// Init gfs
let drawingsGridFsStream, drawingsGridFsStreamBucket;

// bring in the database configs and connect to the db
const db = require("../config/keys").mongoURI;
// create a new connection to the db
const drawingsConn = mongoose.createConnection(db);
// initialize the gridFsStream
drawingsConn.once("open", () => {
  drawingsGridFsStream = Grid(drawingsConn.db, mongoose.mongo);
  drawingsGridFsStream.collection("drawings");
});

// create the storage object for the drawings bucket
const drawingsStorage = new GridFsStorage.GridFsStorage({
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
          bucketName: "drawings",
        };
        resolve(fileInfo);
      });
    });
  },
});

module.exports.uploadDrawings = multer({
  storage: drawingsStorage,
});

// --------------- drawings -----------------------
/**
 * @route POST ga/api/drawings/drawings
 * @desc Uploads an image in the drawings bucket
 * @access Public
 */
module.exports.drawing_upload_post = (req, res) => {
  res.status(200).json({ success: true, file: req.file });
};

/**
 * @route GET ga/api/drawings/drawings
 * @desc Getting all of the files from the drawings
 * @access Public
 */
module.exports.drawings_get = (req, res) => {
  drawingsGridFsStream.files.find().toArray((err, files) => {
    // check if files exist
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    // files exist
    return res.json({ success: true, drawings: files });
  });
};

/**
 * @route GET ga/api/drawings/drawing/:filename
 * @desc Getting a specific file from drawings
 * @access Public
 */
module.exports.drawing_get = (req, res) => {
  drawingsGridFsStream.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exist",
        });
      }

      // file exist
      return res.json({ success: true, drawing: file });
    }
  );
};

/**
 * @route GET ga/api/drawings/drawing_actual/:filename
 * @desc Getting the actual image from the drawings
 * @access Public
 */
module.exports.drawing_actual_get = (req, res) => {
  drawingsGridFsStream.files.findOne(
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
        drawingsGridFsStreamBucket = new mongoose.mongo.GridFSBucket(
          drawingsConn.db,
          {
            bucketName: "drawings",
          }
        );
        const readStream = drawingsGridFsStreamBucket.openDownloadStream(
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
