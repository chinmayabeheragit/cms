const {candidate} = require("../models/Candidate");

const findByEmail = async (email) => {
  try {
    const user = await candidate.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};

const getCandidateDetails = async (candidateEmail) => {
  try {
    return await candidate.findOne({ email: candidateEmail }).exec();
  } catch (error) {
    throw error;
  }
};


const updateCandidateFilesQuery = async (candidateEmail, updates) => {
  const updatedCandidate = await candidate.findOneAndUpdate(
    { email: candidateEmail },
    { $set: updates },
    { new: true } 
  );

  if (!updatedCandidate) {
    throw new Error("Candidate not found");
  }

  return updatedCandidate;
};


module.exports = { findByEmail,
  getCandidateDetails,
  updateCandidateFilesQuery
 };
