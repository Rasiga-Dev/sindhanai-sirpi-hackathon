import mongoose from 'mongoose';

const draftSchema = new mongoose.Schema({
  udiseCode: { 
    type: String, 
    required: true,
    index: true // Add index for faster lookups
  },
  guideTeacher: String,
  projectDetails: {
    teamSize: Number,
    ideaTitle: String,
    ideaDescription: String,
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
  currentStep: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add TTL index to auto-delete drafts after 7 days of inactivity
draftSchema.index({ lastUpdated: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

export default mongoose.model('Draft', draftSchema);