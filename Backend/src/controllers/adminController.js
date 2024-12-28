const adminService = require("../services/adminService");
const mongoose = require("mongoose");
const response = require("../../handlers/Response/response");
const statusCode = require("../../handlers/Utils/statusCode");

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
      console.log("gggg",req.body);
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



module.exports = { 
    Adminlogin,
    registerAdmin,
 };
