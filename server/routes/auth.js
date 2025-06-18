import express from 'express';
import School from '../models/School.js';
import bcrypt from 'bcrypt';

const router = express.Router();


// Fetch school details by UDISE code
router.get('/school-details/:udiseCode', async (req, res) => {
  try {
    const { udiseCode } = req.params;
    
    // First try to find if school is already registered
    const existingSchool = await School.findOne({ udiseCode });
    if (existingSchool) {
      return res.status(400).json({ 
        message: 'School is already registered' 
      });
    }

    // Then check the master schools collection
    const masterSchool = await School.findOne({ 
      UDISE_Code: parseInt(udiseCode, 10) 
    }).select('School_Name Email_ID District');

    if (!masterSchool) {
      return res.status(404).json({ 
        message: 'School not found' 
      });
    }

    res.json({
      schoolName: masterSchool.School_Name,
      email: masterSchool.Email_ID,
      district: masterSchool.District
    });
  } catch (error) {
    console.error('Fetch school details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register new school
router.post('/signup', async (req, res) => {
  try {
    const { schoolName, email, district, udiseCode, password } = req.body;

    // Validate required fields
    if (!schoolName || !email || !district || !udiseCode || !password) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Check if school already exists
    const existingSchool = await School.findOne({
      $or: [
        { email },
        { udiseCode }
      ]
    });

    if (existingSchool) {
      if (existingSchool.email === email) {
        return res.status(400).json({ 
          message: 'Email already registered' 
        });
      }
      if (existingSchool.udiseCode === udiseCode) {
        return res.status(400).json({ 
          message: 'UDISE code already registered' 
        });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new school
    const school = new School({
      schoolName,
      email,
      district,
      udiseCode,
      password: hashedPassword,
      status: 'Registered'
    });

    await school.save();

    res.status(201).json({ 
      message: 'Registration successful' 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: 'Server error' 
    });
  }
});

export default router;