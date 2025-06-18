// routes/dpm.js
import express from 'express';
const router = express.Router();
import DPM from '../models/DPM.js';
import Evaluator from '../models/Evaluator.js';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const dpm = await DPM.findOne({ username, password }); // plain text check
  if (!dpm) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({
    message: 'Login successful',
    district: dpm.district,
    username: dpm.username,
  });
});


// routes/evaluator.js
router.get('/by-district/:district', async (req, res) => {
  const { district } = req.params;
  const evaluators = await Evaluator.find({ district });
  res.json(evaluators);
});

export default router;