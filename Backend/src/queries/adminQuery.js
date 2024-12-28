const {Admin} = require("../models/Admin");

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

module.exports = { 
  findByEmail,
  createAdmin
};
