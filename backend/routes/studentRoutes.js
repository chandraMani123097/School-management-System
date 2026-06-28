const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const studentController = require("../controllers/studentController");

router.get("/", authMiddleware, studentController.getStudents);

router.get("/:id", authMiddleware, studentController.getStudentById);

router.post("/", authMiddleware, studentController.createStudent);

router.put("/:id", authMiddleware, studentController.updateStudent);

router.delete("/:id", authMiddleware, studentController.deleteStudent);

module.exports = router;
