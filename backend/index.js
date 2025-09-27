


// server.js or index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import schoolRoutes from './routes/schoolRoutes.js';
import forgotPasswordRoutes from './routes/forgotPassword.js';
import guideTeacherRoutes from './routes/guideTeacherRoutes.js';
import evaluatorRoutes from './routes/evaluator.js';
import adminRoutes from './routes/AdminRoutes.js';
import payment from './routes/payment.js';
import dpm from './routes/dpm.js';
// import jully from './routes/jully.js';
import jullyRoute from './routes/jully.js';


// Required for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from "public" folder
app.use('/public', express.static(path.join(__dirname, '../public')));



// Serve static files (e.g., files in the 'uploads' folder)
app.use('/files', express.static(path.join(__dirname, 'uploads')));

// Route to serve file for download
app.get('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.download(filePath); // This will trigger a download
});


// MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://rrasigaa:kdjOquMpn3AQj2xx@cluster0.mu6pvdv.mongodb.net/Hackathon';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/schools', schoolRoutes);
app.use('/api/auth', forgotPasswordRoutes);
app.use('/api/school', guideTeacherRoutes);
app.use('/api/evaluator', evaluatorRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/payment", payment);
app.use("/api/dpm", dpm);
// app.use('/jullypdfs', express.static('public/jullypdfs'));
// app.use("/api/jully", jully);
app.use('/api/jully', jullyRoute);






// Download Template Route
app.get('/api/download/template', (req, res) => {
  const filePath = path.join(__dirname, '../public/hackathon_template.pptx');
  res.download(filePath, 'hackathon_template.pptx', (err) => {
    if (err) {
      console.error('❌ Download error:', err);
      res.status(500).json({ message: 'Failed to download template' });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 11129;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
