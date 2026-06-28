const Storage = {
  /* =========================
       STUDENTS
    ========================= */

  getStudents: () => {
    return JSON.parse(localStorage.getItem("students")) || [];
  },

  saveStudents: (data) => {
    localStorage.setItem("students", JSON.stringify(data));
  },

  /* =========================
       COURSES
    ========================= */

  getCourses: () => {
    return JSON.parse(localStorage.getItem("courses")) || [];
  },

  saveCourses: (data) => {
    localStorage.setItem("courses", JSON.stringify(data));
  },
};
