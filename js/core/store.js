const Store = {
  state: {
    students: [],
    courses: [],
  },

  load() {
    this.state.students = API.get("students");
    this.state.courses = API.get("courses");
  },

  sync() {
    API.set("students", this.state.students);
    API.set("courses", this.state.courses);
  },
};
