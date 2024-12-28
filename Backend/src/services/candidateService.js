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
    const token = generateAuthToken(email, role);

    return { role, token };
  } catch (error) {
    throw error;
  }
};

module.exports = { login };
