// routes/dpm.js
import express from 'express';
const router = express.Router();
import DPM from '../models/DPM.js';
import Evaluator from '../models/Evaluator.js';
import School from '../models/School.js';

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

// routes/school.js
router.get('/schools/by-district/:district', async (req, res) => {
  try {
    const { district } = req.params;

    const schools = await School.find({
      District: { $regex: new RegExp(`^${district}$`, 'i') }  // Case-insensitive match
    }).select('School_Name submissions');

    const data = schools.map((school) => ({
      name: school.School_Name,
      totalProjects: school.submissions.length
    }));

    console.log('Matched Schools:', data);
    res.json(data);
   
  } catch (error) {
    console.error('Error fetching schools by district:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;