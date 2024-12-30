const adminService = require("../services/adminService");
const mongoose = require("mongoose");
const response = require("../../handlers/Response/response");
const statusCode = require("../../handlers/Utils/statusCode");
const sendMail = require("../../handlers/Nodemailer/nodeMailer")

const Adminlogin = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await adminService.login(req.body);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: statusCode.SUCCESS_CODE, result },
      res,
      "Admin login successfully."
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
const registerAdmin = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await adminService.registerAdmin(req.body);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: statusCode.SUCCESS_CODE, result },
      res,
      "Registration successful",
      "User has been registered and is awaiting admin approval."
    );
  } catch (error) {
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

const createCandidate = async (req, res) => {
  let session;
  try {
    // Ensure only admin can create candidates
    if (req.role !== "admin") {
      return response.handleErrorResponse(
        { errorCode: 403, message: "Forbidden", displayMessage: "Access denied" },
        res
      );
    }

    session = await mongoose.startSession();
    session.startTransaction();

    const { name, email, password, mobileNumber, address } = req.body;
    const adminEmail = req.userName; // Get admin email from JWT token

    const result = await adminService.createCandidate(
      { name, email, password, mobileNumber, address, adminEmail },
      session
    );

    await session.commitTransaction();

    // Send credentials email
    const subject = "Your Account Credentials";
    const message = `<p>Hello ${name},</p><p>Your account has been created successfully. Below are your credentials:</p><ul><li>Email: ${email}</li><li>Password: ${password}</li></ul><p>Please keep this information safe.</p>`;
    await sendMail(email, subject, message);

    return response.handleSuccessResponse(
      {
        successCode: 200,
        result,
      },
      res,
      "Candidate created successfully."
    );
  } catch (error) {
    console.error(error);
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: 500, message: "Internal Server Error", displayMessage: "An error occurred while creating the candidate." },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const getCandidates = async (req, res) => {
  try {
    const adminEmail = req.userName; // Extracted from JWT by auth middleware
    const candidates = await adminService.getCandidates(adminEmail);
    return response.handleSuccessResponse(
      candidates,
      res,
      "Candidates retrieved successfully."
    );
  } catch (error) {
    console.error("Error fetching candidates by admin:", error);
    return response.handleErrorResponse(
      { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};



module.exports = {
  Adminlogin,
  registerAdmin,
  createCandidate,
  getCandidates
}
