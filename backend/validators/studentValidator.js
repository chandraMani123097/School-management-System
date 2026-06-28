exports.validateStudent = (student) => {
  const errors = [];

  if (!student.admission_no) errors.push("Admission Number is required");

  if (!student.first_name) errors.push("First Name is required");

  if (!student.gender) errors.push("Gender is required");

  if (!student.class_name) errors.push("Class is required");

  return errors;
};
