const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const methodOverride = require("method-override");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const authRoutes = require("./routes/api/authRoutes");
const iconsRoutes = require("./routes/api/iconsRoutes");
const imagesRoutes = require("./routes/api/imagesRoutes");
const drawingsRoutes = require("./routes/api/drawingsRoutes");
const bufferDrawingsRoutes = require("./routes/api/bufferDrawingsRoutes");
const { addPassportStrategy } = require("./middleware/authMiddleware");

// -------------- INITIALIZE THE APP -----------
const app = express();

// -------------- MIDDLEWARES -----------------

// form data middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// json body middleware
app.use(bodyParser.json());

// cors middleware
app.use(cors());

// passport middleware
app.use(passport.initialize());
// bring in the passport strategy
addPassportStrategy(passport);

// method override middleware
app.use(methodOverride("_method"));

// setting up the static directory static directory
app.use(express.static(path.join(__dirname, "public")));

// ------------- DB -------------------------------------

// bring in the database configs and connect to the db
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.log("Unable to connect to the database!");
  });

// add swagger documentation
const apiDocs = require("./swagger.json");
app.use(
  "/ga/api/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(apiDocs, { explorer: true })
);

// --------------------- ROUTES ----------------------

// add users routes
app.use("/ga/api/users", authRoutes);

// add icons routes
app.use("/ga/api/icons", iconsRoutes);

// add images routes
app.use("/ga/api/images", imagesRoutes);

// add drawings routes
app.use("/ga/api/drawings", drawingsRoutes);

// add buffer drawings routes
app.use("/ga/api/buffer_drawings", bufferDrawingsRoutes);

// -------------- ENV ----------------------

// handle production
if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(__dirname + "/public"));

  // handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const PORT = process.env.PORT || 5001;

// ------------------- LISTEN REQUESTS -----------------

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
