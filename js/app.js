/* =========================
   AUTH CHECK
========================= */

function checkAuth() {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
  }
}

/* =========================
   GLOBAL STATE (PRO LEVEL)
========================= */

const AppState = {
  currentPage: "dashboard",
};

/* =========================
   INIT APP
========================= */

document.addEventListener("DOMContentLoaded", () => {
  checkAuth();

  loadPage("dashboard");

  setupLogout();
  setupSidebar();
  setupMobileSidebar();
});

/* =========================
   PAGE LOADER (PRO)
========================= */

async function loadPage(page) {
  const content = document.getElementById("content");
  if (!content) return;

  AppState.currentPage = page;

  try {
    const res = await fetch(`pages/${page}-section.html`);
    const html = await res.text();

    content.innerHTML = html;

    initModule(page);
  } catch (err) {
    content.innerHTML = "<h3>Error loading page</h3>";
    console.error(err);
  }
}

/* =========================
   MODULE INITIALIZER
========================= */

function initModule(page) {
  const modules = {
    dashboard: typeof initDashboard === "function" && initDashboard,
    students: typeof initStudents === "function" && initStudents,
    courses: typeof initCourses === "function" && initCourses,
    attendance: typeof initAttendance === "function" && initAttendance,
    fees: typeof initFees === "function" && initFees,
    reports: typeof initReports === "function" && initReports,
  };

  if (modules[page]) modules[page]();
}

/* =========================
   NAVIGATION (GLOBAL)
========================= */

function navigate(page) {
  loadPage(page);
  setActiveMenu(page);
}

window.navigate = navigate;

/* =========================
   ACTIVE MENU
========================= */

function setActiveMenu(page) {
  document
    .querySelectorAll(".sidebar ul li")
    .forEach((li) => li.classList.remove("active"));

  const active = document.querySelector(`[data-page="${page}"]`);

  if (active) active.classList.add("active");
}

/* =========================
   LOGOUT
========================= */

function setupLogout() {
  const btn = document.getElementById("logoutBtn");

  if (btn) {
    btn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
    });
  }
}

/* =========================
   SIDEBAR TOGGLE (DESKTOP)
========================= */

function setupSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const btn = document.querySelector(".menu-btn");

  if (!sidebar || !btn) return;

  btn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}

/* =========================
   MOBILE OVERLAY SIDEBAR
========================= */

function setupMobileSidebar() {
  const sidebar = document.querySelector(".sidebar");

  const overlay = document.createElement("div");
  overlay.className = "sidebar-overlay";

  document.body.appendChild(overlay);

  const btn = document.querySelector(".menu-btn");

  if (btn) {
    btn.addEventListener("click", () => {
      sidebar.classList.add("open");
      overlay.classList.add("active");
    });
  }

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
  });
}
