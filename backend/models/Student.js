const db = require("../config/db");

const Student = {
  // Get all students
  async getAll() {
    const [rows] = await db.query(
      `SELECT *
             FROM students
             ORDER BY created_at DESC`,
    );

    return rows;
  },

  // Get student by ID
  async getById(id) {
    const [rows] = await db.query(
      `SELECT *
             FROM students
             WHERE id = ?`,
      [id],
    );

    return rows[0];
  },

  // Check duplicate admission number
  async admissionExists(admissionNo) {
    const [rows] = await db.query(
      `SELECT id
             FROM students
             WHERE admission_no = ?`,
      [admissionNo],
    );

    return rows.length > 0;
  },

  // Create student
  async create(student) {
    const sql = `
        INSERT INTO students
        (
            admission_no,
            first_name,
            last_name,
            gender,
            dob,
            class_name,
            section,
            phone,
            email,
            address,
            guardian_name,
            guardian_phone,
            status
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;

    const values = [
      student.admission_no,

      student.first_name,

      student.last_name,

      student.gender,

      student.dob,

      student.class_name,

      student.section,

      student.phone,

      student.email,

      student.address,

      student.guardian_name,

      student.guardian_phone,

      student.status || "Active",
    ];

    const [result] = await db.query(sql, values);

    return result;
  },

  // Update student
  async update(id, student) {
    const sql = `
        UPDATE students
        SET
            first_name=?,
            last_name=?,
            gender=?,
            dob=?,
            class_name=?,
            section=?,
            phone=?,
            email=?,
            address=?,
            guardian_name=?,
            guardian_phone=?,
            status=?
        WHERE id=?
        `;

    const values = [
      student.first_name,

      student.last_name,

      student.gender,

      student.dob,

      student.class_name,

      student.section,

      student.phone,

      student.email,

      student.address,

      student.guardian_name,

      student.guardian_phone,

      student.status,

      id,
    ];

    const [result] = await db.query(sql, values);

    return result;
  },

  // Delete student
  async delete(id) {
    const [result] = await db.query(
      "DELETE FROM students WHERE id=?",

      [id],
    );

    return result;
  },
};

module.exports = Student;
