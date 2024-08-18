// routes/uploadRouter.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('../models/fileModel'); // Ensure you create this model
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route for file upload
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });

    await newFile.save();
    res.json({ message: 'File uploaded successfully!', file: newFile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
