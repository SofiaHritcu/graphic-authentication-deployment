const express = require("express");
const UsersUploadedPassPointImage = require("../model/UsersUploadedPassPointImage");
const User = require("../model/User");

/**
 * @route POST ga/api/pass_point/users_uploaded_pass_points
 * @desc Saving the images uploaded by a specific user
 * @access Public
 */
module.exports.users_uploaded_images_post = (req, res) => {
  let { userName, uploadedImage, passPoints } = req.body;
  // check if the user with the userName contained in the request exists
  User.findOne({
    userName,
  }).then((user) => {
    if (!user) {
      return res.status(400).json({
        msg: "User with specified username does not exist.",
      });
    }
  });

  const userUploadedPassPointsToBeSaved = new UsersUploadedPassPointImage({
    userName,
    uploadedImage,
    passPoints,
  });
  userUploadedPassPointsToBeSaved.save().then((userUploadedPassPointsSaved) => {
    return res.status(201).json({
      success: true,
      msg: "The users uploaded pass points have been saved.",
    });
  });
};

/**
 * @route GET ga/api/pass_point/users_uploaded_pass_points
 * @desc Getting all the available pass points uploaded by users
 * @access Public
 */
module.exports.users_uploaded_images_get = (req, res) => {
  UsersUploadedPassPointImage.find().then((usersUploadedPassPoints) => {
    if (!usersUploadedPassPoints) {
      return res.status(404).json({
        msg: "There were no users uploaded pass points found.",
        success: false,
      });
    }
    // if there are any users uploaded pass points => send them back
    res.status(200).json({
      success: true,
      usersUploadedPassPoints,
    });
  });
};

module.exports.user_uploaded_images_get = (req, res) => {
  UsersUploadedPassPointImage.findOne({ userName: req.params.username }).then(
    (userUploadedPassPoints) => {
      if (!userUploadedPassPoints) {
        return res.status(404).json({
          msg: "There were no user uploaded pass points found.",
          success: false,
        });
      }
      // if there are any pass points uploaded by the user => send them back
      res.status(200).json({
        success: true,
        uploadedPassPoints: userUploadedPassPoints.passPoints,
        uploadedImage: userUploadedPassPoints.uploadedImage,
      });
    }
  );
};
