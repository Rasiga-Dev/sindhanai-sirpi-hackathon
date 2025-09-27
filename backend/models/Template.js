const mongoose = require('mongoose');

// Define the schema for the template metadata
const templateSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  uploadedAt: { type: Date, default: Date.now },
  isDownloaded: { type: Boolean, default: false },  // Track if the file has been downloaded
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
