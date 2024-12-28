const express = require("express");
const controller = require("../controllers/candidateController");

const router = express.Router();

router.post("/candidate-login", controller.CandidateLogin);

module.exports = router;
