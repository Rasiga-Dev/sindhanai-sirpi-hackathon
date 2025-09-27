import express from 'express';
import School from '../models/School.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();



router.post('/register-guide-teacher', async (req, res) => {
    const { teacherName, phoneNumber, email, UDISE_Code } = req.body;

    // Validate input
    if (!teacherName || !phoneNumber || !email || !UDISE_Code) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the teacher already exists in guideTeachers by email
        const existingTeacher = await School.findOne({ 'guideTeachers.email': email });

        if (existingTeacher) {
            return res.status(400).json({ message: 'Guide teacher with this email already exists.' });
        }

        // Find the school by UDISE_Code and add the guide teacher with status 'registered'
        const updatedSchool = await School.findOneAndUpdate(
            { UDISE_Code },  // Find the school by UDISE_Code
            {
                $push: {
                    guideTeachers: {
                        name: teacherName,
                        phone: phoneNumber,
                        email: email,
                        status: 'registered',  // Set status to 'registered' directly upon registration
                    }
                }
            },
            { new: true }  // Return the updated document
        );

        if (updatedSchool) {
            return res.status(200).json({ message: 'Guide teacher registered successfully. Status is now registered.' });
        } else {
            return res.status(404).json({ message: 'School not found' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error registering guide teacher' });
    }
});





// In server/routes/guideTeacherRoutes.js
router.get('/get-registered-guide-teachers', authenticateToken, async (req, res) => {
    try {
      // Get the school ID from the authenticated token
      const schoolId = req.user.schoolId;
      
      const school = await School.findById(schoolId);
      if (!school) {
        return res.status(404).json({ message: 'School not found' });
      }
  
      // Filter guide teachers with 'registered' status
      const guideTeachers = school.guideTeachers.filter(teacher => 
        teacher.status === 'registered'
      );
  
      res.status(200).json(guideTeachers);
    } catch (error) {
      console.error('Error fetching guide teachers:', error);
      res.status(500).json({ message: 'Error fetching guide teachers' });
    }
  });
  


export default router;
