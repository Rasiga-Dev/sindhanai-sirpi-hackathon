import express from 'express';
const router = express.Router();
import multer from 'multer';
import path from 'path';
import JullyPDF from '../models/JullyPDF.js';

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




export default router;
