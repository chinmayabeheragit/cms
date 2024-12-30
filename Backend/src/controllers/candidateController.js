const candidateService = require("../services/candidateService");
const mongoose = require("mongoose");
const response = require("../../handlers/Response/response");
const statusCode = require("../../handlers/Utils/statusCode");

const CandidateLogin = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await candidateService.login(req.body);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: statusCode.SUCCESS_CODE, result },
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
        { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const viewCandidateDetails = async (req, res) => {
  try {
    const candidateEmail = req.userName; // Extracted from JWT by auth middleware
    const candidateDetails = await candidateService.getCandidateDetails(candidateEmail);
    if (!candidateDetails) {
      return response.handleErrorResponse(
        {
          errorCode: statusCode.NOT_FOUND,
          message: "Candidate not found",
          displayMessage: "Account not found.",
        },
        res
      );
    }
    return response.handleSuccessResponse(
      candidateDetails,
      res,
      "Candidate details retrieved successfully."
    );
  } catch (error) {
    console.error("Error fetching candidate details:", error);
    return response.handleErrorResponse(
      { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};

const uploadFiles = async (req, res) => {
  try {
    const candidateEmail = req.userName; // Extracted from JWT by auth middleware
    const { profilePicture, resume } = req.files; // Extract files from the request

    const result = await candidateService.uploadFilesService(
      candidateEmail,
      profilePicture ? profilePicture[0] : null,
      resume ? resume[0] : null
    );

    return response.handleSuccessResponse(
      result,
      res,
      "Files uploaded successfully."
    );
  } catch (error) {
    console.log(error);
    return response.handleErrorResponse(
      { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};


module.exports = { CandidateLogin,
  viewCandidateDetails,
  uploadFiles
 };
