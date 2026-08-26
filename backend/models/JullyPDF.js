import mongoose from 'mongoose';

const JullyPDFSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
});


const jury =mongoose.model('JullyPDF', JullyPDFSchema);
export default jury;