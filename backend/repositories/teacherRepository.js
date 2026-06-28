const Teacher = require("../models/Teacher");

const teacherRepository = {
  addTeacher: async (data) => {
    return await Teacher.create(data);
  },

  getAllTeachers: async () => {
    return await Teacher.findAllActive();
  },

  getTeacherById: async (id) => {
    return await Teacher.findById(id);
  },

  updateTeacherData: async (id, data) => {
    return await Teacher.update(id, data);
  },

  deleteTeacherLogically: async (id) => {
    return await Teacher.softDelete(id);
  },
};

module.exports = teacherRepository;
