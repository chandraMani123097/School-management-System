const studentRepository = require("../repositories/studentRepository");

class StudentService {
  async getAllStudents(search, sort, order, limit, page) {
    const offset = (page - 1) * limit;

    return await studentRepository.getAll(search, sort, order, limit, offset);
  }

  async getStudentById(id) {
    const student = await studentRepository.getById(id);

    if (!student) {
      throw new Error("Student not found");
    }

    return student;
  }

  async createStudent(studentData) {
    return await studentRepository.create(studentData);
  }

  async updateStudent(id, studentData) {
    const student = await studentRepository.getById(id);

    if (!student) {
      throw new Error("Student not found");
    }

    return await studentRepository.update(id, studentData);
  }

  async deleteStudent(id) {
    const student = await studentRepository.getById(id);

    if (!student) {
      throw new Error("Student not found");
    }

    return await studentRepository.softDelete(id);
  }
}

module.exports = new StudentService();
