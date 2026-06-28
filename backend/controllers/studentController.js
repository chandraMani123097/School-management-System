const studentService = require("../services/studentService");

const response = require("../utils/apiResponse");

const { validateStudent } = require("../validators/studentValidator");

exports.getStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();

    return response.success(res, "Students fetched successfully", students);
  } catch (err) {
    return response.error(res, err.message);
  }
};

exports.createStudent = async (req, res) => {
  try {
    const errors = validateStudent(req.body);

    if (errors.length) {
      return response.error(res, errors.join(", "), 400);
    }

    await studentService.createStudent(req.body);

    return response.success(res, "Student added successfully", null, 201);
  } catch (err) {
    return response.error(res, err.message);
  }
};
exports.getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id);

    if (!student) {
      return response.error(res, "Student not found", 404);
    }

    return response.success(res, "Student fetched successfully", student);
  } catch (err) {
    return response.error(res, err.message);
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const errors = validateStudent(req.body);

    if (errors.length) {
      return response.error(res, errors.join(", "), 400);
    }

    await studentService.updateStudent(req.params.id, req.body);

    return response.success(res, "Student updated successfully");
  } catch (err) {
    return response.error(res, err.message);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await studentService.deleteStudent(req.params.id);

    return response.success(res, "Student deleted successfully");
  } catch (err) {
    return response.error(res, err.message);
  }
};
