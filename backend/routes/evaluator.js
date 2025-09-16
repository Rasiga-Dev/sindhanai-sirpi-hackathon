import express from 'express';
import Evaluator from '../models/Evaluator.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import { transporter } from '../config/email.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import School from '../models/School.js'
import mongoose from 'mongoose';

const router = express.Router();



// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, phone, expertise } = req.body;
//     console.log('Incoming Body:', req.body);


//     const existingEvaluator = await Evaluator.findOne({
//       $or: [{ email }, { username }]
//     });

//     if (existingEvaluator) {
//       return res.status(400).json({
//         message: 'An account with this email or username already exists'
//       });
//     }



//     const evaluator = new Evaluator({
//       username,
//       email,
//       phone,
//       expertise,
//       evaluator: 1, // Assuming evaluator is a number, set it to 1 for new evaluators
//     });
//     await evaluator.save();

//     // await transporter.sendMail({
//     //   from: process.env.EMAIL_USER,
//     //   to: 'jeromesaleth2000@gmail.com',
//     //   subject: 'New Evaluator Registration',
//     //   html: `
//     //     <h2>New Evaluator Registration</h2>
//     //     <p>Your Username: ${phone}</p>
//     //     <p>Your Password : ${phone}</p>
//     //     <p>Please review this registration in the admin dashboard.</p>
//     //   `
//     // });

//     res.status(201).json({
//       message: 'Registration successful. Please wait for admin approval.'
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



router.post('/register', async (req, res) => {
  try {
    const { username, email, phone,district, expertise } = req.body;


    // Check if username or email already exists
    const existingEvaluator = await Evaluator.findOne({
      $or: [{ email }, { username }]
    });

    if (existingEvaluator) {
      return res.status(400).json({
        message: 'An account with this email or username already exists'
      });
    }

    // Find max evaluator value in DB
    const lastEvaluator = await Evaluator.findOne().sort({ evaluator: -1 }).exec();
    const nextEvaluatorValue = lastEvaluator ? lastEvaluator.evaluator + 1 : 1;

    // Create new evaluator with incremented value
    const evaluator = new Evaluator({
      username,
      email,
      phone,
      district,
      expertise,
      evaluator: nextEvaluatorValue,
    });
    await evaluator.save();

    res.status(201).json({
      message: 'Registration successful. Please wait for admin approval.',
      evaluatorValue: nextEvaluatorValue,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});






// evaluator login route (Node.js + Express)



router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find evaluator by phone
    const evaluator = await Evaluator.findOne({ phone: username });

    if (!evaluator) {
      return res.status(401).json({ message: 'Evaluator not found' });
    }

    // Match password (using phone as password)
    if (password !== evaluator.phone) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Check status
    if (evaluator.status !== 'approved') {
      return res.status(403).json({
        message: 'Admin approval pending. Please wait until your status is accepted.',
      });
    }

    // ✅ CREATE TOKEN HERE
    const token = jwt.sign(
      { id: evaluator._id, role: 'evaluator' },
      process.env.JWT_SECRET || 'vosa',
      { expiresIn: '1d' }
    );


    res.status(200).json({
      message: 'Login successful',
      token,
      evaluator,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});





// Admin routes for managing evaluators
router.get('/pending', authenticateToken, isAdmin, async (req, res) => {
  try {
    const pendingEvaluators = await Evaluator.find({ status: 'pending' });
    res.json(pendingEvaluators);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/approved/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const evaluator = await Evaluator.findById(req.params.id);
    if (!evaluator) {
      return res.status(404).json({ message: 'Evaluator not found' });
    }

    evaluator.status = 'approved';
    await evaluator.save();

    // // Send approval email
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: evaluator.email,
    //   subject: 'Evaluator Registration Approved',
    //   html: `
    //     <h2>Registration Approved</h2>
    //     <p>Dear ${evaluator.name},</p>
    //     <p>Your registration as an evaluator has been approved. You can now log in to your account.</p>
    //   `
    // });

    res.json({ message: 'Evaluator approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/rejected/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const evaluator = await Evaluator.findById(req.params.id);
    if (!evaluator) {
      return res.status(404).json({ message: 'Evaluator not found' });
    }

    evaluator.status = 'rejected';
    await evaluator.save();

    // Send rejection email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: evaluator.email,
      subject: 'Evaluator Registration Status',
      html: `
        <h2>Registration Update</h2>
        <p>Dear ${evaluator.name},</p>
        <p>We regret to inform you that your registration as an evaluator has not been approved at this time.</p>
      `
    });

    res.json({ message: 'Evaluator rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Middleware to verify evaluator

export const verifyEvaluator = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Extract token from 'Bearer <token>'
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token with your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded should have the evaluator's id or similar identifier
    const evaluatorId = decoded.id;  // or decoded.userId, adjust to your token payload



    const evaluator = await Evaluator.findById(evaluatorId);
    if (!evaluator || evaluator.status !== 'approved') {
      return res.status(403).json({ message: 'Access denied.' });
    }

    req.evaluator = evaluator;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};


// project assign for level 1 evaluators
router.get('/assigned-projects', verifyEvaluator, async (req, res) => {
  try {
    // 1. Get logged evaluator number
    const loggedEvaluatorNumber = req.evaluator.evaluator; // assuming req.evaluator set by verifyEvaluator middleware

    // 2. Get total evaluators count
    const totalEvaluators = await Evaluator.countDocuments({ status: 'approved' }); // only approved evaluators?

    // 3. Fetch all pending projects from schools submissions
    const allProjects = await School.aggregate([
      { $unwind: "$submissions" },
      // { $match: { "submissions.evaluationStatus": "pending" } },
      {
        $match: {
          "submissions.evaluationStatus": "pending",
          "submissions.paymentStatus": "successful",
          "submissions.transactionStatus": "verified"
        }
      },
      {
        $project: {
          schoolId: "$_id",
          schoolName: "$School_Name",
          udiseCode: "$UDISE_Code",
          projectId: "$submissions._id",
          projectTitle: "$submissions.projectDetails.title",
          projectDescription: "$submissions.projectDetails.description",
          problemStatement: "$submissions.projectDetails.problemStatement",
          solution: "$submissions.projectDetails.solution",
          bmcDetails: "$submissions.bmcDetails",
          evaluationStatus: "$submissions.evaluationStatus"
        }
      }
    ]);

    // 4. Filter projects assigned to this evaluator by round-robin logic
    const assignedProjects = allProjects.filter((project, index) => {
      return ((index % totalEvaluators) + 1) === loggedEvaluatorNumber;
    });

    res.status(200).json(assignedProjects);

  } catch (err) {
    console.error("Error fetching assigned projects:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Evaluate project level 1 route for evaluators
router.post('/evaluate-project', async (req, res) => {
  const { schoolId, projectId, status, reason, evaluatedBy } = req.body;


  try {
    const school = await School.findOne({ _id: schoolId });
    if (!school) return res.status(404).json({ message: 'School not found' });

    const submission = school.submissions.find(
      (s) => s._id.toString() === projectId
    );


    if (!submission) return res.status(404).json({ message: 'Project not found' });

    submission.evaluationStatus = status;
    submission.statusReason = reason;
    submission.evaluatedBy = evaluatedBy;
    submission.assignedEvaluator = evaluatedBy;
    submission.evaluatedAt = new Date();

    await school.save();

    res.status(200).json({ message: 'Evaluation saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Auth middleware



// Skip Project API (logic inside route itself)
router.post('/skip-project', verifyEvaluator, async (req, res) => {
  const { projectId } = req.body;
  const evaluatorId = req.user.id; // from auth middleware

  try {
    const school = await School.findOne({ "submissions._id": projectId });
    if (!school) return res.status(404).json({ message: "Project not found" });

    const submission = school.submissions.id(projectId);
    if (!submission) return res.status(404).json({ message: "Submission not found" });

    // Check evaluator authorization
    if (submission.assignedEvaluatorId?.toString() !== evaluatorId.toString()) {
      return res.status(403).json({ message: "Not authorized to skip this project" });
    }

    // Remove current evaluator
    submission.assignedEvaluatorId = null;

    // Find another evaluator
    const otherEvaluators = await Evaluator.find({ _id: { $ne: evaluatorId } });

    for (let evaluator of otherEvaluators) {
      const alreadyAssigned = await School.exists({
        "submissions._id": projectId,
        "submissions.assignedEvaluatorId": evaluator._id
      });

      if (!alreadyAssigned) {
        submission.assignedEvaluatorId = evaluator._id;
        break;
      }
    }

    await school.save();
    res.json({ message: 'Project skipped and reassigned successfully.' });

  } catch (error) {
    console.error('Skip project error:', error);
    res.status(500).json({ message: 'Internal server error while skipping project.' });
  }
});

// evaluator level 1 dashboard summary
// router.get('/level-1-summary', verifyEvaluator, async (req, res) => {
//   const evaluatorUsername = req.evaluator.username;  // use req.evaluator here!


//   try {
//     const schools = await School.find({}, 'submissions'); // only need submissions
//     let accepted = 0, rejected = 0, total = 0;

//     schools.forEach(school => {
//       school.submissions.forEach(sub => {
//         if (sub.evaluatedBy === evaluatorUsername) {
//           total++; // total projects evaluated by this evaluator

//           if (sub.evaluationStatus === 'accept') accepted++;
//           else if (sub.evaluationStatus === 'reject') rejected++;
//         }
//       });
//     });

//     const pending = total - (accepted + rejected);


//     res.json({ total, accepted, rejected, pending });
//   } catch (err) {
//     console.error('Error in dashboard summary:', err);
//     res.status(500).json({ message: 'Error fetching summary' });
//   }
// });
router.get('/level-1-summary', verifyEvaluator, async (req, res) => {
  const evaluatorUsername = req.evaluator.username;

  try {
    const schools = await School.find({}, 'submissions');
    let accepted = 0, rejected = 0, total = 0;

    schools.forEach((school) => {
      school.submissions.forEach((sub) => {
        if (sub.evaluatedBy === evaluatorUsername) {
          total++;
          if (sub.evaluationStatus === 'accept') accepted++;
          else if (sub.evaluationStatus === 'reject') rejected++;
        }
      });
    });

    const pending = total - (accepted + rejected);

    // ✅ Store the calculated summary into Evaluator collection
    await Evaluator.findOneAndUpdate(
      { username: evaluatorUsername },
      {
        $set: {
          'summary.total': total,
          'summary.accepted': accepted,
          'summary.rejected': rejected,
          'summary.pending': pending,
        },
      }
    );

    res.json({ total, accepted, rejected, pending });
  } catch (err) {
    console.error('Error in dashboard summary:', err);
    res.status(500).json({ message: 'Error fetching summary' });
  }
});


// evaluator level 2 dashboard summary
// router.get('/level-2-summary', verifyEvaluator, async (req, res) => {
//   try {
//     const evaluatorUsername = req.evaluator.username.toLowerCase(); // normalize

//     const schools = await School.find();

//     let totalScoredProjects = 0;

//     schools.forEach((school) => {
//       school.submissions?.forEach((submission) => {
//         // Check status first
//         const isEvaluatedStatus =
//           submission.evaluationScoreStatus === 'Evaluated' ||
//           submission.evaluationStatus === 'accept';

//         if (!isEvaluatedStatus) return; // skip if not in correct status

//         // Check if this evaluator gave score
//         const hasScored = submission.evaluationScores?.some(
//           (entry) => entry.evaluatorName?.toLowerCase() === evaluatorUsername
//         );

//         if (hasScored) totalScoredProjects++;
//       });
//     });

//     res.json({ total: totalScoredProjects });
//   } catch (error) {
//     console.error('Summary error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });
router.get('/level-2-summary', verifyEvaluator, async (req, res) => {
  try {
    const evaluatorUsername = req.evaluator.username.toLowerCase(); // normalize

    const schools = await School.find();
    let totalScoredProjects = 0;

    schools.forEach((school) => {
      school.submissions?.forEach((submission) => {
        const isEvaluatedStatus =
          submission.evaluationScoreStatus === 'Evaluated' ||
          submission.evaluationStatus === 'accept';

        if (!isEvaluatedStatus) return;

        const hasScored = submission.evaluationScores?.some(
          (entry) => entry.evaluatorName?.toLowerCase() === evaluatorUsername
        );

        if (hasScored) totalScoredProjects++;
      });
    });

    // ✅ Store in Evaluator collection under level2Summary.total
    await Evaluator.findOneAndUpdate(
      { username: evaluatorUsername },
      {
        $set: {
          'level2Summary.total': totalScoredProjects,
        },
      },
      { new: true }
    );

    res.json({ total: totalScoredProjects });
  } catch (error) {
    console.error('Summary error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




// evalutor Level 1 evaluated project details

router.get('/level-1-list', verifyEvaluator, async (req, res) => {
  const evaluatorUsername = req.evaluator.username;


  try {
    const schools = await School.find({});

    const evaluatedProjects = [];

    schools.forEach((school) => {
      school.submissions.forEach((sub) => {
        if (sub.evaluatedBy === evaluatorUsername) {
          evaluatedProjects.push({
            schoolId: school._id,
            projectId: sub._id,
            projectTitle: sub.projectDetails.title,
            projectDescription: sub.projectDetails.description,
            problemStatement: sub.projectDetails.problemStatement,
            solution: sub.projectDetails.solution,
            bmcDetails: sub.bmcDetails,
            evaluationStatus: sub.evaluationStatus,
            statusReason: sub.statusReason || '',
          });
        }
      });
    });


    res.json(evaluatedProjects);
  } catch (err) {
    console.error('Error in fetching evaluated projects:', err);
    res.status(500).json({ message: 'Error fetching evaluated projects' });
  }
});

// evaluator Level 2 evaluated project details
router.get('/level-2-list', verifyEvaluator, async (req, res) => {
  const evaluatorUsername = req.evaluator.username;


  try {
    const schools = await School.find({});

    const evaluatedProjects = [];

    schools.forEach((school) => {
      school.submissions.forEach((sub) => {
        // Check if evaluationStatus is "Evaluated" or "approved"
        const validStatus =
          sub.evaluationScoreStatus === 'pending' || sub.evaluationStatus === 'accept';

        if (validStatus) {
          // Get this evaluator's score (if any)
          const myScore = sub.evaluationScores.find(
            (score) => score.evaluatorName === evaluatorUsername
          );

          // Only include if this evaluator has scored it
          if (myScore) {
            evaluatedProjects.push({
              schoolId: school._id,
              projectId: sub._id,
              projectTitle: sub.projectDetails.title,
              projectDescription: sub.projectDetails.description,
              problemStatement: sub.projectDetails.problemStatement,
              solution: sub.projectDetails.solution,
              bmcDetails: sub.bmcDetails,
              evaluationStatus: sub.evaluationStatus,
              statusReason: sub.statusReason || '',
              evaluationScore: myScore,
            });
          }
        }
      });
    });


    res.json(evaluatedProjects);
  } catch (err) {
    console.error('Error in fetching evaluated projects:', err);
    res.status(500).json({ message: 'Error fetching evaluated projects' });
  }
});



// accept project show level 2 evaluators
router.get('/accept-projects', async (req, res) => {
  try {
    // Find only schools with at least one submission with evaluationStatus: 'accept'
    const schools = await School.find({
      'submissions.evaluationStatus': 'accept'
    });

    // Extract only the accepted submissions with some flattened structure
    const acceptedProjects = [];

    schools.forEach(school => {
      school.submissions.forEach((submission, index) => {
        if (submission.evaluationStatus === 'accept') {
          acceptedProjects.push({
            schoolId: school._id,
            udiseCode: school.UDISE_Code,
            schoolName: school.School_Name,
            projectId: submission._id,// use index to identify the submission
            ...submission.projectDetails,
            problemStatement: submission.projectDetails.problemStatement,
            solution: submission.projectDetails.solution,
            bmcDetails: submission.bmcDetails,
            evaluationStatus: submission.evaluationStatus
          });
        }
      });
    });

    res.json(acceptedProjects);
  } catch (err) {
    console.error('Error fetching accepted L2 projects:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// router.get('/projects-to-evaluate', verifyEvaluator, async (req, res) => {
//   // Example route
//   const evaluatorName = req.query.evaluatorName; // optional, if needed

//   try {
//     const schools = await School.find();

//     const eligibleProjects = [];

//     schools.forEach((school) => {
//       school.submissions.forEach((submission, index) => {
//         if (
//           submission.evaluationStatus === "accept" &&
//           submission.evaluationScores.length < 3 &&
//           !submission.evaluationScores.some(score => score.evaluatorName === evaluatorName)
//         ) {
//           eligibleProjects.push({
//             _id: school._id,
//             schoolId: school._id,
//             projectId: submission._id,
//             title: submission.projectDetails.title,
//             description: submission.projectDetails.description,
//             problemStatement: submission.projectDetails.problemStatement,
//             solution: submission.projectDetails.solution,
//             bmcDetails: submission.bmcDetails,
//             evaluationStatus: submission.evaluationStatus || "pending",
//             evaluationScores: submission.evaluationScores || [],
//           });
//         }
//       });
//     });

//     res.json(eligibleProjects);
//   } catch (error) {
//     console.error('Error fetching evaluator projects:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// score submit for level 2 evaluators
// router.post('/submit-score', async (req, res) => {
//   const { schoolId, projectId, evaluatorName, score } = req.body;

//   try {
//     const school = await School.findById(schoolId);
//     if (!school) return res.status(404).json({ error: 'School not found' });

//     // const submission = school.submissions.find(sub => sub._id === projectId);
//     // if (!submission) return res.status(404).json({ error: 'Project not found' });

//     school.submissions.forEach(sub => {
//       console.log('submission._id:', sub._id.toString());
//     });

//     const submission = school.submissions.find(sub => sub._id?.toString() === projectId);
//     if (!submission) return res.status(404).json({ error: 'Project not found' });


//     // Check if already fully evaluated
//     if (submission.evaluationScores.length >= 3) {
//       return res.status(400).json({ message: "This project has already been fully evaluated." });
//     }

//     // Check if this evaluator has already submitted
//     const alreadyScored = submission.evaluationScores.some(
//       (entry) => entry.evaluatorName === evaluatorName
//     );
//     if (alreadyScored) {
//       return res.status(400).json({ message: "You have already evaluated this project." });
//     }

    

//     // Add evaluator score
//     submission.evaluationScores.push({
//       evaluatorName,
//       score,
//       status: 'Evaluated',
//       evaluatedAt: new Date()
//     });

//     // If now exactly 3 evaluations, mark as evaluated
//     if (submission.evaluationScores.length === 3) {
//       submission.evaluationScoreStatus = 'Evaluated';
//       submission.evaluatedAt = new Date();
//     }

//     submission.averageFilter = 'pending';
    

//     await school.save();
//     res.json({ message: 'Score submitted successfully' });
//   } catch (error) {
//     console.error('Error submitting score:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


router.get('/projects-to-evaluate', verifyEvaluator, async (req, res) => {
  const evaluatorName = req.query.evaluatorName;

  try {
    const schools = await School.find();

    const eligibleProjects = [];

    schools.forEach((school) => {
      school.submissions.forEach((submission) => {
        // Only allow projects:
        // - status is 'accept'
        // - less than 3 scores
        // - evaluator has NOT evaluated yet
        const hasEvaluated = submission.evaluationScores.some(
          score => score.evaluatorName === evaluatorName
        );

        if (
          submission.evaluationStatus === "accept" &&
          submission.evaluationScores.length < 3 &&
          !hasEvaluated
        ) {
          eligibleProjects.push({
            schoolId: school._id,
            projectId: submission._id,
            title: submission.projectDetails.title,
            description: submission.projectDetails.description,
            problemStatement: submission.projectDetails.problemStatement,
            solution: submission.projectDetails.solution,
            bmcDetails: submission.bmcDetails,
            evaluationStatus: submission.evaluationStatus || "pending",
            evaluationScores: submission.evaluationScores || [],
          });
        }
      });
    });

    res.json(eligibleProjects);
  } catch (error) {
    console.error('Error fetching evaluator projects:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/submit-score', async (req, res) => {
  const { schoolId, projectId, evaluatorName, score } = req.body;

  try {
    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ error: 'School not found' });

    const submission = school.submissions.find(sub => sub._id?.toString() === projectId);
    if (!submission) return res.status(404).json({ error: 'Project not found' });

    if (submission.evaluationScores.length >= 3) {
      return res.status(400).json({ error: "This project has already been fully evaluated." });
    }

    const alreadyScored = submission.evaluationScores.some(
      entry => entry.evaluatorName === evaluatorName
    );
    if (alreadyScored) {
      return res.status(400).json({ error: "You have already evaluated this project." });
    }

    submission.evaluationScores.push({
      evaluatorName,
      score,
      status: 'Evaluated',
      evaluatedAt: new Date()
    });

    if (submission.evaluationScores.length === 3) {
      submission.evaluationScoreStatus = 'Evaluated';
      submission.evaluatedAt = new Date();
    }

    submission.averageFilter = 'pending';

    await school.save();
    return res.status(200).json({ message: 'Score submitted successfully' });

  } catch (error) {
    console.error('Error submitting score:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});



// average score projects list
router.get('/average-projects', async (req, res) => {
  try {
    const schools = await School.find();

    const averageProjects = [];

    schools.forEach((school) => {
      school.submissions.forEach((sub) => {
        if (
          sub.evaluationScoreStatus === 'Evaluated' && sub.averageFilter === 'pending' &&
          Array.isArray(sub.evaluationScores) &&
          sub.evaluationScores.length === 3
        ) {
          const total = sub.evaluationScores.reduce((acc, curr) => acc + (curr.total || 0), 0);
          const average = total / 3;

          averageProjects.push({
            schoolId: school._id,
            projectId: sub._id,
            projectTitle: sub.projectDetails?.title || '',
            projectDescription: sub.projectDetails?.description || '',
            problemStatement: sub.projectDetails?.problemStatement || '',

            solution: sub.projectDetails?.solution || '',
            bmcDetails: sub.bmcDetails,
            evaluationScores: sub.evaluationScores,
            averageScore: average.toFixed(2),
          });
        }
      });
    });

    res.json(averageProjects);
  } catch (err) {
    console.error('Error fetching average projects:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// average score projects list filtered or not
// routes/evaluator.js
router.put('/update-evaluation-status', async (req, res) => {
  const { schoolId, projectId, status, avg } = req.body;

  try {
    const result = await School.updateOne(
      { _id: schoolId, "submissions._id": projectId },
      {
        $set: {
          "submissions.$.averageFilter": status,
          "submissions.$.averageScore": avg,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Evaluation status updated successfully' });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});





router.post('/evaluate/:projectId', authenticateToken, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, reason } = req.body;
    const evaluatorId = req.user.id;

    // Fetch evaluator
    const evaluator = await Evaluator.findById(evaluatorId);
    if (!evaluator || evaluator.status !== 'approved') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Find school and submission
    const school = await School.findOne({ 'submissions._id': projectId });
    if (!school) return res.status(404).json({ message: 'Project not found' });

    const submission = school.submissions.id(projectId);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    // Only initialize evaluator slots if they don't exist
    if (!submission.evaluationScores || submission.evaluationScores.length === 0) {
      for (let i = 1; i <= 3; i++) {
        submission.evaluationScores.push({
          evaluatorNumber: i,
          evaluatorName: '',
          score: 0,
          status: 'Pending',
          evaluatedAt: new Date(),
        });
      }
    }

    // Save evaluation data
    submission.evaluationStatus = status;
    submission.statusReason = reason;
    submission.evaluatedBy = {
      id: evaluator._id,
      name: evaluator.name,
      email: evaluator.email,
      phone: evaluator.phone,
      organization: evaluator.organization,
    };
    submission.evaluatedAt = new Date();

    await school.save();

    res.json({ message: 'Evaluation submitted successfully' });
  } catch (error) {
    console.error('Error submitting evaluation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});






// router.get('/accepted-projects', async (req, res) => {
//   try {
//     const schools = await School.aggregate([
//       { $unwind: "$submissions" },
//       { $match: { "submissions.evaluationStatus": "approved" } },
//       {
//         $project: {
//           schoolId: "$_id",
//           schoolName: "$School_Name",
//           projectId: "$submissions._id",
//           title: "$submissions.projectDetails.title",
//           description: "$submissions.projectDetails.description",
//           problemStatement: "$submissions.projectDetails.problemStatement", 
//           solution: "$submissions.projectDetails.solution",
//           evaluationStatus: "$submissions.evaluationStatus",
//           bmcDetails: "$submissions.bmcDetails",
//           documentFile: "$submissions.documentFile", // ✅ corrected here
//           evaluationScores: "$submissions.evaluationScores", // ✅ Include scores here
//         }
//       },
//     ]);

//     res.json(schools);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch accepted projects' });
//   }
// });


// router.post('/submit-score', authenticateToken, async (req, res) => {
//   const { projectId, evaluatorName, score, status } = req.body;

//   try {
//     const school = await School.findOne({
//       "submissions._id": projectId,
//     });

//     if (!school) {
//       return res.status(404).json({ error: 'Project not found' });
//     }

//     const submission = school.submissions.find(sub => sub._id.toString() === projectId);
//     if (!submission) {
//       return res.status(404).json({ error: 'Submission not found' });
//     }

//     // Find first available evaluator slot
//     const slot = submission.evaluationScores.find(e => !e.evaluatorName || e.status === 'Pending');

//     if (!slot) {
//       return res.status(400).json({ error: 'All evaluator slots are already filled' });
//     }

//     // Update slot
//     slot.evaluatorName = evaluatorName;
//     slot.score = score;
//     slot.status = status;
//     slot.evaluatedAt = new Date();

//     await school.save();

//     res.status(200).json({ message: 'Score submitted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error submitting score' });
//   }
// });




router.get('/evaluated-projects/:schoolId', async (req, res) => {
  const schoolId = req.params.schoolId;

  // Check if the schoolId is valid
  if (!schoolId || !mongoose.Types.ObjectId.isValid(schoolId)) {
    return res.status(400).json({ message: 'Invalid school ID' });
  }

  try {
    // Fetch the school document by ID
    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Loop through all submissions and calculate average score for each
    const submissionsWithAvgScores = school.submissions.map(submission => {
      // Calculate the total score from evaluationScores
      const totalScore = submission.evaluationScores.reduce((sum, evalScore) => sum + evalScore.score, 0);
      const avgScore = submission.evaluationScores.length > 0 ? totalScore / submission.evaluationScores.length : 0; // Avoid division by 0

      return {
        projectDetails: submission.projectDetails,
        evaluationScores: submission.evaluationScores,
        averageScore: avgScore,
        status: submission.evaluationStatus, // "Accepted" or "Rejected"
      };
    });

    // Send the submissions with average scores as a response
    res.json(submissionsWithAvgScores);
  } catch (error) {
    console.error('Error fetching evaluated projects:', error);
    res.status(500).json({ message: 'Failed to fetch evaluated projects' });
  }
});



router.get('/getAcceptedEvaluatedProjects', async (req, res) => {
  try {
    const schools = await School.find();

    const filteredProjects = [];

    for (const school of schools) {
      const schoolId = school._id;

      school.submissions.forEach((submission, index) => {
        const { evaluationStatus, evaluationScores } = submission;

        const allEvaluated =
          evaluationScores.length === 3 &&
          evaluationScores.every(score => score.status === "Evaluated");

        if (evaluationStatus === "accepted" && allEvaluated) {
          // Calculate average score
          const totalScore = evaluationScores.reduce((sum, e) => sum + (e.score || 0), 0);
          const averageScore = (totalScore / evaluationScores.length).toFixed(2);

          filteredProjects.push({
            schoolId,
            projectId: submission._id,
            district: school.District,
            projectTitle: submission.projectDetails.title,
            projectDescription: submission.projectDetails.description,
            projectDocument: submission.documentFile?.filename,
            evaluationStatus: submission.evaluationStatus,
            evaluationReason: submission.statusReason,
            evaluatorScores: submission.evaluationScores,
            averageScore: parseFloat(averageScore)
          });
        }
      });
    }

    return res.json({ data: filteredProjects });
  } catch (error) {
    console.error("Error fetching filtered submissions:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update school evaluation status to 'winner'
router.post('/update-winner', async (req, res) => {
  const { schoolId, projectId, status } = req.body; // include `status` from frontend: 'accept' or 'reject'

  try {
    const school = await School.findOne({ _id: schoolId });

    if (!school) return res.status(404).json({ success: false, message: 'School not found' });

    const submission = school.submissions.id(projectId);

    if (!submission) return res.status(404).json({ success: false, message: 'Project not found' });

    // Update evaluation status based on input
    if (status === 'accept') {
      submission.evaluationStatus = 'winner';
    } else if (status === 'reject') {
      submission.evaluationStatus = 'runner';
    } else {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    await school.save();

    return res.json({ success: true, message: 'Status updated successfully' });
  } catch (err) {
    console.error('Error updating evaluation status:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/get-evaluators', async (req, res) => {
  try {
    const evaluators = await Evaluator.find({}, '-password'); // exclude password
    res.json(evaluators);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch evaluators' });
  }
});
export default router;