const express = require("express");
const UsersUploadedImages = require("../model/UsersUploadedImages");
const User = require("../model/User");

/**
 * @route POST ga/api/images/users_uploaded_images
 * @desc Saving the images uploaded by a specific user
 * @access Public
 */
module.exports.users_uploaded_images_post = (req, res) => {
  let { userName, uploadedImages } = req.body;
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

  const usersUploadedImagesToBeSaved = new UsersUploadedImages({
    userName,
    uploadedImages,
  });
  usersUploadedImagesToBeSaved.save().then((usersUploadedImagesSaved) => {
    return res.status(201).json({
      success: true,
      msg: "The users uploaded images have been saved.",
    });
  });
};

/**
 * @route GET ga/api/images/users_uploaded_images
 * @desc Getting all the available images uploaded by users
 * @access Public
 */
module.exports.users_uploaded_images_get = (req, res) => {
  UsersUploadedImages.find().then((usersUploadedImages) => {
    if (!usersUploadedImages) {
      return res.status(404).json({
        msg: "There were no users uploaded images found.",
        success: false,
      });
    }
    // if there are any users uploaded images => send them back
    res.status(200).json({
      success: true,
      usersUploadedImages,
    });
  });
};

module.exports.user_uploaded_images_get = (req, res) => {
  UsersUploadedImages.findOne({ userName: req.params.username }).then(
    (userUploadedImages) => {
      if (!userUploadedImages) {
        return res.status(404).json({
          msg: "There were no user uploaded images found.",
          success: false,
        });
      }
      // if there are any images uploaded by the user => send them back
      res.status(200).json({
        success: true,
        uploadedImages: userUploadedImages.uploadedImages,
      });
    }
  );
};
