var multer = require("multer");
const router = require("./authRoutes");
const textRecognitionController = require("../../controllers/textRecognitionController");
const upload = multer();
// -------------- text recognition -----------------
router.post(
  "/recogn",
  upload.single("file"),
  textRecognitionController.text_recognition_post
);

module.exports = router;
