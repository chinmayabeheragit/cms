const {Admin} = require("../models/Admin");
const {candidate} = require('../models/Candidate')

const findByEmail = async (email) => {
  try {
    const user = await Admin.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};

const createAdmin = async (body) => {
  const newAdmin = new Admin(body);
  return await newAdmin.save();
}

const createCandiadate = async (candidateData, session) => {
  try {
    const result = new candidate(candidateData)
    await result.save({session});
    return result;
  } catch (error){
    throw error
  }
}

const getCandidates = async (adminEmail) => {
  try {
    return await candidate.find({ createdBy: adminEmail }).exec();
  } catch (error) {
    throw error;
  }
};


const deleteCandidateById = async (candidateId, session) => {
  try {
    const result = await candidate.findByIdAndDelete(candidateId, { session });
    if (!result) {
      throw {
        errorCode: 404,
        message: "Candidate Not Found",
        displayMessage: "The candidate you are trying to delete does not exist.",
      };
    }
    return result;
  } catch (error) {
    throw error;
  }
};



module.exports = { 
  findByEmail,
  createAdmin,
  createCandiadate,
  getCandidates,
  deleteCandidateById
};
