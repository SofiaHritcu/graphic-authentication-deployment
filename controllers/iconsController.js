const express = require("express");
const IconsCategory = require("../model/IconsCategory");

/**
 * @route GET ga/api/icons/icons_categories
 * @desc Getting the available categories of icons
 * @access Public
 */
module.exports.icons_categories_get = (req, res) => {
  IconsCategory.find().then((iconsCategories) => {
    if (!iconsCategories) {
      return res.status(404).json({
        msg: "There were no icons categories found.",
        success: false,
      });
    }
    // if there are any icons categories => send them back
    res.status(200).json({
      success: true,
      iconsCategories,
    });
  });
};
