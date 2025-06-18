

// const mongoose = require('mongoose');

// // Define the schema for school data
// const schoolSchema = new mongoose.Schema({
//   District: String,
//   Block: String,
//   Education_District: String,
//   UDISE_Code: Number,
//   School_Name: String,
//   Management: String,
//   Management_Type: String,
//   Category: String,
//   Category_Group: String,
//   Directorate: String,
//   LocalBody: String,
//   Town_Munici_Village_Corp: String,
//   Habitation_Ward: String,
//   Cluster: String,
//   Latitute: Number,
//   Longitude: Number,
//   Assembly: String,
//   Parliament: String,
//   Address: String,
//   Office_Mobile: Number,
//   Office_landline: String,
//   Correspond_Mobile: Number,
//   Correspond_landline: String,
//   Email_ID: String,
//   hmName: { type: String },
//   hmEmail: { type: String },
//   hmMobile: { type: String },

//   password: String,
//   status: String,
//   otp: { type: String },
//   otpExpiry: { type: Date },
//   guideTeachers: [{
//     name: String,
//     phone: String,
//     email: { type: String, unique: true },
//     status: { type: String }
//   }],
//   submissions: [{
//     projectDetails: {
//       title: String,
//       description: String,
//       teamSize: Number,
//       problemStatement: String,
//       solution: String,
//     },
//     studentDetails: [{
//       name: String,
//       fatherName: String,
//       dateOfBirth: String,
//       gender: String,
//       community: String,
//       district: String,
//       standard: String,
//       email: String,
//       contactNumber: String
//     }],
//     bmcDetails: {
//       customerSegments: String,
//       valuePropositions: String,
//       channels: String,
//       customerRelationships: String,
//       revenueStreams: String,
//       keyResources: String,
//       keyActivities: String,
//       keyPartners: String,
//       costStructure: String
//     },
//     documentFile: {
//       filename: String,
//       contentType: String,
//       data: Buffer
//     },
//     transactionId: String,
//     paymentStatus: {
//       type: String,
//       enum: ['pending', 'successful', 'failed'],
//       default: 'pending'
//     },
//     paymentScreenshot: {
//       filename: String,
//       contentType: String,
//       data: Buffer
//     },
//     paymentAmount: Number,
//     submittedAt: Date,
//     evaluatedBy: {
//       id: { type: mongoose.Schema.Types.ObjectId, ref: 'Evaluator' },
//       name: String,
//       email: String,
//       phone: String,
//       organization: String,
//     },
//     evaluatedAt: Date,
//     evaluationStatus: String,
//     statusReason: String,
//     evaluationScores: [{
//       evaluatorName: String,
//       score: Number,
//       status: String,
//       evaluatedAt: { type: Date, default: Date.now },
//     }],
//     assignedEvaluatorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Evaluator'
//     }

//   }]
// }, {
//   timestamps: true
// });


// module.exports = mongoose.model('School', schoolSchema);



const mongoose = require('mongoose');

// Define the schema for school data
const schoolSchema = new mongoose.Schema({
  District: String,
  Block: String,
  Education_District: String,
  UDISE_Code: Number,
  School_Name: String,
  Management: String,
  Management_Type: String,
  Category: String,
  Category_Group: String,
  Directorate: String,
  LocalBody: String,
  Town_Munici_Village_Corp: String,
  Habitation_Ward: String,
  Cluster: String,
  Latitute: Number,
  Longitude: Number,
  Assembly: String,
  Parliament: String,
  Address: String,
  Office_Mobile: Number,
  Office_landline: String,
  Correspond_Mobile: Number,
  Correspond_landline: String,
  Email_ID: String,
  hmName: { type: String },
  hmEmail: { type: String },
  hmMobile: { type: String },

  password: String,
  status: String,
  otp: { type: String },
  otpExpiry: { type: Date },
  guideTeachers: [{
    name: String,
    phone: String,
    email: { type: String, unique: true },
    status: { type: String }
  }],
  submissions: [{
    projectDetails: {
      title: String,
      description: String,
      teamSize: Number,
      problemStatement: String,
      solution: String,
    },
    studentDetails: [{
      name: String,
      fatherName: String,
      dateOfBirth: String,
      gender: String,
      community: String,
      district: String,
      standard: String,
      email: String,
      contactNumber: String
    }],
    bmcDetails: {
      customerSegments: String,
      valuePropositions: String,
      channels: String,
      customerRelationships: String,
      revenueStreams: String,
      keyResources: String,
      keyActivities: String,
      keyPartners: String,
      costStructure: String
    },
    documentFile: {
      filename: String,
      contentType: String,
      data: Buffer
    },
    transactionId: String,
    paymentStatus: {
      type: String,
      enum: ['pending', 'successful', 'failed'],
      default: 'pending'
    },
    paymentAmount: Number,
    transactionStatus:String,
    submittedAt: Date,
    assignedEvaluator: String,
    evaluatedBy: String,
    evaluatedAt: Date,
    evaluationStatus: String,
    evaluationScoreStatus: String,
    statusReason: String,
    averageFilter: String,
    averageScore: String,
    evaluationScores: [{
      evaluatorName: String,
      score: Number,
      status: String,
      evaluatedAt: { type: Date, default: Date.now },
    }],
    

  }]
}, {
  timestamps: true
});


module.exports = mongoose.model('School', schoolSchema);
