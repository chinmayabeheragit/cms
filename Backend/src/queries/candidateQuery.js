const Candidate = require("../models/Candidate");

const findByEmail = async (email) => {
  try {
    const user = await Candidate.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { findByEmail };
