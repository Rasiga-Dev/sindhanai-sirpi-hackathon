// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const JullyPDF = require('../models/JullyPDF'); // model explained below

// // Storage setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/jullypdfs/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, 'Jully-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ 
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') cb(null, true);
//     else cb(new Error('Only PDF files are allowed'), false);
//   }
// });

// // POST endpoint for PDF upload
// router.post('/jully-pdf-upload', upload.single('pdf'), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//     const filePath = `/jullypdfs/${req.file.filename}`;

//     // Save in DB (optional)
//     const savedDoc = await JullyPDF.create({
//       filename: req.file.originalname,
//       path: filePath,
//       uploadedAt: new Date()
//     });

//     res.status(200).json({ message: 'PDF uploaded successfully', filePath });
//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ message: 'Error uploading file' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const JullyPDF = require('../models/JullyPDF');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where PDF files will be saved
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== '.pdf') {
      return cb(new Error('Only PDFs are allowed'));
    }
    cb(null, true);
  }
});

// POST route to upload PDF
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const pdfData = new JullyPDF({
      originalName: req.file.originalname,
      filename: req.file.filename,
    });

    await pdfData.save();
    res.status(200).json({ message: 'PDF uploaded successfully', data: pdfData });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});


router.get("/pdf/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);
  res.sendFile(filePath);
});


// Add this to get the latest uploaded PDF
router.get('/latest', async (req, res) => {
  try {
    const latestPDF = await JullyPDF.findOne().sort({ uploadedAt: -1 }); // latest
    if (!latestPDF) return res.status(404).json({ message: 'No PDF found' });

    res.json(latestPDF);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching latest PDF' });
  }
});




module.exports = router;
