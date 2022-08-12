const router = require("./authRoutes");
const drawingsController = require("../../controllers/drawingsController");
const usersUploadedDrawingsController = require("../../controllers/usersUploadedDrawingsController");
const { uploadDrawings } = drawingsController;

// -------------- drawings -----------------
router.post(
  "/upload_drawing",
  uploadDrawings.single("file"),
  drawingsController.drawing_upload_post
);

router.get("/drawings", drawingsController.drawings_get);

router.get("/drawing/:filename", drawingsController.drawing_get);

router.get("/drawing_actual/:filename", drawingsController.drawing_actual_get);

// --------------------- users uploaded drawings ----------------
router.post(
  "/users_uploaded_drawings",
  usersUploadedDrawingsController.users_uploaded_drawings_post
);

router.get(
  "/users_uploaded_drawings",
  usersUploadedDrawingsController.users_uploaded_drawings_get
);

router.get(
  "/user_uploaded_drawings/:username",
  usersUploadedDrawingsController.user_uploaded_drawings_get
);

module.exports = router;
