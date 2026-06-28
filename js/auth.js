const ADMIN = {
  email: "admin@school.com",
  password: "admin123",
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email === ADMIN.email && password === ADMIN.password) {
        localStorage.setItem("loggedIn", "true");

        window.location.href = "Dashboard.html";
      } else {
        alert("Invalid Email or Password");
      }
    });
  }
});
