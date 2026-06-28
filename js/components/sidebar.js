// =====================================
// SIDEBAR.JS
// Sidebar Navigation Controller
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".menu-link");
  const sections = document.querySelectorAll(".content-section");

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetSection = link.dataset.section;

      // Remove active class from all menu links
      menuLinks.forEach((item) => {
        item.classList.remove("active");
      });

      // Add active class to clicked link
      link.classList.add("active");

      // Hide all sections
      sections.forEach((section) => {
        section.classList.remove("active");
        section.style.display = "none";
      });

      // Show selected section
      const selectedSection = document.getElementById(
        `${targetSection}-section`,
      );

      if (selectedSection) {
        selectedSection.style.display = "block";
        selectedSection.classList.add("active");
      }
    });
  });
});
