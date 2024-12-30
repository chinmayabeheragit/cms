const candidateQuery = require("../queries/candidateQuery");
const generateAuthToken = require("../../handlers/Utils/generateToken");
const customException = require("../../handlers/Exception/customException");
const StatusCode = require("../../handlers/Utils/statusCode");

const login = async (body) => {
  try {
    const { email, password } = body;
    const user = await candidateQuery.findByEmail(email);

    if (!user || user.password !== password) {
      throw customException.error(
        StatusCode.UNAUTHORIZED,
        null,
        "Invalid Credentials"
      );
    }

    const role = user.role;
    const token = generateAuthToken.generateAuthToken(email, role);

    return { role, token };
  } catch (error) {
    throw error;
  }
};

const getCandidateDetails = async (candidateEmail) => {
  try {
    return await candidateQuery.getCandidateDetails(candidateEmail);
  } catch (error) {
    throw error;
  }
};


const uploadFilesService = async (candidateEmail, profilePicture, resume) => {
  const updates = {};

  if (profilePicture) {
    updates.profilePicture = profilePicture.location; // S3 URL
  }

  if (resume) {
    updates.resume = resume.location; // S3 URL
  }

  const updatedCandidate = await candidateQuery.updateCandidateFilesQuery(candidateEmail, updates);

  return updatedCandidate;
};


module.exports = { login,
  getCandidateDetails,
  uploadFilesService
 };
