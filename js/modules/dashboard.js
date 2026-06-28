function initDashboard() {
  const students = API.get("students");
  const courses = API.get("courses");

  const content = document.getElementById("content");

  content.innerHTML = `
        <div class="grid grid-4">

            <div class="card">
                <h3>Total Students</h3>
                <p>${students.length}</p>
            </div>

            <div class="card">
                <h3>Total Courses</h3>
                <p>${courses.length}</p>
            </div>

            <div class="card">
                <h3>Active Students</h3>
                <p>${students.length}</p>
            </div>

            <div class="card">
                <h3>Attendance Rate</h3>
                <p>${calculateAttendance()}%</p>
            </div>

        </div>

        <div class="card mt-20">
            <h2>System Overview</h2>
            <p>Enterprise School ERP Dashboard Running Successfully 🚀</p>
        </div>
    `;
}

function calculateAttendance() {
  return 92; // placeholder (we will upgrade later)
}
