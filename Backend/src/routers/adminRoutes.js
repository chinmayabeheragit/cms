const express = require("express");
const controller = require("../controllers/adminController");

const router = express.Router();

router.post("/admin/login", controller.Adminlogin);
router.post("/admin/register",controller.registerAdmin);

module.exports = router;
