const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../config/keys").secret;
const User = require("../model/User");

/**
 * @route POST ga/api/users/register
 * @desc Register the User
 * @access Public
 */
module.exports.signup_post = async (req, res) => {
  let { name, userName, email, password, confirmPassword } = req.body;
  let errorMessages = [];
  if (password !== confirmPassword) {
    errorMessages.push("Password do not match.");
  }

  // check for the unique userName
  const userHasUniqueUserName = await User.findOne({
    userName,
  });
  if (userHasUniqueUserName) {
    errorMessages.push("Username is already taken.");
  }

  // check for the unique email
  const userHasUniqueEmail = await User.findOne({
    email,
  });
  if (userHasUniqueEmail) {
    errorMessages.push("Email is already taken.");
  }

  if (errorMessages.length !== 0) {
    return res.status(400).json({
      msg: errorMessages,
    });
  }

  // user data registration is valid
  let userToBeRegistered = new User({
    name,
    userName,
    password,
    email,
  });

  // hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(userToBeRegistered.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }

      userToBeRegistered.password = hash;
      userToBeRegistered.save().then((userRegistered) => {
        return res.status(201).json({
          success: true,
          msg: "The user has been registered.",
        });
      });
    });
  });

  return;
};

/**
 * @route POST ga/api/users/login
 * @desc Signing in the User
 * @access Public
 */
module.exports.login_post = (req, res) => {
  User.findOne({ userName: req.body.userName }).then((user) => {
    if (!user) {
      return res.status(404).json({
        msg: "Username was not found.",
        success: false,
      });
    }
    // if the user exists => password checking
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        // user's password is correct
        // the token can be sent
        const payload = {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
        };
        jwt.sign(
          payload,
          key,
          { expiresIn: 1000 * 60 * 60 * 24 },
          (err, token) => {
            res.status(200).json({
              success: true,
              user,
              token: `Bearer ${token}`,
              msg: "The user is now logged in.",
            });
          }
        );
      } else {
        return res.status(404).json({
          msg: "Incorrect password.",
          success: false,
        });
      }
    });
  });
};

/**
 * @route GET ga/api/users/home
 * @desc Return the user's data
 * @access Private
 */
module.exports.home_get = (req, res) => {
  return res.json({
    user: req.user,
  });
};
