const express = require("express");
const controller = require("../controllers/candidateController");
const auth = require('../middleware/authMiddleware');
const upload = require("../middleware/fileUpload");

const router = express.Router();

router.post("/candidate-login", controller.CandidateLogin);
router.get("/candidate/viewAccount", auth, controller.viewCandidateDetails);
router.post(
    "/candidate/uploadFiles",
    auth, // Authenticate candidate
    upload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]),
    controller.uploadFiles
  );

module.exports = router;
