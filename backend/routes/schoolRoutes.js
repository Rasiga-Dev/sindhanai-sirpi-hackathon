import express from 'express';
import School from '../models/School.js';
import bcrypt from 'bcrypt';
import multer from 'multer'; // For handling file uploads
import jwt from 'jsonwebtoken';
import Draft from '../models/Draft.js';
import path from 'path';
import { authenticateToken } from '../middleware/auth.js';

const storage = multer.memoryStorage(); // file data as buffer
const upload = multer({ storage });
const router = express.Router();

// const upload = multer();



// Configure multer for file uploads
// const storage = multer.memoryStorage();


// Get all schools
router.get('/schools', async (req, res) => {
  try {
    const schools = await School.find(); // Fetch all school data
    res.json(schools); // Send the data as JSON response
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch school data' });
  }
});

// Get school by ID
router.get('/schools/:id', async (req, res) => {
  try {
    const school = await School.findById(req.params.id); // Fetch school by ID
    if (!school) {
      return res.status(404).send({ error: 'School not found' });
    }
    res.json(school);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch school data' });
  }
});




// This should be in your routes file (e.g., routes.js or api.js)
router.get('/udise/:code', async (req, res) => {
  try {
    const udiseCode = Number(req.params.code); // Convert to number
    const school = await School.findOne({ UDISE_Code: udiseCode });

    if (!school) {
      return res.status(404).json({ error: 'UDISE Code not found' });
    }

    // Only send the required fields
    res.json({
      School_Name: school.School_Name,
      Email_ID: school.Email_ID,
      District: school.District,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching school by UDISE Code' });
  }
});



router.post('/login', async (req, res) => {
  const { udiseCode, password } = req.body;

  try {
    const school = await School.findOne({ UDISE_Code: parseInt(udiseCode) });

    if (!school) return res.status(404).json({ message: 'No school record found. Kindly verify your UDISE code.' });

    const isMatch = await bcrypt.compare(password, school.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    if (school.status !== 'registered') {
      return res.status(403).json({ message: 'Please complete registration first' });
    }

    // Generate a JWT token after successful login
    const token = jwt.sign(
      { udiseCode: school.UDISE_Code, schoolId: school._id },
      process.env.JWT_SECRET || 'vosa', // Secret for JWT
      { expiresIn: '1h' } // Token expiration time
    );

    // Respond with the token and school data
    res.status(200).json({
      message: 'Login successful',
      token, // Return the token
      school: {
        name: school.School_Name,
        udiseCode: school.UDISE_Code,
        district: school.District,
        email: school.Email_ID,
        Latitute: school.Latitute,     // ✅ Include this
        longitude: school.Longitude,
        address: school.Address,
        hmName: school.hmName,
        hmEmail: school.hmEmail,
        hmMobile: school.hmMobile,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Please complete your registration before logging in' });
  }
});



// router.post('/register', async (req, res) => {
//   try {
//     const { udiseCode, password } = req.body;
//     const school = await School.findOne({ UDISE_Code: parseInt(udiseCode) });

//     if (!school) return res.status(404).json({ message: 'School not found' });

//     if (school.status === 'registered') {
//       return res.status(400).json({ message: 'School already registered.Please login...' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     school.password = hashedPassword;
//     school.status = 'registered';
//     await school.save();

//     res.status(200).json({ message: 'Registered successfully' });
//   } catch (err) {
//     console.error('Error in register route:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.post('/register', async (req, res) => {
  try {
    const { udiseCode, password, hmName, hmEmail, hmMobile } = req.body;

    const school = await School.findOne({ UDISE_Code: parseInt(udiseCode) });

    if (!school) return res.status(404).json({ message: 'School not found' });

    if (school.status === 'registered') {
      return res.status(400).json({ message: 'School already registered. Please login...' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    school.password = hashedPassword;
    school.status = 'registered';
    school.hmName = hmName;
    school.hmEmail = hmEmail;
    school.hmMobile = hmMobile;

    await school.save();

    res.status(200).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Error in register route:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Set up multer storage for uploaded files
// Multer config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/documents/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // path is now defined
//   }
// });



// Middleware to verify auth token (dummy example, replace with your actual auth middleware)
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  // Verify your token here (e.g., JWT)
  // if verified:
  next();
  // else return res.status(403).json({ message: 'Invalid token' });
}

// Save draft endpoint
// Add these routes to your existing schoolRoutes.js

// Save draft
router.post('/drafts', authenticateToken, async (req, res) => {
  try {
    const { udiseCode } = req.body;

    if (!udiseCode) {
      return res.status(400).json({ message: 'UDISE code is required' });
    }

    // Find existing draft or create new one
    let draft = await Draft.findOne({ udiseCode });
    if (!draft) {
      draft = new Draft({ udiseCode });
    }

    // Update fields if they exist in request
    const updateFields = [
      'guideTeacher',
      'projectDetails',
      'studentDetails',
      'bmcDetails',
      'currentStep'
    ];

    updateFields.forEach(field => {
      if (req.body[field] !== undefined) {
        draft[field] = req.body[field];
      }
    });

    draft.lastUpdated = new Date();
    await draft.save();

    res.json({ message: 'Draft saved successfully', draft });
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({ message: 'Error saving draft' });
  }
});

// Get draft
router.get('/drafts/:udiseCode', authenticateToken, async (req, res) => {
  try {
    const { udiseCode } = req.params;
    const draft = await Draft.findOne({ udiseCode });

    if (!draft) {
      return res.status(404).json({ message: 'No draft found' });
    }

    res.json(draft);
  } catch (error) {
    console.error('Error fetching draft:', error);
    res.status(500).json({ message: 'Error fetching draft' });
  }
});

// Delete draft
router.delete('/drafts/:udiseCode', authenticateToken, async (req, res) => {
  try {
    const { udiseCode } = req.params;
    await Draft.deleteOne({ udiseCode });
    res.json({ message: 'Draft deleted successfully' });
  } catch (error) {
    console.error('Error deleting draft:', error);
    res.status(500).json({ message: 'Error deleting draft' });
  }
});



// router.post('/submit-idea', async (req, res) => {


//   try {
//     const { udiseCode, projectDetails, studentDetails, bmcDetails } = req.body;

//     const school = await School.findOne({ UDISE_Code: udiseCode });

//     if (!school) {
//       return res.status(404).json({ message: 'School not found with the provided UDISE code.' });
//     }

//     let parsedProjectDetails = {};
//     let parsedStudentDetails = [];
//     let parsedBmcDetails = {};

//     try {
//       parsedProjectDetails = projectDetails ? JSON.parse(projectDetails) : {};
//       parsedStudentDetails = studentDetails ? JSON.parse(studentDetails) : [];
//       parsedBmcDetails = bmcDetails ? JSON.parse(bmcDetails) : {};
//     } catch (error) {
//       console.error('JSON parsing error:', error);
//       return res.status(400).json({ message: 'Invalid data format' });
//     }

//     // Save file buffer in MongoDB
//     const newSubmission = {
//       projectDetails: {
//         title: parsedProjectDetails.ideaTitle,
//         description: parsedProjectDetails.ideaDescription,
//         teamSize: parsedProjectDetails.teamSize,
//         problemStatement: parsedProjectDetails.problemStatement,
//         solution: parsedProjectDetails.solution,
//       },
//       studentDetails: parsedStudentDetails,
//       bmcDetails: parsedBmcDetails,
//       evaluationStatus: 'pending'
//     };

//     school.submissions.push(newSubmission);

//     await school.save();

//     res.status(200).json({ message: 'Idea submitted successfully!' });
//   } catch (error) {
//     console.error('Error submitting idea:', error);
//     res.status(500).json({ message: 'Failed to submit the idea. Please try again later.' });
//   }
// });
router.post('/submit-idea', upload.none(), async (req, res) => {
  try {
    const { udiseCode, projectDetails, studentDetails, bmcDetails, transactionId } = req.body;

    if (!udiseCode || !transactionId) {
      return res.status(400).json({ message: 'Missing UDISE Code or Transaction ID' });
    }

    // ✅ Step 1: Parse incoming data
    const parsedProjectDetails = JSON.parse(projectDetails);
    const parsedStudentDetails = JSON.parse(studentDetails);
    const parsedBmcDetails = JSON.parse(bmcDetails);

    // ✅ Step 2: Find the school and existing submission with this transactionId
    const school = await School.findOne({ UDISE_Code: udiseCode });
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    const submissionToUpdate = school.submissions.find(
      (sub) => sub.transactionId === transactionId
    );

    if (!submissionToUpdate) {
      return res.status(400).json({ message: 'Invalid Transaction ID - No matching submission found' });
    }

    // ✅ Step 3: Update the existing submission object
    submissionToUpdate.projectDetails = {
      title: parsedProjectDetails.ideaTitle,
      description: parsedProjectDetails.ideaDescription,
      teamSize: parsedProjectDetails.teamSize,
      problemStatement: parsedProjectDetails.problemStatement,
      solution: parsedProjectDetails.solution,
    };

    submissionToUpdate.studentDetails = parsedStudentDetails;
    submissionToUpdate.bmcDetails = parsedBmcDetails;
    submissionToUpdate.transactionStatus = 'verified';
    submissionToUpdate.paymentStatus = 'successful';
    submissionToUpdate.evaluationStatus = 'pending';

    await school.save();

    res.status(200).json({ message: 'Idea submitted successfully!' });
  } catch (err) {
    console.error('Submission error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// POST /api/upload-document/:schoolId/:submissionIndex
// router.post('/upload-document/:projectId', upload.single('document'), async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const file = req.file;

//     // Find the school with this submission._id
//     const school = await School.findOne({ "submissions._id": projectId });

//     if (!school) return res.status(404).json({ msg: 'Submission not found' });

//     // Get the submission
//     const submission = school.submissions.id(projectId);
//     if (!submission) return res.status(404).json({ msg: 'Submission not found' });

//     // Save the document
//     submission.documentFile = {
//       filename: file.originalname,
//       contentType: file.mimetype,
//       data: file.buffer,
//     };

//     await school.save();

//     res.status(200).json({ msg: 'Document uploaded successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });



router.post('/upload-document/:projectId', upload.single('document'), async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log("Project ID:", projectId);
    const file = req.file;
    console.log("Received file:", file);

    const school = await School.findOne({ "submissions._id": projectId });
    if (!school) {
      console.log("School not found for projectId:", projectId);
      return res.status(404).json({ msg: 'Submission not found' });
    }

    const submission = school.submissions.id(projectId);
    if (!submission) {
      console.log("Submission not found inside school for:", projectId);
      return res.status(404).json({ msg: 'Submission not found' });
    }

    submission.documentFile = {
      filename: file.originalname,
      contentType: file.mimetype,
      data: file.buffer
    };

    await school.save();
    console.log("Document saved to DB");

    res.status(200).json({ msg: 'Document uploaded successfully' });

  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.get('/project/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const school = await School.findOne({ "submissions._id": projectId });
    if (!school) return res.status(404).json({ msg: 'Submission not found' });

    const submission = school.submissions.id(projectId);
    if (!submission) return res.status(404).json({ msg: 'Submission not found' });
    console.log("✅ Submission data:", submission); // 👈 Add this

    res.status(200).json({ submission });
  } catch (err) {
    console.error("Error fetching submission:", err);
    res.status(500).json({ msg: 'Server error' });
  }
});




// router.get('/dashboard', authenticateToken, async (req, res) => {
//   try {
//     const school = await School.findById(req.user.schoolId);
//     if (!school) {
//       return res.status(404).json({ message: 'School not found' });
//     }

//     // Calculate dashboard metrics
//     const totalProjects = school.submissions?.length || 0;
//     const guideTeachers = school.guideTeachers?.length || 0;

//     // Calculate total students from all submissions
//     const studentsCount = school.submissions?.reduce((total, submission) => {
//       return total + (submission.studentDetails?.length || 0);
//     }, 0) || 0;

//     const hasFilteredAverage = school.submissions?.some(sub => sub.averageFilter === 'filtered') || false;


//     // Return dashboard data
//     res.status(200).json({
//       totalProjects,
//       guideTeachers,
//       submittedIdeas: totalProjects, // Same as totalProjects for now
//       studentsCount,
//       hasFilteredAverage
//     });
//   } catch (err) {
//     console.error('Error fetching dashboard data:', err);
//     res.status(500).json({ message: 'Error fetching dashboard data' });
//   }
// });




//get all schools




// get school particular

router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const school = await School.findById(req.user.schoolId);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Calculate dashboard metrics
    const totalProjects = school.submissions?.length || 0;
    const guideTeachers = school.guideTeachers?.length || 0;

    // Calculate total students from all submissions
    const studentsCount = school.submissions?.reduce((total, submission) => {
      return total + (submission.studentDetails?.length || 0);
    }, 0) || 0;

    const hasFilteredAverage = school.submissions?.some(
      (sub) => sub.averageFilter === 'filtered'
    ) || false;

   

    // ✅ Send full submissions array also
    res.status(200).json({
      totalProjects,
      guideTeachers,
      submittedIdeas: totalProjects,
      studentsCount,
      hasFilteredAverage,
      schoolName: school.School_Name,
      // submissions: school.submissions, // ✅ Add this line
      projectId: school.submissions._id, // Include school ID for reference
      submissions: school.submissions.map((sub) => ({
        _id: sub._id,
        projectDetails: sub.projectDetails,
        studentDetails: sub.studentDetails,
        finalStage: sub.finalStage,
        rank: sub.rank,
        averageFilter: sub.averageFilter,
        schoolName: school.School_Name,
      }))
      
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});








router.get('/schoolData', async (req, res) => {
  try {
    // Fetch all school data, including guide teachers and other fields
    const schoolData = await School.find({});
    res.json(schoolData);
  } catch (err) {
    console.error("Error fetching school data: ", err);
    res.status(500).send("Error fetching data");
  }
});

router.put("/updateBank/:submissionId", upload.single("profilePhoto"), async (req, res) => {
  const { submissionId } = req.params;
  const { accountHolderName, accountNo, branch, ifscCode, bankName, panNo, aadharNo } = req.body;

  try {
    const updateData = {
      accountHolderName,
      accountNo,
      branch,
      ifscCode,
      bankName,
      panNo,
      aadharNo,
      status: "bankDetailsUpdated"
    };

    if (req.file) {
      updateData.profilePhoto = {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer,
      };
    }

    const school = await School.findOneAndUpdate(
      { "submissions._id": submissionId },
      { $set: { "submissions.$.bankAccountDetails": updateData } },
      { new: true }
    );

    res.json({ message: "Bank details updated successfully", school });
  } catch (err) {
    res.status(500).json({ message: "Error updating bank details", error: err });
  }
});


// 🔹 GET Bank Account Details by submissionId
router.get("/getBank/:submissionId", async (req, res) => {
  try {
    const { submissionId } = req.params;

    // Submission ku parent school find pannanum
    const school = await School.findOne({ "submissions._id": submissionId });

    if (!school) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Submission ah eduthutu filter pannanum
    const submission = school.submissions.id(submissionId);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    return res.json(submission.bankAccountDetails || {});
  } catch (error) {
    console.error("Error fetching bank details:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// GET winners rank wise
router.get("/winners", async (req, res) => {
  console.log("Fetching winners...");
  try {
    const schools = await School.find(
      { submissions: { $elemMatch: { rank: { $exists: true, $ne: null } } } },
      { School_Name: 1, UDISE_Code: 1,District: 1, submissions: 1 }
    );

    let winners = [];
    schools.forEach(school => {
      school.submissions.forEach(sub => {
        if (sub.rank) {
          winners.push({
            schoolName: school.School_Name,
            District: school.District,
            udise: school.UDISE_Code,
            projectTitle: sub.projectDetails?.title || "N/A",
            projectDescription: sub.projectDetails?.description || "N/A",
            students: sub.studentDetails || [],
            rank: sub.rank
          });
        }
      });
    });

    winners.sort(
      (a, b) => parseInt(a.rank.trim()) - parseInt(b.rank.trim())
    );

    res.json(winners);
    console.log("Winners fetched successfully:", winners);
  } catch (error) {
    console.error("Error fetching winners:", error.message);
    res.status(500).json({ error: error.message });
  }
});




router.get('/:id', async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json(school);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});





export default router;

