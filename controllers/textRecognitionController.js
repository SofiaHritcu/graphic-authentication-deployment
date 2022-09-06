const tesseract = require("tesseract.js");
const CONFIDENCE_LIMIT_TEXT_RECOGN =
  require("../config/consts").confidenceLimitTextRecogn;

module.exports.text_recognition_post = async (req, res) => {
  const passPointImageFile = req.file;
  const textRecognitionResponse = await tesseract.recognize(
    passPointImageFile.buffer,
    "eng"
  );

  const imageContainsText =
    textRecognitionResponse.data.confidence >= CONFIDENCE_LIMIT_TEXT_RECOGN;

  return res.json({
    success: true,
    containsText: imageContainsText,
  });
};
