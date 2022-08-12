const router = require("./authRoutes");
const imagesController = require("../../controllers/imagesController");
const usersUploadedImagesController = require("../../controllers/usersUploadedImagesController");
const { uploadPeopleFaces, loadUploaded } = imagesController;

router.get("/images_categories", imagesController.images_categories_get);

// -------------- people faces -----------------
router.post(
  "/upload_people_faces",
  uploadPeopleFaces.single("file"),
  imagesController.people_faces_image_upload_post
);

router.get("/people_faces_images", imagesController.people_faces_images_get);

router.get(
  "/people_faces_image/:filename",
  imagesController.people_faces_image_get
);

router.get(
  "/people_faces_actual_image/:filename",
  imagesController.people_faces_actual_image_get
);

// ---------------------- uploaded -------------
router.post(
  "/upload_uploaded",
  loadUploaded.single("file"),
  imagesController.uploaded_image_upload_post
);

router.get("/uploaded_images", imagesController.uploaded_images_get);

router.get("/uploaded_image/:filename", imagesController.uploaded_image_get);

router.get(
  "/uploaded_actual_image/:filename",
  imagesController.uploaded_actual_image_get
);

router.delete("/uploaded_images", imagesController.uploaded_images_delete);

// --------------------- users uploaded images ----------------
router.post(
  "/users_uploaded_images",
  usersUploadedImagesController.users_uploaded_images_post
);

router.get(
  "/users_uploaded_images",
  usersUploadedImagesController.users_uploaded_images_get
);

router.get(
  "/user_uploaded_images/:username",
  usersUploadedImagesController.user_uploaded_images_get
);

module.exports = router;
