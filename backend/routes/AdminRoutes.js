// // Admin login route (Node.js backend)
// import jwt from 'jsonwebtoken';
// import express from 'express';
// import School from '../models/School.js'
// import Evaluator from '../models/Evaluator.js';

// const router = express.Router();

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Simple check (replace with DB check in real apps)
//   if (username === 'admin' && password === 'admin123') {
//     const token = jwt.sign(
//       { username, role: 'admin' },
//       process.env.JWT_SECRET || 'vosa',
//       { expiresIn: '1h' }
//     );

//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });



// router.get('/summary/:schoolId', async (req, res) => {
//   try {
//     const school = await School.findById(req.params.schoolId);
//     if (!school) return res.status(404).json({ message: 'School not found' });

//     const submissions = school.submissions || [];

//     const totalProjects = submissions.length;
//     const guideTeachers = school.guideTeachers.length;
//     const teamsCount = totalProjects;

//     const studentsList = submissions.flatMap(sub => sub.studentDetails || []);
//     const studentsCount = studentsList.length;

//     const guideTeachersList = school.guideTeachers;

//     const pendingProjects = submissions.filter(sub =>
//       !['Accepted', 'Rejected'].includes(sub.evaluationStatus)
//     );

//     const completedProjects = submissions
//       .filter(sub =>
//         sub.paymentStatus === 'successful' &&
//         sub.evaluationStatus?.toLowerCase() === 'accepted' || sub.evaluationStatus?.toLowerCase() === 'runner' || sub.evaluationStatus?.toLowerCase() === 'winner'
//       )
//       .map(sub => ({
//         projectDetails: sub.projectDetails,
//         bmcDetails: sub.bmcDetails,
//         paymentStatus: sub.paymentStatus,
//         evaluationScores: sub.evaluationScores,
//         evaluatedBy: sub.evaluatedBy,
//         documentFile: sub.documentFile?.data ? {
//           filename: sub.documentFile.filename,
//           contentType: sub.documentFile.contentType,
//           base64: sub.documentFile.data.toString('base64')
//         } : null,
//         paymentScreenshot: sub.paymentScreenshot?.data ? {
//           filename: sub.paymentScreenshot.filename,
//           contentType: sub.paymentScreenshot.contentType,
//           base64: sub.paymentScreenshot.data.toString('base64')
//         } : null
//       }));


//     res.json({
//       totalProjects,
//       guideTeachers,
//       teamsCount,
//       studentsCount,
//       guideTeachersList,
//       studentDetailsList: studentsList,
//       pendingProjectsList: pendingProjects,
//       completedProjectsList: completedProjects
//     });

//   } catch (err) {
//     console.error("School Summary Error:", err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


// // GET all evaluators
// router.get('/get-evaluators', async (req, res) => {
//   try {
//     const evaluators = await Evaluator.find({}, '-password'); // exclude password
//     res.json(evaluators);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch evaluators' });
//   }
// });

// // Get all registered schools
// router.get('/get-registered-schools', async (req, res) => {
//   try {
//     // Assuming you have a "status" field to check if the school is registered
//     const registeredSchools = await School.find({ status: 'registered' }); // Fetch all schools with 'registered' status
//     res.json(registeredSchools); // Send the registered school data as JSON response
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to fetch registered school data' });
//   }
// });


// router.put('/evaluators/:id', async (req, res) => {
//   try {
//     const updated = await Evaluator.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Update failed' });
//   }
// });

// router.get('/payments/:district', async (req, res) => {
//   const { district } = req.params;

//   try {
//     const schools = await School.find({ District: district });

//     const paymentDetails = [];

//     schools.forEach((school) => {
//       school.submissions.forEach((submission) => {
//         paymentDetails.push({
//           schoolId: school._id,
//           projectId: submission._id,
//           district: school.District,
//           schoolName: school.SchoolName,
//           transactionId: submission.transactionId || 'N/A',
//           paymentAmount: submission.paymentAmount || 0,
//           paymentStatus: submission.paymentStatus || 'pending',
//           paymentScreenshot: submission.paymentScreenshot?.filename || null,
//         });
//       });
//     });

//     res.json(paymentDetails);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch payment details' });
//   }
// });


// export default router;


import express from 'express';
import School from '../models/School.js';
import Evaluator from '../models/Evaluator.js';
import jwt from 'jsonwebtoken';
import ExcelJS from 'exceljs';
import moment from 'moment';


// Assuming you have an email config file';
import mongoose from 'mongoose'; // Ensure mongoose is imported for ObjectId validation
// import nodemailer from 'nodemailer'; // If you need to use nodemailer directly
import { transporter } from '../config/email.js';
const router = express.Router();


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple check (replace with DB check in real apps)
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET || 'vosa',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});



// router.get("/dashboard-stats", async (req, res) => {
//   try {
//     const totalSchools = await School.countDocuments();

//     // Count total guide teachers by summing lengths of guideTeachers arrays
//     const totalGuideTeachersResult = await School.aggregate([
//       { $project: { guideTeacherCount: { $size: { $ifNull: ["$guideTeachers", []] } } } },
//       { $group: { _id: null, total: { $sum: "$guideTeacherCount" } } }
//     ]);
//     const totalGuideTeachers = totalGuideTeachersResult[0]?.total || 0;

//     // Count total projects by summing lengths of submissions arrays
//     const totalProjectsResult = await School.aggregate([
//       { $project: { submissionsCount: { $size: { $ifNull: ["$submissions", []] } } } },
//       { $group: { _id: null, total: { $sum: "$submissionsCount" } } }
//     ]);
//     const totalProjects = totalProjectsResult[0]?.total || 0;

//     // Count total evaluators (assuming Evaluator model exists)
//     const totalEvaluators = await Evaluator.countDocuments();

//     // Count finalist teams (submissions where evaluationStatus is "finalist")
//     const finalistTeamsResult = await School.aggregate([
//       { $unwind: "$submissions" },
//       { $match: { "submissions.evaluationStatus": "Finalist" } },
//       { $count: "count" }
//     ]);
//     const finalistTeams = finalistTeamsResult[0]?.count || 0;

//     // Count total evaluated projects
//     const totalEvaluatedProjectsResult = await School.aggregate([
//       { $unwind: "$submissions" },
//       { $match: { "submissions.evaluationStatus": "evaluated" } },
//       { $count: "count" }
//     ]);
//     const totalEvaluatedProjects = totalEvaluatedProjectsResult[0]?.count || 0;

//     // Submissions count per district
//     const submissionsPerDistrict = await School.aggregate([
//       { $unwind: "$submissions" },
//       {
//         $group: {
//           _id: "$District",
//           submissionsCount: { $sum: 1 }
//         }
//       }
//     ]);

//     // Project status counts - pending, evaluated, rejected in submissions
//     const projectStatusCountsAggregation = await School.aggregate([
//       { $unwind: "$submissions" },
//       {
//         $group: {
//           _id: "$submissions.evaluationStatus",
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     // Convert aggregation array to object with default zeros
//     const projectStatusCounts = {
//       pending: 0,
//       evaluated: 0,
//       rejected: 0,
//     };

//     projectStatusCountsAggregation.forEach((item) => {
//       if (item._id) {
//         projectStatusCounts[item._id] = item.count;
//       }
//     });

//     const submissionsOverTime = await School.aggregate([
//   { $unwind: "$submissions" },
//   {
//     $group: {
//       _id: { $dateToString: { format: "%Y-%m-%d", date: "$submissions.submittedAt" } },
//       count: { $sum: 1 }
//     }
//   },
//   { $sort: { _id: 1 } }
// ]);


//     res.json({
//       totalSchools,
//       totalGuideTeachers,
//       totalProjects,
//       totalEvaluators,
//       totalEvaluatedProjects,
//       finalistTeams,
//       submissionsPerDistrict,
//       projectStatusCounts,
//        submissionsOverTime,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });


// routes/school.js or wherever you handle GET /schools

router.get("/dashboard-stats", async (req, res) => {
  try {
    const totalSchools = await School.countDocuments();

    // Registered schools count
    const registeredSchools = await School.countDocuments({ status: "registered" });

    // Total guide teachers
    const totalGuideTeachersResult = await School.aggregate([
      { $project: { guideTeacherCount: { $size: { $ifNull: ["$guideTeachers", []] } } } },
      { $group: { _id: null, total: { $sum: "$guideTeacherCount" } } }
    ]);
    const totalGuideTeachers = totalGuideTeachersResult[0]?.total || 0;

    // Total projects
    const totalProjectsResult = await School.aggregate([
      { $project: { submissionsCount: { $size: { $ifNull: ["$submissions", []] } } } },
      { $group: { _id: null, total: { $sum: "$submissionsCount" } } }
    ]);
    const totalProjects = totalProjectsResult[0]?.total || 0;

    // Total evaluators
    const totalEvaluators = await Evaluator.countDocuments();

    // Finalist teams overall count
    const finalistTeamsResult = await School.aggregate([
      { $unwind: "$submissions" },
      {
        $match: {
          "submissions.finalStatus": "Finalist",
          "submissions.finalStage": "Completed",
          "submissions.rank": { $ne: null, $ne: "" }
        }
      },
      { $count: "count" }
    ]);
    const finalistTeams = finalistTeamsResult[0]?.count || 0;
    // Total evaluated projects
    const totalEvaluatedProjectsResult = await School.aggregate([
      { $unwind: "$submissions" },
      { $match: { "submissions.evaluationStatus": "evaluated" } },
      { $count: "count" }
    ]);
    const totalEvaluatedProjects = totalEvaluatedProjectsResult[0]?.count || 0;

    // Submissions per district
    const submissionsPerDistrict = await School.aggregate([
      { $unwind: "$submissions" },
      {
        $group: {
          _id: "$District",
          submissionsCount: { $sum: 1 }
        }
      }
    ]);

    // Project status counts
    const projectStatusCountsAggregation = await School.aggregate([
      { $unwind: "$submissions" },
      {
        $group: {
          _id: "$submissions.evaluationStatus",
          count: { $sum: 1 }
        }
      }
    ]);
    const projectStatusCounts = { pending: 0, evaluated: 0, rejected: 0 };
    projectStatusCountsAggregation.forEach((item) => {
      if (item._id) projectStatusCounts[item._id] = item.count;
    });

    // Submissions over time
    const submissionsOverTime = await School.aggregate([
      { $unwind: "$submissions" },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$submissions.submittedAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Evaluator-wise project counts
    const evaluatorCounts = await School.aggregate([
      { $unwind: "$submissions" },
      { $match: { "submissions.evaluatedBy": { $ne: null } } },
      {
        $group: {
          _id: "$submissions.evaluatedBy",
          count: { $sum: 1 }
        }
      }
    ]);

    // Final stage counts
    const finalStageCounts = await School.aggregate([
      { $unwind: "$submissions" },
      {
        $group: {
          _id: "$submissions.finalStage",
          count: { $sum: 1 }
        }
      }
    ]);


    // Payments per district
    const paymentsPerDistrict = await School.aggregate([
      { $unwind: "$submissions" },
      {
        $group: {
          _id: "$District",
          totalPayments: { $sum: { $ifNull: ["$submissions.paymentAmount", 0] } },
          submissionsCount: { $sum: 1 }
        }
      }
    ]);


    res.json({
      totalSchools,
      registeredSchools,
      totalGuideTeachers,
      totalProjects,
      totalEvaluators,
      totalEvaluatedProjects,
      finalistTeams,
      submissionsPerDistrict,
      projectStatusCounts,
      submissionsOverTime,
      evaluatorCounts,
      finalStageCounts,
      paymentsPerDistrict
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.get("/schools", async (req, res) => {
  try {
    const { district, status, search } = req.query;
    const query = {};

    // District filter
    if (district) {
      query.District = district;
    }

    // Status filter
    if (status === "registered") {
      query.status = true;
    } else if (status === "not-registered") {
      query.status = false;
    } else if (status === "rejected") {
      query.status = "rejected"; // if you use string for rejected
    }

    // Search filter (case-insensitive)
    if (search) {
      query.School_Name = { $regex: search, $options: "i" };
    }

    const schools = await School.find(query);
    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get('/summary/:schoolId', async (req, res) => {
  try {
    const school = await School.findById(req.params.schoolId);
    if (!school) return res.status(404).json({ message: 'School not found' });

    const submissions = school.submissions || [];

    const totalProjects = submissions.length;
    const guideTeachers = school.guideTeachers.length;
    const teamsCount = totalProjects;

    const studentsList = submissions.flatMap(sub => sub.studentDetails || []);
    const studentsCount = studentsList.length;

    const guideTeachersList = school.guideTeachers;



    // ✅ Completed projects list (only projectDetails, bmcDetails, documentFile)
    const completedProjects = submissions
      .filter(sub =>
        sub.paymentStatus === 'successful' &&
        (
          sub.evaluationStatus?.toLowerCase() === 'accept' ||
          sub.evaluationStatus?.toLowerCase() === 'runner' ||
          sub.evaluationStatus?.toLowerCase() === 'winner'
        )
      )
      .map(sub => ({
        projectDetails: sub.projectDetails,
        bmcDetails: sub.bmcDetails,
        documentFile: sub.documentFile?.data ? {
          filename: sub.documentFile.filename,
          contentType: sub.documentFile.contentType,
          base64: sub.documentFile.data.toString('base64')
        } : null
      }));


    res.json({
      totalProjects,
      guideTeachers,
      teamsCount,
      studentsCount,
      guideTeachersList,
      studentDetailsList: studentsList,
      completedProjectsList: completedProjects
    });

  } catch (err) {
    console.error("School Summary Error:", err);
    res.status(500).json({ message: 'Server Error' });
  }
});


// GET all guide teachers with school name
router.get('/guide-teachers', async (req, res) => {
  try {
    // School_Name, District, guideTeachers, submissions மட்டும் fetch பண்ணுறோம்
    const schools = await School.find({}, 'School_Name District guideTeachers submissions');

    const guideTeachersList = [];

    schools.forEach(school => {
      const projectCount = school.submissions.length;

      school.guideTeachers.forEach(teacher => {
        guideTeachersList.push({
          name: teacher.name,
          email: teacher.email,
          phone: teacher.phone,
          school: school.School_Name,
          district: school.District?.trim().toLowerCase(), // 🔥 uniform format
          projectCount
        });

      });
    });

    res.json(guideTeachersList);
  } catch (err) {
    console.error("Error fetching guide teachers", err);
    res.status(500).json({ message: "Server error" });
  }
});



// 📄 GET: All submitted projects with document
router.get('/project-list', async (req, res) => {
  try {
    const schools = await School.find({ "submissions.0": { $exists: true } });

    const projectList = [];

    schools.forEach(school => {
      const guideTeacher = school.guideTeachers?.[0]?.name || 'N/A';

      school.submissions.forEach(submission => {
        const document = submission.documentFile;

        projectList.push({
          schoolName: school.School_Name,
          guideTeacherName: guideTeacher,
          projectDetails: {
            title: submission.projectDetails?.title || 'Untitled',
            teamSize: submission.projectDetails?.teamSize || 0
          },
          submittedAt: submission.submittedAt || null,
          paymentStatus: submission.paymentStatus || 'pending',
          evaluationStatus: submission.evaluationStatus || 'Not Evaluated',
          projectDocument: document?.data
            ? {
              filename: document.filename,
              contentType: document.contentType,
              base64: `data:${document.contentType};base64,${document.data.toString('base64')}`
            }
            : null
        });
      });
    });

    res.json(projectList);
  } catch (error) {
    console.error('Error fetching project list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get all schools

router.get('/getAllSchools', async (req, res) => {
  try {
    const schools = await School.find({});
    res.status(200).json(schools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ message: 'Server error while fetching schools' });
  }
});
// Get all submitted projects
router.get('/all-projects', async (req, res) => {
  try {
    const schools = await School.find(
      { "submissions.0": { $exists: true } }, // only schools with at least one submission
      {
        School_Name: 1,
        District: 1,
        submissions: 1
      }
    );

    // Flatten projects with school info
    const projects = [];
    schools.forEach(school => {
      school.submissions.forEach((submission, index) => {
        projects.push({
          projectId: `${school._id}-${index}`,
          schoolName: school.School_Name,
          district: school.District,
          title: submission.projectDetails.title,
          status: submission.evaluationStatus,
          stage: getStage(submission),
          submittedAt: submission.submittedAt
        });
      });
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Utility to determine stage
function getStage(sub) {
  if (sub.evaluationScores?.length >= 3) return 'Stage 3';
  if (sub.evaluationScores?.length > 0) return 'Stage 2';
  return 'Stage 1';
}


// Get full project detail by schoolId and index
router.get('/project/:schoolId/:index', async (req, res) => {
  const { schoolId, index } = req.params;

  try {
    const school = await School.findById(schoolId);
    if (!school || !school.submissions[index]) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = school.submissions[index];

    res.json({
      schoolName: school.School_Name,
      district: school.District,
      guideTeachers: school.guideTeachers,
      projectDetails: project.projectDetails,
      studentDetails: project.studentDetails,
      bmcDetails: project.bmcDetails,
      documents: {
        filename: project.documentFile?.filename,
        contentType: project.documentFile?.contentType,
        base64: project.documentFile?.data ? `data:${project.documentFile.contentType};base64,${project.documentFile.data.toString('base64')}` : null
      },
      evaluationStatus: project.evaluationStatus,
      evaluationScores: project.evaluationScores,
      evaluatedBy: project.evaluatedBy,
      evaluatedAt: project.evaluatedAt,
      statusReason: project.statusReason,
      submittedAt: project.submittedAt
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch project details' });
  }
});



// Utility to calculate average
const calculateAverage = (scores) => {
  if (!scores || scores.length === 0) return 0;
  const total = scores.reduce((acc, curr) => acc + curr.score, 0);
  return (total / scores.length).toFixed(2);
};

// router.get("/top-finalists", async (req, res) => {
//   try {
//     const schools = await School.find({ "submissions.evaluationScores": { $exists: true, $ne: [] } });

//     let allProjects = [];

//     schools.forEach((school) => {
//       school.submissions.forEach((sub) => {
//         const avgScore = calculateAverage(sub.evaluationScores);
//         allProjects.push({
//           projectId: sub._id,
//           title: sub.projectDetails?.title || "Untitled",
//           schoolName: school.School_Name,
//           district: school.District,
//           averageScore: avgScore,
//           evaluationStatus: sub.evaluationStatus,
//         });
//       });
//     });

//     // Sort and pick top 10
//     const top10 = allProjects.sort((a, b) => b.averageScore - a.averageScore).slice(0, 10);

//     res.status(200).json(top10);
//   } catch (err) {
//     console.error("Error fetching top finalists:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });


// Accept a project as finalist

router.get("/top-finalists", async (req, res) => {
  try {
    const schools = await School.find({ "submissions.jullyMarks.average": { $exists: true, $ne: null } });

    const allJullyProjects = [];

    schools.forEach((school) => {
      school.submissions.forEach((submission) => {
        if (submission.jullyMarks && typeof submission.jullyMarks.average === "number") {
          allJullyProjects.push({
            projectId: submission._id,
            schoolName: school.School_Name,
            district: school.District,
            projectTitle: submission.projectDetails?.title || "Untitled",
            jully1: submission.jullyMarks.jully1 || 0,
            jully2: submission.jullyMarks.jully2 || 0,
            jully3: submission.jullyMarks.jully3 || 0,
            bannel: submission.jullyMarks.bannel || 0,
            average: submission.jullyMarks.average,
            locked: submission.jullyMarks.locked || false,
            finalStatus: submission.finalStatus || "pending",
            finalStage: submission.finalStage || "pending",
            rank: submission.rank || "Not Ranked",
          });
        }
      });
    });

    res.status(200).json(allJullyProjects);
    console.log("Jully mark projects fetched:", allJullyProjects);
  } catch (error) {
    console.error("Error fetching jully mark projects:", error);
    res.status(500).json({ message: "Server Error" });
  }
});



// router.post("/accept-finalist/:projectId", async (req, res) => {
//   const { projectId } = req.params;

//   try {
//     const school = await School.findOne({ "submissions._id": projectId });

//     if (!school) return res.status(404).json({ message: "Project not found" });

//     const submission = school.submissions.id(projectId);
//     submission.finalStatus = "Finalist";

//     await school.save();

//     res.status(200).json({ message: "Marked as finalist successfully" });
//   } catch (err) {
//     console.error("Error updating finalist status:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// routes/finalStatus.js or wherever you're handling routes
router.post("/accept-finalist/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const { rank, finalStatus } = req.body;

  try {
    const school = await School.findOne({ "submissions._id": projectId });

    if (!school) return res.status(404).json({ message: "Project not found" });

    const submission = school.submissions.id(projectId);
    submission.finalStatus = finalStatus || "Finalist";
    submission.rank = rank;
    submission.finalStage = "Completed"; // mark final stage as done

    await school.save();

    res.status(200).json({ message: "Marked as finalist successfully" });
  } catch (err) {
    console.error("Error updating finalist status:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// router.post("/notify-finalist/:projectId", async (req, res) => {
//   const { projectId } = req.params;

//   // Validate projectId as ObjectId
//   if (!mongoose.Types.ObjectId.isValid(projectId)) {
//     return res.status(400).json({ message: "Invalid project ID" });
//   }

//   try {
//     // Find the school document that has the submission
//     const school = await School.findOne({ "submissions._id": projectId });

//     if (!school) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     // Find the submission inside the school.submissions array
//     const submission = school.submissions.find(
//       (s) => s._id.toString() === projectId
//     );

//     if (!submission) {
//       return res.status(404).json({ message: "Submission not found" });
//     }

//     // Get details
//     const { title } = submission.projectDetails;
//     const { finalStatus,rank } = submission;


//     // Only send if evaluationStatus is Finalist (optional, your choice)
//     if (finalStatus !== "Finalist") {
//       return res.status(400).json({ message: "Project is not a finalist" });
//     }

//     const students = submission.studentDetails;

//     if (!students || students.length === 0) {
//       return res.status(400).json({ message: "No students found in this project" });
//     }


//     const studentNames = students.map(s => s.name);
//     if (!school.Email_ID) {
//       return res.status(400).json({ message: "School email ID not found." });
//     }

//     // Compose email to school email only
//     const mailOptions = {
//       from: process.env.EMAIL_USER || "karthikraj825@gmail.com",
//       to: school.Email_ID,
//       subject: `🎉 Congratulations from Sindhanai Sirpi Hackathon!`,
//       html: `
//     <h2>Dear ${school.School_Name} Team,</h2>
//     <p>🎉 <strong>Congratulations!</strong> 🎉</p>
//     <p>Your project <strong>"${title}"</strong> from <strong>${school.District}</strong> has been selected as a <strong>Top 10 Finalist / <strong>${rank}</strong></strong>.</p>
//     <p><strong>Team Members:</strong> ${studentNames.join(", ")}</p>
//     <p>We look forward to seeing you in the next round. Stay tuned for further updates!</p>
//     <br/>
//     <p>Warm regards,<br/>Sindhanai Sirpi Hackathon Committee</p>
//   `,
//     };

//     await transporter.sendMail(mailOptions);

//     return res.status(200).json({ message: `Notification email sent to school: ${school.Email_ID}` });


//   } catch (err) {
//     console.error("Email Send Error:", err);
//     return res.status(500).json({ message: "Failed to send email" });
//   }
// });

// POST /notify-finalist/:projectId
router.post("/notify-finalist/:projectId", async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    const school = await School.findOne({ "submissions._id": projectId });

    if (!school) {
      return res.status(404).json({ message: "Project not found" });
    }

    const submission = school.submissions.id(projectId);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    const { title } = submission.projectDetails;
    const { finalStatus, rank } = submission;

    if (finalStatus !== "Finalist") {
      return res.status(400).json({ message: "Project is not marked as a Finalist" });
    }

    const students = submission.studentDetails;
    const studentNames = students.map(s => s.name).join(", ");

    if (!school.Email_ID) {
      return res.status(400).json({ message: "School email ID not found" });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || "karthikraj825@gmail.com",
      to: school.Email_ID,
      subject: `🎉 Congratulations from Sindhanai Sirpi Hackathon!`,
      html: `
        <h2>Dear ${school.School_Name} Team,</h2>
        <p>🎉 <strong>Congratulations!</strong> 🎉</p>
        <p>Your project <strong>"${title}"</strong> from <strong>${school.District}</strong> has been selected as a <strong>Top 10 Finalist (Rank: ${rank})</strong>.</p>
        <p><strong>Team Members:</strong> ${studentNames}</p>
        <p>We look forward to seeing you in the next round. Stay tuned for further updates!</p>
        <br/>
        <p>Warm regards,<br/>Sindhanai Sirpi Hackathon Committee</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: `Notification email sent to ${school.Email_ID}` });

  } catch (err) {
    console.error("Email Send Error:", err);
    return res.status(500).json({ message: "Failed to send email" });
  }
});





// Helper: Send Excel file response






const sendWorkbook = async (res, workbook, filename) => {
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', `attachment; filename=${filename}.xlsx`);
  await workbook.xlsx.write(res);
  res.end();
};

// 1. Schools List
// 6. All School Details
router.get('/school-list', async (req, res) => {
  try {
    const schools = await School.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('All School Details');

    worksheet.columns = [
      { header: 'School Name', key: 'schoolName', width: 30 },
      { header: 'UDISE Code', key: 'udiseCode', width: 15 },
      { header: 'District', key: 'district', width: 20 },
      { header: 'Block', key: 'block', width: 20 },
      { header: 'Education District', key: 'educationDistrict', width: 20 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Category Group', key: 'categoryGroup', width: 20 },
      { header: 'Management', key: 'management', width: 20 },
      { header: 'Management Type', key: 'managementType', width: 20 },
      { header: 'Directorate', key: 'directorate', width: 20 },
      { header: 'Cluster', key: 'cluster', width: 20 },
      { header: 'Local Body', key: 'localBody', width: 20 },
      { header: 'Town/Village', key: 'townVillage', width: 20 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'HM Name', key: 'hmName', width: 20 },
      { header: 'HM Email', key: 'hmEmail', width: 25 },
      { header: 'HM Mobile', key: 'hmMobile', width: 15 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Office Mobile', key: 'officeMobile', width: 15 },
      { header: 'Office Landline', key: 'officeLandline', width: 15 },
      { header: 'Correspondent Mobile', key: 'correspondMobile', width: 15 },
      { header: 'Correspondent Landline', key: 'correspondLandline', width: 15 },

      // Guide Teachers
      { header: 'Guide Teacher Name', key: 'teacherName', width: 25 },
      { header: 'Guide Teacher Phone', key: 'teacherPhone', width: 20 },
      { header: 'Guide Teacher Email', key: 'teacherEmail', width: 25 },

      // Project Details
      { header: 'Project Title', key: 'projectTitle', width: 30 },
      { header: 'Project Description', key: 'projectDescription', width: 50 },
      { header: 'Problem Statement', key: 'problemStatement', width: 40 },
      { header: 'Solution', key: 'solution', width: 40 },
      { header: 'Team Size', key: 'teamSize', width: 10 },

      // Students
      { header: 'Student Names', key: 'studentNames', width: 40 },
      { header: 'Student Details', key: 'studentDetails', width: 50 },

      // Payment
      { header: 'Payment Status', key: 'paymentStatus', width: 15 },
      { header: 'Payment Amount', key: 'paymentAmount', width: 15 },
      { header: 'Transaction ID', key: 'transactionId', width: 20 },

      // Evaluation
      { header: 'Submitted At', key: 'submittedAt', width: 20 },
      { header: 'Evaluation Status', key: 'evaluationStatus', width: 15 },
      { header: 'Evaluator Name', key: 'evaluatorName', width: 20 },
      { header: 'Evaluation Score Status', key: 'evaluationScoreStatus', width: 20 },
      { header: 'Scores', key: 'scores', width: 30 },
      { header: 'Average Score', key: 'averageScore', width: 15 },
      { header: 'Final Status', key: 'finalStatus', width: 15 },
      { header: 'Rank', key: 'rank', width: 10 },
      { header: 'Final Stage', key: 'finalStage', width: 15 },

      // Bank Details
      { header: 'Account Holder Name', key: 'accountHolderName', width: 25 },
      { header: 'Account No', key: 'accountNo', width: 20 },
      { header: 'Bank Name', key: 'bankName', width: 20 },
      { header: 'Branch', key: 'branch', width: 20 },
      { header: 'IFSC Code', key: 'ifscCode', width: 15 },
      { header: 'PAN No', key: 'panNo', width: 20 },
      { header: 'Aadhar No', key: 'aadharNo', width: 20 },
    ];

    schools.forEach(school => {
      const guideTeachers = school.guideTeachers?.length
        ? school.guideTeachers
        : [{ name: '', phone: '', email: '' }];

      const submissions = school.submissions?.length
        ? school.submissions
        : [{}];

      submissions.forEach(sub => {
        guideTeachers.forEach(teacher => {
          worksheet.addRow({
            schoolName: school.School_Name || "-",
            udiseCode: school.UDISE_Code || "-",
            district: school.District || "-",
            block: school.Block || "-",
            educationDistrict: school.Education_District || "-",
            category: school.Category || "-",
            categoryGroup: school.Category_Group || "-",
            management: school.Management || "-",
            managementType: school.Management_Type || "-",
            directorate: school.Directorate || "-",
            cluster: school.Cluster || "-",
            localBody: school.LocalBody || "-",
            townVillage: school.Town_Munici_Village_Corp || "-",
            address: school.Address || "-",
            hmName: school.hmName || "-",
            hmEmail: school.hmEmail || "-",
            hmMobile: school.hmMobile || "-",
            email: school.Email_ID || "-",
            officeMobile: school.Office_Mobile || "-",
            officeLandline: school.Office_landline || "-",
            correspondMobile: school.Correspond_Mobile || "-",
            correspondLandline: school.Correspond_landline || "-",

            // Guide Teachers
            teacherName: teacher.name || "-",
            teacherPhone: teacher.phone || "-",
            teacherEmail: teacher.email || "-",

            // Project Details
            projectTitle: sub?.projectDetails?.title || "-",
            projectDescription: sub?.projectDetails?.description || "-",
            problemStatement: sub?.projectDetails?.problemStatement || "-",
            solution: sub?.projectDetails?.solution || "-",
            teamSize: sub?.projectDetails?.teamSize || "-",

            // Students
            studentNames: sub?.studentDetails?.length
              ? sub.studentDetails.map(s => s.name || "-").join(', ')
              : "-",
            studentDetails: sub?.studentDetails?.length
              ? sub.studentDetails.map(s => `${s.name || "-"} (${s.standard || "-"}) - ${s.contactNumber || "-"}`).join('; ')
              : "-",

            // Payment
            paymentStatus: sub?.paymentStatus || "-",
            paymentAmount: sub?.paymentAmount || "-",
            transactionId: sub?.transactionId || "-",

            // Evaluation
            submittedAt: sub?.submittedAt
              ? new Date(sub.submittedAt).toLocaleString()
              : "-",
            evaluationStatus: sub?.evaluationStatus || "-",
            evaluatorName: sub?.evaluatedBy || "-",
            evaluationScoreStatus: sub?.evaluationScoreStatus || "-",
            scores: sub?.evaluationScores?.length
              ? sub.evaluationScores.map(e => `${e.evaluatorName || "-"}: ${e.score || "-"}`).join('; ')
              : "-",
            averageScore: sub?.averageScore || "-",
            finalStatus: sub?.finalStatus || "-",
            rank: sub?.rank || "-",
            finalStage: sub?.finalStage || "-",

            // Bank
            accountHolderName: sub?.bankAccountDetails?.accountHolderName || "-",
            accountNo: sub?.bankAccountDetails?.accountNo || "-",
            bankName: sub?.bankAccountDetails?.bankName || "-",
            branch: sub?.bankAccountDetails?.branch || "-",
            ifscCode: sub?.bankAccountDetails?.ifscCode || "-",
            panNo: sub?.bankAccountDetails?.panNo || "-",
            aadharNo: sub?.bankAccountDetails?.aadharNo || "-",
          });

        });
      });
    });

    await sendWorkbook(res, workbook, 'all-school-details');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating full report');
  }
});



// // Route to get submitted projects report
router.get('/submitted-projects', async (req, res) => {
  try {
    // Find schools with at least one submission
    const schools = await School.find({ 'submissions.0': { $exists: true } });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Projects');

    worksheet.columns = [
      // School Info
      { header: 'School Name', key: 'schoolName', width: 30 },
      { header: 'UDISE Code', key: 'udiseCode', width: 15 },
      { header: 'District', key: 'district', width: 20 },
      { header: 'Block', key: 'block', width: 20 },
      { header: 'Education District', key: 'educationDistrict', width: 20 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Category Group', key: 'categoryGroup', width: 20 },
      { header: 'Management', key: 'management', width: 20 },
      { header: 'Management Type', key: 'managementType', width: 20 },
      { header: 'Directorate', key: 'directorate', width: 20 },
      { header: 'Cluster', key: 'cluster', width: 20 },
      { header: 'Local Body', key: 'localBody', width: 20 },
      { header: 'Town/Village', key: 'townVillage', width: 20 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'HM Name', key: 'hmName', width: 20 },
      { header: 'HM Email', key: 'hmEmail', width: 25 },
      { header: 'HM Mobile', key: 'hmMobile', width: 15 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Office Mobile', key: 'officeMobile', width: 15 },
      { header: 'Office Landline', key: 'officeLandline', width: 15 },
      { header: 'Correspondent Mobile', key: 'correspondMobile', width: 15 },
      { header: 'Correspondent Landline', key: 'correspondLandline', width: 15 },

      // Guide Teachers
      { header: 'Guide Teacher Name', key: 'teacherName', width: 25 },
      { header: 'Guide Teacher Phone', key: 'teacherPhone', width: 20 },
      { header: 'Guide Teacher Email', key: 'teacherEmail', width: 25 },

      // Project Details
      { header: 'Project Title', key: 'title', width: 30 },
      { header: 'Project Description', key: 'description', width: 50 },
      { header: 'Problem Statement', key: 'problemStatement', width: 40 },
      { header: 'Solution', key: 'solution', width: 40 },
      { header: 'Team Size', key: 'teamSize', width: 10 },

      // Students
      { header: 'Student Details', key: 'studentDetails', width: 50 },

      // BMC / Business Model Canvas
      { header: 'Customer Segments', key: 'customerSegments', width: 25 },
      { header: 'Value Propositions', key: 'valuePropositions', width: 25 },
      { header: 'Channels', key: 'channels', width: 20 },
      { header: 'Customer Relationships', key: 'customerRelationships', width: 25 },
      { header: 'Revenue Streams', key: 'revenueStreams', width: 20 },
      { header: 'Key Resources', key: 'keyResources', width: 20 },
      { header: 'Key Activities', key: 'keyActivities', width: 20 },
      { header: 'Key Partners', key: 'keyPartners', width: 20 },
      { header: 'Cost Structure', key: 'costStructure', width: 20 },

      // Payment
      { header: 'Transaction ID', key: 'transactionId', width: 20 },
      { header: 'Payment Amount', key: 'paymentAmount', width: 15 },
      { header: 'Payment Status', key: 'paymentStatus', width: 15 },

      // Evaluation
      { header: 'Evaluated By', key: 'evaluatedBy', width: 25 },
      { header: 'Evaluation Status', key: 'evaluationStatus', width: 20 },
      { header: 'Status Reason', key: 'statusReason', width: 25 },
      { header: 'Evaluation Scores', key: 'evaluationScores', width: 40 },
      { header: 'Average Score', key: 'averageScore', width: 15 },
      { header: 'Final Status', key: 'finalStatus', width: 15 },
      { header: 'Rank', key: 'rank', width: 10 },
      { header: 'Final Stage', key: 'finalStage', width: 15 },

      // Bank Details
      { header: 'Account Holder Name', key: 'accountHolderName', width: 25 },
      { header: 'Account No', key: 'accountNo', width: 20 },
      { header: 'Bank Name', key: 'bankName', width: 20 },
      { header: 'Branch', key: 'branch', width: 20 },
      { header: 'IFSC Code', key: 'ifscCode', width: 15 },
      { header: 'PAN No', key: 'panNo', width: 20 },
      { header: 'Aadhar No', key: 'aadharNo', width: 20 },

      // Documents
      { header: 'Document Filename', key: 'documentFilename', width: 30 },

      // Submission Time
      { header: 'Submitted At', key: 'submittedAt', width: 25 },
    ];

    // Add rows
    schools.forEach(school => {
      school.submissions.forEach(sub => {
        const studentDetails = sub.studentDetails
          ?.map(stu => {
            return `${stu.name || "-"} (Father: ${stu.fatherName || "-"}, DOB: ${stu.dateOfBirth || "-"}, Gender: ${stu.gender || "-"}, Community: ${stu.community || "-"}, District: ${stu.district || "-"}, Std: ${stu.standard || "-"}, Email: ${stu.email || "-"}, Contact: ${stu.contactNumber || "-"})`;
          })
          .join(' | ') || "-";

        const evaluationScores = sub.evaluationScores
          ?.map(score => `${score.evaluatorName || "-"}: ${score.score || "-"} (${score.status || "-"})`)
          .join(' | ') || "-";

        worksheet.addRow({
          schoolName: school.School_Name || "-",
          udiseCode: school.UDISE_Code || "-",
          district: school.District || "-",
          block: school.Block || "-",
          educationDistrict: school.Education_District || "-",
          category: school.Category || "-",
          categoryGroup: school.Category_Group || "-",
          management: school.Management || "-",
          managementType: school.Management_Type || "-",
          directorate: school.Directorate || "-",
          cluster: school.Cluster || "-",
          localBody: school.LocalBody || "-",
          townVillage: school.Town_Munici_Village_Corp || "-",
          address: school.Address || "-",
          hmName: school.hmName || "-",
          hmEmail: school.hmEmail || "-",
          hmMobile: school.hmMobile || "-",
          email: school.Email_ID || "-",
          officeMobile: school.Office_Mobile || "-",
          officeLandline: school.Office_landline || "-",
          correspondMobile: school.Correspond_Mobile || "-",
          correspondLandline: school.Correspond_landline || "-",

          teacherName: school.guideTeachers?.[0]?.name || "-",
          teacherEmail: school.guideTeachers?.[0]?.email || "-",
          teacherPhone: school.guideTeachers?.[0]?.phone || "-",

          title: sub.projectDetails?.title || "-",
          description: sub.projectDetails?.description || "-",
          problemStatement: sub.projectDetails?.problemStatement || "-",
          solution: sub.projectDetails?.solution || "-",
          teamSize: sub.projectDetails?.teamSize || "-",

          studentDetails,

          customerSegments: sub.bmcDetails?.customerSegments || "-",
          valuePropositions: sub.bmcDetails?.valuePropositions || "-",
          channels: sub.bmcDetails?.channels || "-",
          customerRelationships: sub.bmcDetails?.customerRelationships || "-",
          revenueStreams: sub.bmcDetails?.revenueStreams || "-",
          keyResources: sub.bmcDetails?.keyResources || "-",
          keyActivities: sub.bmcDetails?.keyActivities || "-",
          keyPartners: sub.bmcDetails?.keyPartners || "-",
          costStructure: sub.bmcDetails?.costStructure || "-",

          transactionId: sub.transactionId || "-",
          paymentAmount: sub.paymentAmount || "-",
          paymentStatus: sub.paymentStatus || "-",

          evaluatedBy: sub.evaluatedBy?.name || "-",
          evaluationStatus: sub.evaluationStatus || "-",
          statusReason: sub.statusReason || "-",
          evaluationScores,
          averageScore: sub.averageScore || "-",
          finalStatus: sub.finalStatus || "-",
          rank: sub.rank || "-",
          finalStage: sub.finalStage || "-",

          accountHolderName: sub.bankAccountDetails?.accountHolderName || "-",
          accountNo: sub.bankAccountDetails?.accountNo || "-",
          bankName: sub.bankAccountDetails?.bankName || "-",
          branch: sub.bankAccountDetails?.branch || "-",
          ifscCode: sub.bankAccountDetails?.ifscCode || "-",
          panNo: sub.bankAccountDetails?.panNo || "-",
          aadharNo: sub.bankAccountDetails?.aadharNo || "-",

          documentFilename: sub.documentFile?.filename || "-",
          submittedAt: sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : "-",
        });
      });
    });

    // Send workbook to client
    await sendWorkbook(res, workbook, 'submitted-projects');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating report');
  }
});


// 3. Evaluator Performance
router.get('/evaluator-performance', async (req, res) => {
  try {
    // Fetch all schools that have evaluation scores
    const schools = await School.find({ 'submissions.evaluationScores.0': { $exists: true } });

    // Fetch all evaluators
    const evaluators = await Evaluator.find({}, 'name email username summary level2Summary').lean();

    // Map evaluators for quick lookup
    const evaluatorMap = new Map(evaluators.map(e => [e.username.trim().toLowerCase(), e]));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Evaluator Performance');

    worksheet.columns = [
      { header: 'Evaluator Name', key: 'evaluatorName', width: 25 },
      { header: 'Evaluator Email', key: 'evaluatorEmail', width: 30 },
      { header: 'Evaluator Username', key: 'evaluatorUsername', width: 25 },
      { header: 'School', key: 'schoolName', width: 30 },
      { header: 'Project Title', key: 'projectTitle', width: 30 },
      { header: 'Project Description', key: 'projectDescription', width: 50 },
      { header: 'Team Size', key: 'teamSize', width: 15 },
      { header: 'Student Names', key: 'studentNames', width: 40 },
      { header: 'Customer Segments', key: 'customerSegments', width: 30 },
      { header: 'Value Propositions', key: 'valuePropositions', width: 30 },
      { header: 'Score', key: 'score', width: 10 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Evaluated At', key: 'evaluatedAt', width: 25 },

      // Level 1 Summary
      { header: 'L1 Total', key: 'level1Total', width: 10 },
      { header: 'L1 Accepted', key: 'level1Accepted', width: 10 },
      { header: 'L1 Rejected', key: 'level1Rejected', width: 10 },
      { header: 'L1 Pending', key: 'level1Pending', width: 10 },

      // Level 2 Summary
      { header: 'L2 Total', key: 'level2Total', width: 10 },
    ];

    schools.forEach(school => {
      school.submissions.forEach(submission => {
        submission.evaluationScores?.forEach(scoreObj => {
          const evalKey = scoreObj.evaluatorName?.trim().toLowerCase();
          const evaluator = evaluatorMap.get(evalKey);

          const studentNames = submission.studentDetails?.map(s => s.name).join(', ') || "-";

          worksheet.addRow({
            evaluatorName: scoreObj.evaluatorName || "-",
            evaluatorEmail: evaluator?.email || "-",
            evaluatorUsername: evaluator?.username || "-",
            schoolName: school.School_Name || "-",
            projectTitle: submission.projectDetails?.title || "-",
            projectDescription: submission.projectDetails?.description || "-",
            teamSize: submission.projectDetails?.teamSize || "-",
            studentNames,
            customerSegments: submission.bmcDetails?.customerSegments || "-",
            valuePropositions: submission.bmcDetails?.valuePropositions || "-",
            score: scoreObj.score || "-",
            status: scoreObj.status || "-",
            evaluatedAt: scoreObj.evaluatedAt ? new Date(scoreObj.evaluatedAt).toLocaleString() : "-",

            // Level 1 summary
            level1Total: evaluator?.summary?.total || 0,
            level1Accepted: evaluator?.summary?.accepted || 0,
            level1Rejected: evaluator?.summary?.rejected || 0,
            level1Pending: evaluator?.summary?.pending || 0,

            // Level 2 summary
            level2Total: evaluator?.level2Summary?.total || 0,
          });
        });
      });
    });

    await sendWorkbook(res, workbook, 'evaluator-performance');
  } catch (err) {
    console.error('Error generating evaluator performance report:', err);
    res.status(500).send('Error generating report');
  }
});



// 4. Finalist List
router.get('/finalist-list', async (req, res) => {
  try {
    // Fetch schools that have submissions
    const schools = await School.find({ 'submissions.0': { $exists: true } });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Finalists');

    worksheet.columns = [
      // School Info
      { header: 'School Name', key: 'schoolName', width: 30 },
      { header: 'UDISE Code', key: 'udiseCode', width: 15 },
      { header: 'District', key: 'district', width: 20 },
      { header: 'Block', key: 'block', width: 20 },
      { header: 'Education District', key: 'educationDistrict', width: 20 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Management', key: 'management', width: 20 },

      // Guide Teacher
      { header: 'Guide Teacher Name', key: 'teacherName', width: 25 },
      { header: 'Guide Teacher Email', key: 'teacherEmail', width: 25 },
      { header: 'Guide Teacher Phone', key: 'teacherPhone', width: 20 },

      // Project Details
      { header: 'Project Title', key: 'title', width: 30 },
      { header: 'Project Description', key: 'description', width: 50 },
      { header: 'Problem Statement', key: 'problemStatement', width: 40 },
      { header: 'Solution', key: 'solution', width: 40 },
      { header: 'Team Size', key: 'teamSize', width: 10 },

      // Students
      { header: 'Student Details', key: 'studentDetails', width: 50 },

      // BMC / Business Model Canvas
      { header: 'Customer Segments', key: 'customerSegments', width: 25 },
      { header: 'Value Propositions', key: 'valuePropositions', width: 25 },
      { header: 'Channels', key: 'channels', width: 20 },
      { header: 'Customer Relationships', key: 'customerRelationships', width: 25 },
      { header: 'Revenue Streams', key: 'revenueStreams', width: 20 },
      { header: 'Key Resources', key: 'keyResources', width: 20 },
      { header: 'Key Activities', key: 'keyActivities', width: 20 },
      { header: 'Key Partners', key: 'keyPartners', width: 20 },
      { header: 'Cost Structure', key: 'costStructure', width: 20 },

      // Payment
      { header: 'Transaction ID', key: 'transactionId', width: 20 },
      { header: 'Payment Amount', key: 'paymentAmount', width: 15 },
      { header: 'Payment Status', key: 'paymentStatus', width: 15 },

      // Evaluation
      { header: 'Evaluated By', key: 'evaluatedBy', width: 25 },
      { header: 'Evaluation Status', key: 'evaluationStatus', width: 20 },
      { header: 'Status Reason', key: 'statusReason', width: 25 },
      { header: 'Evaluation Scores', key: 'evaluationScores', width: 40 },
      { header: 'Average Score', key: 'averageScore', width: 15 },
      { header: 'Final Status', key: 'finalStatus', width: 15 },
      { header: 'Rank', key: 'rank', width: 10 },
      { header: 'Final Stage', key: 'finalStage', width: 15 },

      // Bank Details
      { header: 'Account Holder Name', key: 'accountHolderName', width: 25 },
      { header: 'Account No', key: 'accountNo', width: 20 },
      { header: 'Bank Name', key: 'bankName', width: 20 },
      { header: 'Branch', key: 'branch', width: 20 },
      { header: 'IFSC Code', key: 'ifscCode', width: 15 },
      { header: 'PAN No', key: 'panNo', width: 20 },
      { header: 'Aadhar No', key: 'aadharNo', width: 20 },

      // Submission Time
      { header: 'Submitted At', key: 'submittedAt', width: 25 },
    ];

    schools.forEach(school => {
      school.submissions.forEach(sub => {
        // Only include filtered finalists
        if (sub.averageFilter === 'filtered') {
          // Prepare student details string
          const studentDetails = sub.studentDetails
            ?.map(stu => `${stu.name || "-"} (Father: ${stu.fatherName || "-"}, DOB: ${stu.dateOfBirth || "-"}, Gender: ${stu.gender || "-"}, Std: ${stu.standard || "-"})`)
            .join(' | ') || '-';

          // Prepare evaluation scores string
          const evaluationScores = sub.evaluationScores
            ?.map(score => `${score.evaluatorName || "-"}: ${score.score || "-"} (${score.status || "-"})`)
            .join(' | ') || '-';

          console.log("Checking submission:", sub.title, sub.averageFilter, sub.evaluationStatus);


          worksheet.addRow({
            // School Info
            schoolName: school.School_Name || '-',
            udiseCode: school.UDISE_Code || '-',
            district: school.District || '-',
            block: school.Block || '-',
            educationDistrict: school.Education_District || '-',
            category: school.Category || '-',
            management: school.Management || '-',

            // Guide Teacher
            teacherName: school.guideTeachers?.[0]?.name || '-',
            teacherEmail: school.guideTeachers?.[0]?.email || '-',
            teacherPhone: school.guideTeachers?.[0]?.phone || '-',

            // Project Details
            title: sub.projectDetails?.title || '-',
            description: sub.projectDetails?.description || '-',
            problemStatement: sub.projectDetails?.problemStatement || '-',
            solution: sub.projectDetails?.solution || '-',
            teamSize: sub.projectDetails?.teamSize || '-',

            // Students
            studentDetails,

            // BMC
            customerSegments: sub.bmcDetails?.customerSegments || '-',
            valuePropositions: sub.bmcDetails?.valuePropositions || '-',
            channels: sub.bmcDetails?.channels || '-',
            customerRelationships: sub.bmcDetails?.customerRelationships || '-',
            revenueStreams: sub.bmcDetails?.revenueStreams || '-',
            keyResources: sub.bmcDetails?.keyResources || '-',
            keyActivities: sub.bmcDetails?.keyActivities || '-',
            keyPartners: sub.bmcDetails?.keyPartners || '-',
            costStructure: sub.bmcDetails?.costStructure || '-',

            // Payment
            transactionId: sub.transactionId || '-',
            paymentAmount: sub.paymentAmount || '-',
            paymentStatus: sub.paymentStatus || '-',

            // Evaluation
            evaluatedBy: sub.evaluatedBy?.name || sub.assignedEvaluator || '-',
            evaluationStatus: sub.evaluationStatus || '-',
            statusReason: sub.statusReason || '-',
            evaluationScores,
            averageScore: sub.averageScore || '-',
            finalStatus: sub.finalStatus || '-',
            rank: sub.rank || '-',
            finalStage: sub.finalStage || '-',

            // Bank
            accountHolderName: sub.bankAccountDetails?.accountHolderName || '-',
            accountNo: sub.bankAccountDetails?.accountNo || '-',
            bankName: sub.bankAccountDetails?.bankName || '-',
            branch: sub.bankAccountDetails?.branch || '-',
            ifscCode: sub.bankAccountDetails?.ifscCode || '-',
            panNo: sub.bankAccountDetails?.panNo || '-',
            aadharNo: sub.bankAccountDetails?.aadharNo || '-',

            submittedAt: sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : '-',
          });
        }
      });
    });

    await sendWorkbook(res, workbook, 'finalist-list');
  } catch (err) {
    console.error('Error generating finalist report:', err);
    res.status(500).send('Error generating report');
  }
});


// Winner List API
router.get('/winner-list', async (req, res) => {
  try {
    // 1. Fetch schools having submissions with rank
    const schools = await School.find({ 'submissions.rank': { $exists: true, $ne: null } });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Winner List');

    // 2. Define columns
    worksheet.columns = [
      // School Info
      { header: 'School Name', key: 'schoolName', width: 30 },
      { header: 'UDISE Code', key: 'udiseCode', width: 15 },
      { header: 'District', key: 'district', width: 20 },
      { header: 'Block', key: 'block', width: 20 },
      { header: 'HM Name', key: 'hmName', width: 20 },
      { header: 'HM Email', key: 'hmEmail', width: 25 },
      { header: 'HM Mobile', key: 'hmMobile', width: 15 },

      // Project Details
      { header: 'Project Title', key: 'title', width: 30 },
      { header: 'Project Description', key: 'description', width: 50 },
      { header: 'Team Size', key: 'teamSize', width: 10 },

      // Students
      { header: 'Student Details', key: 'studentDetails', width: 50 },

      // Evaluation & Rank
      { header: 'Rank', key: 'rank', width: 10 },
      { header: 'Final Status', key: 'finalStatus', width: 15 },
      { header: 'Final Stage', key: 'finalStage', width: 15 },

      // Payment
      { header: 'Transaction ID', key: 'transactionId', width: 20 },
      { header: 'Payment Amount', key: 'paymentAmount', width: 15 },
      { header: 'Payment Status', key: 'paymentStatus', width: 15 },
    ];

    // 3. Flatten submissions with rank and sort by rank ascending
    const winnerRows = [];
    schools.forEach(school => {
      school.submissions
        .filter(sub => sub.rank) // Only submissions with rank
        .sort((a, b) => Number(a.rank) - Number(b.rank)) // ascending order
        .forEach(sub => {
          const studentDetails = sub.studentDetails
            ?.map(s => `${s.name} (Std: ${s.standard}, Contact: ${s.contactNumber})`)
            .join(' | ') || '-';

          winnerRows.push({
            schoolName: school.School_Name || '-',
            udiseCode: school.UDISE_Code || '-',
            district: school.District || '-',
            block: school.Block || '-',
            hmName: school.hmName || '-',
            hmEmail: school.hmEmail || '-',
            hmMobile: school.hmMobile || '-',

            title: sub.projectDetails?.title || '-',
            description: sub.projectDetails?.description || '-',
            teamSize: sub.projectDetails?.teamSize || '-',

            studentDetails,
            rank: sub.rank || '-',
            finalStatus: sub.finalStatus || '-',
            finalStage: sub.finalStage || '-',

            transactionId: sub.transactionId || '-',
            paymentAmount: sub.paymentAmount || '-',
            paymentStatus: sub.paymentStatus || '-',
          });
        });
    });

    // 4. Add rows to worksheet
    winnerRows.forEach(row => worksheet.addRow(row));

    // 5. Send workbook
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="winner-list.xlsx"'
    );
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Error generating winner list:', err);
    res.status(500).send('Error generating report');
  }
});

// GET all evaluators
router.get('/get-evaluators', async (req, res) => {
  try {
    const evaluators = await Evaluator.find({}, '-password'); // exclude password
    res.json(evaluators);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch evaluators' });
  }
});


router.put('/evaluators/:id', async (req, res) => {
  try {
    const updated = await Evaluator.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});

// 1. Get all filtered projects
router.get('/jully-marks', async (req, res) => {
  try {
    const schools = await School.find({ 'submissions.averageFilter': 'filtered' });

    const filteredProjects = [];

    schools.forEach(school => {
      school.submissions.forEach(submission => {
        if (submission.averageFilter === 'filtered') {
          filteredProjects.push({
            schoolId: school._id,
            submissionId: submission._id,
            schoolName: school.School_Name,
            projectName: submission.projectDetails.title,
            jullyMarks: submission.jullyMarks || null,
            locked: submission.jullyMarks?.locked === true
          });
        }
      });
    });

    res.json(filteredProjects);
  } catch (error) {
    console.error('Error fetching filtered projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Express route example
// router.post('/jully-marks/save', async (req, res) => {
//   const { submissionId, jully1, jully2, jully3, bannel, average } = req.body;


//   try {
//     const school = await School.findOne({ 'submissions._id': submissionId });

//     if (!school) return res.status(404).json({ message: 'Submission not found' });

//     const submission = school.submissions.id(submissionId);
//     submission.jullyMarks = {
//       jully1,
//       jully2,
//       jully3,
//       bannel,
//       average,
//       locked: true, // flag to lock after save
//     };
//     submission.finalStage = 'pending';
//     submission.finalStatus = 'pending';

//     await school.save();
//     res.json({ message: 'Marks saved successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to save marks' });
//   }
// });

router.post('/jully-marks/save', async (req, res) => {
  const { submissionId, jully1, jully2, jully3, bannel, average } = req.body;

  try {
    const school = await School.findOne({
      'submissions._id': new mongoose.Types.ObjectId(submissionId)
    });

    if (!school) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    const submission = school.submissions.id(submissionId);
    submission.jullyMarks = {
      jully1,
      jully2,
      jully3,
      bannel,
      average,
      locked: true
    };
    submission.finalStage = 'pending';
    submission.finalStatus = 'pending';

    await school.save();
    res.json({ message: 'Marks saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save marks' });
  }
});


//daily datewise tracking project details

router.get("/getTrackingByDate", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    // Convert date to start and end of the day (UTC)
    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setUTCDate(start.getUTCDate() + 1);

    // Mongo aggregation pipeline
    const schools = await School.aggregate([
      { $unwind: "$submissions" }, // flatten submissions array
      {
        $match: {
          "submissions.submittedAt": {
            $gte: start,
            $lt: end,
          },
        },
      },
      {
        $group: {
          _id: "$District",
          total: { $sum: 1 },
          accepted: {
            $sum: {
              $cond: [
                { $eq: ["$submissions.evaluationStatus", "accept"] },
                1,
                0,
              ],
            },
          },
          rejected: {
            $sum: {
              $cond: [
                { $eq: ["$submissions.evaluationStatus", "reject"] },
                1,
                0,
              ],
            },
          },
          pending: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ["$submissions.evaluationStatus", null] },
                    { $eq: ["$submissions.evaluationStatus", ""] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      date: date,
      districts: schools,
    });
  } catch (err) {
    console.error("Error in /getTrackingByDate:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Get all approved evaluators
router.get("/get-all-evaluators", async (req, res) => {
  try {
    const evaluators = await Evaluator.find({ status: "approved" }); // ✅ only approved
    res.json(evaluators);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/:username/projects", async (req, res) => {
  try {
    const { username } = req.params;

    const schools = await School.find({
      $or: [
        { "submissions.assignedEvaluator": username },
        { "submissions.evaluationScores.evaluatorName": username }
      ]
    });

    let assignedProjects = [];
    let evaluatedProjects = [];

    schools.forEach((school) => {
      school.submissions.forEach((sub) => {
        // Assigned projects
        if (
          sub.assignedEvaluator &&
          sub.assignedEvaluator.toLowerCase() === username.toLowerCase()
        ) {
          assignedProjects.push({
            schoolName: school.School_Name,
            title: sub.projectDetails?.title,
            bmcDetails: sub.bmcDetails,
            status: sub.evaluationStatus,
          });
        }

        // Evaluated projects
        sub.evaluationScores.forEach((scoreObj) => {
          if (
            scoreObj.evaluatorName &&
            scoreObj.evaluatorName.toLowerCase() === username.toLowerCase()
          ) {
            evaluatedProjects.push({
              schoolName: school.School_Name,
              title: sub.projectDetails?.title,
              score: scoreObj.score,
              status: scoreObj.status,
              evaluatedAt: scoreObj.evaluatedAt,
            });
          }
        });

      });
    });

    res.json({ assignedProjects, evaluatedProjects });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
});





export default router;
