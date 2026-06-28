const db = require("../config/db");

class StudentRepository {
  // ===============================
  // Get All Students
  // ===============================
  async getAll(
    search = "",
    sort = "id",
    order = "ASC",
    limit = 10,
    offset = 0,
  ) {
    const allowedSort = [
      "id",
      "admission_no",
      "first_name",
      "class_name",
      "status",
      "created_at",
    ];

    if (!allowedSort.includes(sort)) {
      sort = "id";
    }

    order = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    let sql = `
            SELECT *
            FROM students
            WHERE deleted_at IS NULL
        `;

    const params = [];

    if (search) {
      sql += `
                AND (
                    admission_no LIKE ?
                    OR first_name LIKE ?
                    OR last_name LIKE ?
                    OR phone LIKE ?
                    OR email LIKE ?
                )
            `;

      const keyword = `%${search}%`;

      params.push(keyword, keyword, keyword, keyword, keyword);
    }

    sql += ` ORDER BY ${sort} ${order}`;

    sql += ` LIMIT ? OFFSET ?`;

    params.push(Number(limit));
    params.push(Number(offset));

    const [rows] = await db.execute(sql, params);

    return rows;
  }

  // ===============================
  // Total Students
  // ===============================
  async count(search = "") {
    let sql = `
            SELECT COUNT(*) AS total
            FROM students
            WHERE deleted_at IS NULL
        `;

    const params = [];

    if (search) {
      sql += `
                AND (
                    admission_no LIKE ?
                    OR first_name LIKE ?
                    OR last_name LIKE ?
                    OR phone LIKE ?
                    OR email LIKE ?
                )
            `;

      const keyword = `%${search}%`;

      params.push(keyword, keyword, keyword, keyword, keyword);
    }

    const [rows] = await db.execute(sql, params);

    return rows[0].total;
  }

  // ===============================
  // Student By ID
  // ===============================
  async getById(id) {
    const [rows] = await db.execute(
      `
            SELECT *
            FROM students
            WHERE id = ?
            AND deleted_at IS NULL
            `,
      [id],
    );

    return rows[0];
  }

  // ===============================
  // Admission Exists
  // ===============================
  async admissionExists(admissionNo) {
    const [rows] = await db.execute(
      `
            SELECT id
            FROM students
            WHERE admission_no = ?
            LIMIT 1
            `,
      [admissionNo],
    );

    return rows.length > 0;
  }

  // ===============================
  // Create Student
  // ===============================
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
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    const [result] = await db.execute(sql, [
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
      student.status,
    ]);

    return result;
  }

  // ===============================
  // Update Student
  // ===============================
  async update(id, student) {
    const sql = `
            UPDATE students
            SET

                admission_no=?,
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

    const [result] = await db.execute(sql, [
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
      student.status,
      id,
    ]);

    return result;
  }

  // ===============================
  // Soft Delete
  // ===============================
  async softDelete(id) {
    const [result] = await db.execute(
      `
            UPDATE students
            SET deleted_at = NOW()
            WHERE id = ?
            `,
      [id],
    );

    return result;
  }

  // ===============================
  // Restore Student
  // ===============================
  async restore(id) {
    const [result] = await db.execute(
      `
            UPDATE students
            SET deleted_at = NULL
            WHERE id = ?
            `,
      [id],
    );

    return result;
  }

  // ===============================
  // Deleted Students
  // ===============================
  async getDeletedStudents() {
    const [rows] = await db.execute(
      `
            SELECT *
            FROM students
            WHERE deleted_at IS NOT NULL
            ORDER BY deleted_at DESC
            `,
    );

    return rows;
  }
}

module.exports = new StudentRepository();
