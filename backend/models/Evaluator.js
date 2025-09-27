import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const evaluatorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  district: { type: String, required: true },
  expertise: [String],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  evaluator:Number,
   // 🆕 Summary Fields
  summary: {
    total: { type: Number, default: 0 },
    accepted: { type: Number, default: 0 },
    rejected: { type: Number, default: 0 },
    pending: { type: Number, default: 0 },
  },
  level2Summary: {
    total: { type: Number, default: 0 },
  }

}, {
  timestamps: true
});


// Hash password before saving
evaluatorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Evaluator = mongoose.model('Evaluator', evaluatorSchema);
export default Evaluator;