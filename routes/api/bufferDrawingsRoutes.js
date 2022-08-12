const router = require("./authRoutes");
const bufferDrawingsController = require("../../controllers/bufferDrawingsController");
const { uploadBufferDrawings } = bufferDrawingsController;

// -------------- buffer drawings -----------------
router.post(
  "/upload_drawing",
  uploadBufferDrawings.single("file"),
  bufferDrawingsController.buffer_drawing_upload_post
);

router.get("/drawings", bufferDrawingsController.buffer_drawings_get);

router.get("/drawing/:filename", bufferDrawingsController.buffer_drawing_get);

router.get(
  "/buffer_drawing_actual/:filename",
  bufferDrawingsController.buffer_drawings_actual_get
);

// --------------------- uploaded buffer drawings ----------------
router.get(
  "/uploaded_drawings",
  bufferDrawingsController.uploaded_drawings_get
);

module.exports = router;
