const router = require("./authRoutes");
const passPointImagesController = require("../../controllers/passPointImagesController");
const usersUploadedPassPointImage = require("../../controllers/usersUploadedPassPointImageController");
const { uploadPassPointImages } = passPointImagesController;

// -------------- pass-point images -----------------
router.post(
  "/upload_image",
  uploadPassPointImages.single("file"),
  passPointImagesController.pass_point_image_upload_post
);

router.get("/images", passPointImagesController.pass_point_images_get);

router.get("/image/:filename", passPointImagesController.pass_point_image_get);

router.get(
  "/image_actual/:filename",
  passPointImagesController.pass_point_image_actual_get
);

// --------------------- users uploaded pass-points ----------------
router.post(
  "/users_uploaded_pass_points",
  usersUploadedPassPointImage.users_uploaded_images_post
);

router.get(
  "/users_uploaded_pass_points",
  usersUploadedPassPointImage.users_uploaded_images_get
);

router.get(
  "/user_uploaded_pass_points/:username",
  usersUploadedPassPointImage.user_uploaded_images_get
);

module.exports = router;
