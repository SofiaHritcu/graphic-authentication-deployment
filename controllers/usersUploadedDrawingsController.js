const express = require("express");
const UsersUploadedDrawings = require("../model/UsersUploadedDrawings");
const User = require("../model/User");

/**
 * @route POST ga/api/drawings/users_uploaded_drawings
 * @desc Saving the drawings uploaded by a specific user
 * @access Public
 */
module.exports.users_uploaded_drawings_post = (req, res) => {
  let { userName, uploadedDrawings } = req.body;
  // check if the user with the userName contained in the request exists
  User.findOne({
    userName,
  }).then((user) => {
    if (!user) {
      return res.status(404).json({
        msg: "User with specified username does not exist.",
      });
    }
  });

  const usersUploadedDrawingsToBeSaved = new UsersUploadedDrawings({
    userName,
    uploadedDrawings,
  });
  usersUploadedDrawingsToBeSaved.save().then((usersUploadedDrawingsSaved) => {
    return res.status(201).json({
      success: true,
      msg: "The users uploaded drawings have been saved.",
    });
  });
};

/**
 * @route GET ga/api/drawings/users_uploaded_drawings
 * @desc Getting all the available drawings uploaded by users
 * @access Public
 */
module.exports.users_uploaded_drawings_get = (req, res) => {
  UsersUploadedDrawings.find().then((usersUploadedDrawings) => {
    if (!usersUploadedDrawings) {
      return res.status(404).json({
        msg: "There were no users uploaded drawings found.",
        success: false,
      });
    }
    // if there are any users uploaded drawings => send them back
    res.status(200).json({
      success: true,
      usersUploadedDrawings,
    });
  });
};

/**
 * @route GET ga/api/drawings/users_uploaded_drawing/:username
 * @desc Getting the drawings uploaded by a specified user
 * @access Public
 */
module.exports.user_uploaded_drawings_get = (req, res) => {
  UsersUploadedDrawings.findOne({ userName: req.params.username }).then(
    (usersUploadedDrawings) => {
      if (!usersUploadedDrawings) {
        return res.status(404).json({
          msg: "There were no user uploaded drawings found.",
          success: false,
        });
      }
      // if there are any drawings uploaded by the user => send them back
      res.status(200).json({
        success: true,
        usersUploadedDrawings: usersUploadedDrawings.uploadedDrawings,
      });
    }
  );
};
