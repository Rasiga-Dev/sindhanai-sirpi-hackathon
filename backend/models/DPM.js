// models/DPM.js
const mongoose = require('mongoose');
const DPM = new mongoose.Schema({
  username: String,
  password: String, // hashed preferred
  district: String, // Tenkasi, Tirunelveli, etc.
});

const dpm =mongoose.model('dpm', DPM);
export default dpm;