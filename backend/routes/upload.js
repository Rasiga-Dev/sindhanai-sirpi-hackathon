// backend/upload.js
const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/jullypdfs"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route to handle file upload
router.post("/upload-pdf", upload.single("pdf"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Optionally: save file path or metadata to DB here

  res.status(200).json({
    message: "File uploaded",
    filename: req.file.filename,
    path: req.file.path,
  });
});

module.exports = router;
