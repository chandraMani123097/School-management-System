/* =========================
   ENTERPRISE API LAYER (MOCK)
   READY FOR BACKEND INTEGRATION
========================= */

const API = {
  get(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  },

  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  generateId() {
    return "ID_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
  },
};
