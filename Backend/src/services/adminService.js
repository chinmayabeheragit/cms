const adminQuery = require("../queries/adminQuery");
const generateAuthToken = require("../../handlers/Utils/generateToken");
const customException = require("../../handlers/Exception/customException");
const StatusCode = require("../../handlers/Utils/statusCode");
const bcrypt = require('bcrypt');


const login = async (body) => {
  try {
    const { email, password } = body;
    const user = await adminQuery.findByEmail(email);

    if (!user) {
      throw customException.error(
        StatusCode.UNAUTHORIZED,
        null,
        "Invalid Credentials"
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
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

const registerAdmin = async ({name, email, password}) => {
  try {
    const existingUser = await adminQuery.findByEmail(email);
    if (existingUser) {
      throw customException.error(
        StatusCode.DATA_ALREADY_EXISTS,
        null,
        "User already exists"
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const body = { name, email, password: hashPassword };
    const user = await adminQuery.createAdmin(body);
    return user;
  } catch (error) {
    throw error;
  }
}

const createCandidate = async ({ name, email, password, mobileNumber, address, adminEmail }, session) => {
  try {
    const candidateData = {
      name,
      email,
      password,
      mobileNumber,
      address,
      role: "candidate", // Explicitly set role
      createdBy: adminEmail, // Track admin who created this candidate
    };
    const result = await adminQuery.createCandiadate(candidateData, session);
    return result;
  } catch (error) {
    throw error;
  }
};

const getCandidates = async (adminEmail) => {
  try {
    return await adminQuery.getCandidates(adminEmail);
  } catch (error) {
    throw error;
  }
};


const deleteCandidate = async (candidateId, session) => {
  try {
    const result = await adminQuery.deleteCandidateById(candidateId, session);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
   login,
   registerAdmin,
   createCandidate,
   getCandidates,
   deleteCandidate
 };
