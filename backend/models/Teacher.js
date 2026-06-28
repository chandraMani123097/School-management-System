const db = require("../config/db");

const Teacher = {
  create: async (teacherData) => {
    const query = `
            INSERT INTO teachers (first_name, last_name, email, phone, qualification, experience_years, salary)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
    const values = [
      teacherData.first_name,
      teacherData.last_name,
      teacherData.email,
      teacherData.phone,
      teacherData.qualification,
      teacherData.experience_years,
      teacherData.salary,
    ];
    const [result] = await db.execute(query, values);
    return result;
  },

  findAllActive: async () => {
    const query =
      "SELECT * FROM teachers WHERE is_deleted = 0 ORDER BY id DESC";
    const [rows] = await db.execute(query);
    return rows;
  },

  findById: async (id) => {
    const query = "SELECT * FROM teachers WHERE id = ? AND is_deleted = 0";
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },

  update: async (id, teacherData) => {
    const query = `
            UPDATE teachers 
            SET first_name = ?, last_name = ?, email = ?, phone = ?, qualification = ?, experience_years = ?, salary = ?
            WHERE id = ? AND is_deleted = 0
        `;
    const values = [
      teacherData.first_name,
      teacherData.last_name,
      teacherData.email,
      teacherData.phone,
      teacherData.qualification,
      teacherData.experience_years,
      teacherData.salary,
      id,
    ];
    const [result] = await db.execute(query, values);
    return result;
  },

  softDelete: async (id) => {
    const query =
      'UPDATE teachers SET is_deleted = 1, status = "inactive" WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    return result;
  },
};

module.exports = Teacher;
