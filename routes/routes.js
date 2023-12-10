const express = require("express");
const studentController = require("../src/student/studentController");

const router = express.Router();

router.post("/create", studentController.createStudentControllerFn);

module.exports = router;
