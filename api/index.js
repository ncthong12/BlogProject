const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");

const authRoute = require("./routes/auth");
const authUser = require("./routes/user");
const authPost = require("./routes/posts");
const authCat = require("./routes/categories");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to Mongo"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, callb) => {
    callb(null, "images");
  },
  
  filename: (req, file, callb) => {
    callb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", authUser);
app.use("/api/posts", authPost);
app.use("/api/category", authCat);
app.listen("5000", () => {
  console.log("backend running");
});
