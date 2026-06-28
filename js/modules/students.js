/**
 * School ERP - Student Module Integration Engine
 * Handles CRUD operations with the backend APIs
 */

const API_BASE_URL = "http://localhost:5000/api/students";

// Retrieve auth token from localStorage (saved during login phase)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

document.addEventListener("DOMContentLoaded", () => {
  initStudentModule();
});

function initStudentModule() {
  loadStudents();
  setupFormListeners();
}

/**
 * Fetch and display all active student records
 */
async function loadStudents() {
  const tableBody = document.getElementById("studentTableBody");
  if (!tableBody) return;

  try {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px;">Loading student records...</td></tr>`;

    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.message || "Failed to fetch student metrics.");

    tableBody.innerHTML = ""; // Clear prior rows

    if (data.data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:#64748b;">No students found matching current criteria.</td></tr>`;
      return;
    }

    data.data.forEach((student) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td><strong>${student.admission_no || student.id}</strong></td>
                <td>${student.first_name} ${student.last_name}</td>
                <td>${student.class_name || "N/A"}</td>
                <td>${student.roll_no || "N/A"}</td>
                <td><span class="status-badge active">Active</span></td>
                <td>
                    <button class="edit-btn" onclick="openEditStudentModal(${student.id})"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" onclick="handleDeleteStudent(${student.id})"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("ERP Error:", error);
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#ef4444; padding:20px;">Error: ${error.message}</td></tr>`;
  }
}

/**
 * Intercept form submit and divert execution paths for Create vs Update
 */
function setupFormListeners() {
  const studentForm = document.getElementById("studentForm");
  if (!studentForm) return;

  studentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentId = document.getElementById("studentIdField").value;
    const formData = {
      first_name: document.getElementById("firstName").value,
      last_name: document.getElementById("lastName").value,
      email: document.getElementById("studentEmail").value,
      phone: document.getElementById("studentPhone").value,
      class_id: document.getElementById("studentClass").value,
      roll_no: document.getElementById("studentRoll").value,
    };

    const isEditMode = !!studentId;
    const targetUrl = isEditMode
      ? `${API_BASE_URL}/${studentId}`
      : API_BASE_URL;
    const targetMethod = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(targetUrl, {
        method: targetMethod,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(
          result.message || "Operation failed execution profiles.",
        );

      alert(
        isEditMode
          ? "Student record updated successfully!"
          : "New student registered successfully!",
      );
      closeStudentModal();
      loadStudents(); // Refresh data grid
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
}

/**
 * Fetch single student data details and fill the input forms
 */
window.openEditStudentModal = async function (id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    const result = await response.json();

    if (!response.ok)
      throw new Error(
        result.message || "Failed to locate student data payload.",
      );

    const student = result.data;

    // Hydrate DOM items
    document.getElementById("modalTitle").innerText = "Modify Student Profile";
    document.getElementById("studentIdField").value = student.id;
    document.getElementById("firstName").value = student.first_name;
    document.getElementById("lastName").value = student.last_name;
    document.getElementById("studentEmail").value = student.email || "";
    document.getElementById("studentPhone").value = student.phone || "";
    document.getElementById("studentClass").value = student.class_id || "";
    document.getElementById("studentRoll").value = student.roll_no || "";

    document.getElementById("studentModalOverlay").classList.add("open");
  } catch (error) {
    alert(error.message);
  }
};

/**
 * Handle Soft-Delete implementation
 */
window.handleDeleteStudent = async function (id) {
  if (
    !confirm(
      "Are you certain you wish to mark this student record as inactive?",
    )
  )
    return;

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const result = await response.json();

    if (!response.ok)
      throw new Error(
        result.message || "Delete transaction aborted on server layers.",
      );

    alert("Student record softly deleted.");
    loadStudents();
  } catch (error) {
    alert(error.message);
  }
};

window.closeStudentModal = function () {
  const overlay = document.getElementById("studentModalOverlay");
  if (overlay) overlay.classList.remove("open");
  const form = document.getElementById("studentForm");
  if (form) form.reset();
  const idField = document.getElementById("studentIdField");
  if (idField) idField.value = "";
  const title = document.getElementById("modalTitle");
  if (title) title.innerText = "Register New Student";
};
