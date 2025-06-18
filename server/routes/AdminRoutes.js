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



router.get("/dashboard-stats", async (req, res) => {
  try {
    const totalSchools = await School.countDocuments();

    // Count total guide teachers by summing lengths of guideTeachers arrays
    const totalGuideTeachersResult = await School.aggregate([
      { $project: { guideTeacherCount: { $size: { $ifNull: ["$guideTeachers", []] } } } },
      { $group: { _id: null, total: { $sum: "$guideTeacherCount" } } }
    ]);
    const totalGuideTeachers = totalGuideTeachersResult[0]?.total || 0;

    // Count total projects by summing lengths of submissions arrays
    const totalProjectsResult = await School.aggregate([
      { $project: { submissionsCount: { $size: { $ifNull: ["$submissions", []] } } } },
      { $group: { _id: null, total: { $sum: "$submissionsCount" } } }
    ]);
    const totalProjects = totalProjectsResult[0]?.total || 0;

    // Count total evaluators (assuming Evaluator model exists)
    const totalEvaluators = await Evaluator.countDocuments();

    // Count finalist teams (submissions where evaluationStatus is "finalist")
    const finalistTeamsResult = await School.aggregate([
      { $unwind: "$submissions" },
      { $match: { "submissions.evaluationStatus": "Finalist" } },
      { $count: "count" }
    ]);
    const finalistTeams = finalistTeamsResult[0]?.count || 0;

    // Count total evaluated projects
    const totalEvaluatedProjectsResult = await School.aggregate([
      { $unwind: "$submissions" },
      { $match: { "submissions.evaluationStatus": "evaluated" } },
      { $count: "count" }
    ]);
    const totalEvaluatedProjects = totalEvaluatedProjectsResult[0]?.count || 0;

    // Submissions count per district
    const submissionsPerDistrict = await School.aggregate([
      { $unwind: "$submissions" },
      {
        $group: {
          _id: "$District",
          submissionsCount: { $sum: 1 }
        }
      }
    ]);

    // Project status counts - pending, evaluated, rejected in submissions
    const projectStatusCountsAggregation = await School.aggregate([
      { $unwind: "$submissions" },
      {
        $group: {
          _id: "$submissions.evaluationStatus",
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert aggregation array to object with default zeros
    const projectStatusCounts = {
      pending: 0,
      evaluated: 0,
      rejected: 0,
    };

    projectStatusCountsAggregation.forEach((item) => {
      if (item._id) {
        projectStatusCounts[item._id] = item.count;
      }
    });

    res.json({
      totalSchools,
      totalGuideTeachers,
      totalProjects,
      totalEvaluators,
      totalEvaluatedProjects,
      finalistTeams,
      submissionsPerDistrict,
      projectStatusCounts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// routes/school.js or wherever you handle GET /schools
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

    const pendingProjects = submissions.filter(sub =>
      !['Accepted', 'Rejected'].includes(sub.evaluationStatus)
    );

    const completedProjects = submissions
      .filter(sub =>
        sub.paymentStatus === 'successful' &&
        sub.evaluationStatus?.toLowerCase() === 'accepted' || sub.evaluationStatus?.toLowerCase() === 'runner' || sub.evaluationStatus?.toLowerCase() === 'winner'
      )
      .map(sub => ({
        projectDetails: sub.projectDetails,
        bmcDetails: sub.bmcDetails,
        paymentStatus: sub.paymentStatus,
        evaluationScores: sub.evaluationScores,
        evaluatedBy: sub.evaluatedBy,
        documentFile: sub.documentFile?.data ? {
          filename: sub.documentFile.filename,
          contentType: sub.documentFile.contentType,
          base64: sub.documentFile.data.toString('base64')
        } : null,
        paymentScreenshot: sub.paymentScreenshot?.data ? {
          filename: sub.paymentScreenshot.filename,
          contentType: sub.paymentScreenshot.contentType,
          base64: sub.paymentScreenshot.data.toString('base64')
        } : null
      }));


    res.json({
      totalProjects,
      guideTeachers,
      teamsCount,
      studentsCount,
      guideTeachersList,
      studentDetailsList: studentsList,
      pendingProjectsList: pendingProjects,
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
    const schools = await School.find({}, 'School_Name guideTeachers submissions');

    const guideTeachersList = [];

    schools.forEach(school => {
      const projectCount = school.submissions.length;

      school.guideTeachers.forEach(teacher => {
        guideTeachersList.push({
          name: teacher.name,
          email: teacher.email,
          school: school.School_Name,
          projectCount: projectCount
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


// GET all evaluators with projects
router.get('/evaluators', async (req, res) => {
  try {
    const evaluators = await Evaluator.find();
    res.json(evaluators);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching evaluators' });
  }
});


// GET evaluated projects by evaluator
router.get('/:evaluatorId/evaluated-projects', async (req, res) => {
  const { evaluatorId } = req.params;

  try {
    // Fetch evaluator
    const evaluator = await Evaluator.findById(evaluatorId);
    if (!evaluator) {
      return res.status(404).json({ message: 'Evaluator not found' });
    }

    let result = [];

    if (evaluator.evaluationStage === 'stage1') {
      // STAGE 1
      const schools = await School.find({
        'submissions.evaluatedBy.id': evaluatorId
      });

      result = schools.map(school => {
        const evaluatedSubmissions = school.submissions.filter(
          sub => sub.evaluatedBy?.id?.toString() === evaluatorId
        );

        return {
          schoolId: school._id,
          schoolName: school.School_Name,
          udiseCode: school.UDISE_Code,
          district: school.District,
          submissions: evaluatedSubmissions
        };
      });

    } else if (evaluator.evaluationStage === 'stage2') {
      // STAGE 2
      const schools = await School.find({
        'submissions.evaluationScores.evaluatorName': evaluator.username
      });

      result = schools.map(school => {
        const evaluatedSubmissions = school.submissions.filter(sub =>
          sub.evaluationScores?.some(score =>
            score.evaluatorName === evaluator.username
          )
        );

        return {
          schoolId: school._id,
          schoolName: school.School_Name,
          udiseCode: school.UDISE_Code,
          district: school.District,
          submissions: evaluatedSubmissions
        };
      });

    }
     
    else if (evaluator.evaluationStage === 'stage3') {
      const schools = await School.find({
        'submissions.evaluationStatus': { $exists: true, $ne: null }
      });

      result = [];

      for (const school of schools) {
        const matchingSubmissions = [];

        for (const sub of school.submissions) {
          if (!sub.evaluationStatus) continue;

          

          const totalScore = sub.evaluationScores?.reduce((sum, s) => sum + (s.score || 0), 0) || 0;
          const count = sub.evaluationScores?.filter(s => s.score !== undefined)?.length || 1;
          const averageScore = totalScore / count;

          matchingSubmissions.push({
            _id: sub._id,
            schoolId: school._id,
            projectTitle: sub.projectDetails?.title,
            projectDescription: sub.projectDetails?.description,
            documents: {
              filename: sub.documentFile?.filename,
              contentType: sub.documentFile?.contentType,
              base64: sub.documentFile?.data ? `data:${sub.documentFile.contentType};base64,${sub.documentFile.data.toString('base64')}` : null
            },
            averageScore: averageScore.toFixed(2),
            evaluationStatus: sub.evaluationStatus
          });
        }

        if (matchingSubmissions.length > 0) {
          result.push({
            schoolId: school._id,
            schoolName: school.School_Name,
            udiseCode: school.UDISE_Code,
            district: school.District,
            submissions: matchingSubmissions
          });
        }
      }
    
      return res.json(result);
    }

    else {
      return res.status(400).json({ message: 'Unsupported evaluator stage' });
    }

    res.json(result);

  } catch (err) {
    console.error('Error fetching evaluated projects:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

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

router.get("/top-finalists", async (req, res) => {
  try {
    const schools = await School.find({ "submissions.evaluationScores": { $exists: true, $ne: [] } });

    let allProjects = [];

    schools.forEach((school) => {
      school.submissions.forEach((sub) => {
        const avgScore = calculateAverage(sub.evaluationScores);
        allProjects.push({
          projectId: sub._id,
          title: sub.projectDetails?.title || "Untitled",
          schoolName: school.School_Name,
          district: school.District,
          averageScore: avgScore,
          evaluationStatus: sub.evaluationStatus,
        });
      });
    });

    // Sort and pick top 10
    const top10 = allProjects.sort((a, b) => b.averageScore - a.averageScore).slice(0, 10);

    res.status(200).json(top10);
  } catch (err) {
    console.error("Error fetching top finalists:", err);
    res.status(500).json({ message: "Server Error" });
  }
});


// Accept a project as finalist
router.post("/accept-finalist/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    const school = await School.findOne({ "submissions._id": projectId });

    if (!school) return res.status(404).json({ message: "Project not found" });

    const submission = school.submissions.id(projectId);
    submission.evaluationStatus = "Finalist";

    await school.save();

    res.status(200).json({ message: "Marked as finalist successfully" });
  } catch (err) {
    console.error("Error updating finalist status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/notify-finalist/:projectId", async (req, res) => {
  const { projectId } = req.params;

  // Validate projectId as ObjectId
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    // Find the school document that has the submission
    const school = await School.findOne({ "submissions._id": projectId });

    if (!school) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Find the submission inside the school.submissions array
    const submission = school.submissions.find(
      (s) => s._id.toString() === projectId
    );

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Get details
    const { title } = submission.projectDetails;
    const { evaluationStatus } = submission;

    // Only send if evaluationStatus is Finalist (optional, your choice)
    if (evaluationStatus !== "Finalist") {
      return res.status(400).json({ message: "Project is not a finalist" });
    }

    const students = submission.studentDetails;

    if (!students || students.length === 0) {
      return res.status(400).json({ message: "No students found in this project" });
    }


    const studentNames = students.map(s => s.name);
    if (!school.Email_ID) {
      return res.status(400).json({ message: "School email ID not found." });
    }

    // Compose email to school email only
    const mailOptions = {
      from: process.env.EMAIL_USER || "karthikraj825@gmail.com",
      to: school.Email_ID,
      subject: `🎉 Congratulations from EDII Hackathon!`,
      html: `
    <h2>Dear ${school.School_Name} Team,</h2>
    <p>🎉 <strong>Congratulations!</strong> 🎉</p>
    <p>Your project <strong>"${title}"</strong> from <strong>${school.District}</strong> has been selected as a <strong>Top 10 Finalist</strong>.</p>
    <p><strong>Team Members:</strong> ${studentNames.join(", ")}</p>
    <p>We look forward to seeing you in the next round. Stay tuned for further updates!</p>
    <br/>
    <p>Warm regards,<br/>EDII Hackathon Committee</p>
  `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: `Notification email sent to school: ${school.Email_ID}` });


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
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Mobile', key: 'mobile', width: 15 },
      { header: 'Guide Teacher Name', key: 'teacherName', width: 25 },
      { header: 'Guide Teacher Email', key: 'teacherEmail', width: 25 },
      { header: 'Project Title', key: 'projectTitle', width: 30 },
      { header: 'Team Size', key: 'teamSize', width: 10 },
      { header: 'Student Names', key: 'studentNames', width: 40 },
      { header: 'Payment Status', key: 'paymentStatus', width: 15 },
      { header: 'Transaction ID', key: 'transactionId', width: 20 },
      { header: 'Submitted At', key: 'submittedAt', width: 20 },
      { header: 'Evaluation Status', key: 'evaluationStatus', width: 15 },
      { header: 'Evaluator Name', key: 'evaluatorName', width: 20 },
      { header: 'Score', key: 'score', width: 10 }
    ];

    schools.forEach(school => {
      const guideTeachers = school.guideTeachers?.length
        ? school.guideTeachers
        : [{ name: '', email: '' }];

      const submissions = school.submissions?.length
        ? school.submissions
        : [{
          projectDetails: {},
          studentDetails: [],
          paymentStatus: '',
          transactionId: '',
          submittedAt: '',
          evaluationStatus: '',
          evaluatedBy: {},
          evaluationScores: []
        }];

      submissions.forEach(sub => {
        guideTeachers.forEach(teacher => {
          worksheet.addRow({
            schoolName: school.School_Name,
            udiseCode: school.UDISE_Code,
            district: school.District,
            block: school.Block,
            email: school.Email_ID,
            mobile: school.Office_Mobile,
            teacherName: teacher.name,
            teacherEmail: teacher.email,
            projectTitle: sub.projectDetails?.title || '',
            teamSize: sub.projectDetails?.teamSize || '',
            studentNames: sub.studentDetails?.map(s => s.name).join(', '),
            paymentStatus: sub.paymentStatus || '',
            transactionId: sub.transactionId || '',
            submittedAt: sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : '',
            evaluationStatus: sub.evaluationStatus || '',
            evaluatorName: sub.evaluatedBy?.name || '',
            score: sub.evaluationScores?.[0]?.score || ''
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
    const schools = await School.find({ 'submissions.0': { $exists: true } });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Projects');

    worksheet.columns = [
      { header: 'School Name', key: 'schoolName', width: 30 },
      { header: 'Project Title', key: 'title', width: 30 },
      { header: 'Project Description', key: 'description', width: 50 },
      { header: 'Team Size', key: 'teamSize', width: 15 },
      { header: 'Submitted At', key: 'submittedAt', width: 25 },
      { header: 'Document Filename', key: 'documentFilename', width: 30 },

      { header: 'Student Details', key: 'studentDetails', width: 50 },

      { header: 'Customer Segments', key: 'customerSegments', width: 25 },
      { header: 'Value Propositions', key: 'valuePropositions', width: 25 },
      { header: 'Channels', key: 'channels', width: 20 },
      { header: 'Customer Relationships', key: 'customerRelationships', width: 25 },
      { header: 'Revenue Streams', key: 'revenueStreams', width: 20 },
      { header: 'Key Resources', key: 'keyResources', width: 20 },
      { header: 'Key Activities', key: 'keyActivities', width: 20 },
      { header: 'Key Partners', key: 'keyPartners', width: 20 },
      { header: 'Cost Structure', key: 'costStructure', width: 20 },

      { header: 'Transaction ID', key: 'transactionId', width: 20 },
      { header: 'Payment Amount', key: 'paymentAmount', width: 15 },
      { header: 'Payment Status', key: 'paymentStatus', width: 15 },

      { header: 'Evaluated By', key: 'evaluatedBy', width: 25 },
      { header: 'Evaluation Status', key: 'evaluationStatus', width: 20 },
      { header: 'Status Reason', key: 'statusReason', width: 25 },
      { header: 'Evaluation Scores', key: 'evaluationScores', width: 40 },
    ];

    schools.forEach(school => {
      school.submissions.forEach(sub => {
        // Prepare student details as concatenated string
        const studentDetails = sub.studentDetails
          ?.map(stu => {
            return `${stu.name} (Father: ${stu.fatherName}, DOB: ${stu.dateOfBirth}, Gender: ${stu.gender}, Community: ${stu.community}, District: ${stu.district}, Std: ${stu.standard}, Email: ${stu.email}, Contact: ${stu.contactNumber})`;
          })
          .join(' | ') || '';

        // Prepare evaluation scores as concatenated string
        const evaluationScores = sub.evaluationScores
          ?.map(score => `${score.evaluatorName}: ${score.score} (${score.status})`)
          .join(' | ') || '';

        worksheet.addRow({
          schoolName: school.School_Name,
          title: sub.projectDetails?.title || '',
          description: sub.projectDetails?.description || '',
          teamSize: sub.projectDetails?.teamSize || '',
          submittedAt: sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : '',
          documentFilename: sub.documentFile?.filename || '',

          studentDetails,

          customerSegments: sub.bmcDetails?.customerSegments || '',
          valuePropositions: sub.bmcDetails?.valuePropositions || '',
          channels: sub.bmcDetails?.channels || '',
          customerRelationships: sub.bmcDetails?.customerRelationships || '',
          revenueStreams: sub.bmcDetails?.revenueStreams || '',
          keyResources: sub.bmcDetails?.keyResources || '',
          keyActivities: sub.bmcDetails?.keyActivities || '',
          keyPartners: sub.bmcDetails?.keyPartners || '',
          costStructure: sub.bmcDetails?.costStructure || '',

          transactionId: sub.transactionId || '',
          paymentAmount: sub.paymentAmount || '',
          paymentStatus: sub.paymentStatus || '',

          evaluatedBy: sub.evaluatedBy?.name || '',
          evaluationStatus: sub.evaluationStatus || '',
          statusReason: sub.statusReason || '',
          evaluationScores
        });
      });
    });

    await sendWorkbook(res, workbook, 'submitted-projects');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating report');
  }
});

// 3. Evaluator Performance
router.get('/evaluator-performance', async (req, res) => {
  try {
    // 1. Fetch all schools that have evaluation scores
    const schools = await School.find({ 'submissions.evaluationScores.0': { $exists: true } });

    // 2. Fetch all evaluators (only required fields)
    const evaluators = await Evaluator.find({}, 'name email username').lean();

    // 3. Create a map for fast lookup by evaluator name (lowercase trimmed)
    const evaluatorMap = new Map(
      evaluators.map(e => [e.name.trim().toLowerCase(), e])
    );

    // 4. Create Excel workbook and worksheet
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
    ];

    // 5. Iterate and fill rows
    schools.forEach(school => {
      school.submissions.forEach(submission => {
        submission.evaluationScores?.forEach(scoreObj => {
          // Lookup evaluator by evaluatorName (case-insensitive)
          const evalKey = scoreObj.evaluatorName?.trim().toLowerCase();
          const evaluator = evaluatorMap.get(evalKey);

          const studentNames = submission.studentDetails?.map(s => s.name).join(', ') || '';

          worksheet.addRow({
            evaluatorName: scoreObj.evaluatorName || '',
            evaluatorEmail: evaluator?.email || '',
            evaluatorUsername: evaluator?.username || '',
            schoolName: school.School_Name || '',
            projectTitle: submission.projectDetails?.title || '',
            projectDescription: submission.projectDetails?.description || '',
            teamSize: submission.projectDetails?.teamSize || '',
            studentNames,
            customerSegments: submission.bmcDetails?.customerSegments || '',
            valuePropositions: submission.bmcDetails?.valuePropositions || '',
            score: scoreObj.score || '',
            status: scoreObj.status || '',
            evaluatedAt: scoreObj.evaluatedAt ? new Date(scoreObj.evaluatedAt).toLocaleString() : '',
          });
        });
      });
    });

    // 6. Send the Excel workbook response
    await sendWorkbook(res, workbook, 'evaluator-performance');
  } catch (err) {
    console.error('Error generating evaluator performance report:', err);
    res.status(500).send('Error generating report');
  }
});



// 4. Stage-wise Evaluation Report
router.get('/stage-evaluation-report', async (req, res) => {
  try {
    const schools = await School.find({ 'submissions.evaluationStatus': { $exists: true } });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Stage Report');

    worksheet.columns = [
      { header: 'School Name', key: 'school' },
      { header: 'Project Title', key: 'title' },
      { header: 'Evaluation Status', key: 'status' },
      { header: 'Evaluated At', key: 'evaluatedAt' },
    ];

    schools.forEach(school => {
      school.submissions.forEach(sub => {
        worksheet.addRow({
          school: school.School_Name,
          title: sub.projectDetails?.title,
          status: sub.evaluationStatus,
          evaluatedAt: sub.evaluatedAt,
        });
      });
    });

    await sendWorkbook(res, workbook, 'stage-evaluation-report');
  } catch (err) {
    res.status(500).send('Error generating report');
  }
});

// 5. Finalist List
router.get('/finalist-list', async (req, res) => {
  try {
    const schools = await School.find({ 'submissions.evaluationStatus': 'Finalist' });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Finalists');

    worksheet.columns = [
      { header: 'School Name', key: 'school' },
      { header: 'Project Title', key: 'title' },
      { header: 'Evaluator', key: 'evaluator' },
      { header: 'Score', key: 'score' },
    ];

    schools.forEach(school => {
      school.submissions.forEach(sub => {
        if (sub.evaluationStatus === 'Finalist') {
          worksheet.addRow({
            school: school.School_Name,
            title: sub.projectDetails?.title,
            evaluator: sub.evaluatedBy?.name || '',
            score: sub.evaluationScores?.[0]?.score || '',
          });
        }
      });
    });

    await sendWorkbook(res, workbook, 'finalist-list');
  } catch (err) {
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
export default router;
