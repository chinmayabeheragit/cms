const express = require("express");
const controller = require("../controllers/adminController");
const auth = require('../middleware/authMiddleware')

const router = express.Router();

router.post("/login", controller.Adminlogin);
router.post("/register",controller.registerAdmin);

router.post("/createCandidate", auth, controller.createCandidate);
router.get("/admin/candidates", auth, controller.getCandidates);
// router.delete("/admin/candidate/:id", auth.verifyAdmin, controller.deleteCandidate);

module.exports = router;
