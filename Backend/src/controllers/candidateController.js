const CandidateService = require("../services/candidateService");
const mongoose = require("mongoose");
const response = require("../../handlers/Response/response");
const StatusCode = require("../../handlers/Utils/statusCode");

const CandidateLogin = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await CandidateService.login(req.body);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Candidate login successfully."
    );
  } catch (error) {
    console.log(error);
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

module.exports = { CandidateLogin };
