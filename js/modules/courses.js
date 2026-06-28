function initCourses() {
  const container = document.getElementById("coursesContainer");

  render();

  document.getElementById("addCourseBtn").onclick = () => openForm();

  function render() {
    const courses = Storage.getCourses();

    let html = "<div class='grid grid-3'>";

    courses.forEach((c, index) => {
      html += `
            <div class="card">

                <h3>${c.name}</h3>

                <div class="mt-10">

                    <button class="btn-edit" onclick="editCourse(${index})">Edit</button>

                    <button class="btn-delete" onclick="deleteCourse(${index})">Delete</button>

                </div>

            </div>
            `;
    });

    html += "</div>";

    container.innerHTML = html;
  }

  function openForm(course = null, index = null) {
    const isEdit = course !== null;

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.style.display = "flex";

    modal.innerHTML = `
        <div class="modal-content">

            <div class="modal-header">
                <h2>${isEdit ? "Edit Course" : "Add Course"}</h2>
                <span class="close-modal">&times;</span>
            </div>

            <div class="input-group">
                <label>Course Name</label>
                <input id="name" value="${course?.name || ""}">
            </div>

            <div class="form-actions">
                <button class="btn-save">Save</button>
                <button class="btn-cancel">Cancel</button>
            </div>

        </div>
        `;

    document.body.appendChild(modal);

    modal.querySelector(".close-modal").onclick = modal.querySelector(
      ".btn-cancel",
    ).onclick = () => modal.remove();

    modal.querySelector(".btn-save").onclick = () => {
      const name = modal.querySelector("#name").value;

      if (!name) return;

      let courses = Storage.getCourses();

      if (isEdit) {
        courses[index].name = name;
      } else {
        courses.push({ name });
      }

      Storage.saveCourses(courses);

      modal.remove();
      render();
    };
  }

  window.editCourse = function (index) {
    const courses = Storage.getCourses();
    openForm(courses[index], index);
  };

  window.deleteCourse = function (index) {
    let courses = Storage.getCourses();
    courses.splice(index, 1);
    Storage.saveCourses(courses);
    render();
  };
}
