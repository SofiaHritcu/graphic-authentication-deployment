const fetch = require("node-fetch");
const fs = require("fs");
var http = require("http");

request = require("request");

var download = function (url, dest, cb) {
  var file = fs.createWriteStream(dest);
  http.get(url, function (response) {
    response.pipe(file);
    file.on("finish", function () {
      file.close(cb);
    });
  });
};

download(
  "http://localhost:5001/ga/api/drawings/drawing_actual/afc348cbf1fa.png",
  "google.png",
  function () {
    console.log("done");
  }
);

const deepai = require("deepai");

deepai.setApiKey("a9d8ad56-d85d-419d-b7ed-d671ef24ff40");

// const getFileFromUrl = async (url, name, defaultType = "image/jpeg") => {
//   const response = await fetch(url);
//   const data = await response.blob();
//   fs.writeFile(name, Buffer.from(new Uint8Array(data)), (err) => {
//     console.log(err);
//   });
// };

const drawingsSimilarityApiCall = async (firstImageURL, secondImageURL) => {
  //   await getFileFromUrl(
  //     "http://localhost:5001/ga/api/drawings/drawing_actual/afc348cbf1fa.png",
  //     "1.jpg"
  //   );
  //   const resp = await deepai.callStandardApi("image-similarity", {
  //     image1: fs.createReadStream("1.jpg"),
  //     image2: fs.createReadStream("1.jpg"),
  //   });
  //   console.log(resp);
};

module.exports = { drawingsSimilarityApiCall };
