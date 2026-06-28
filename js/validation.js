// =====================================
// VALIDATION.JS
// Form Validation Functions
// =====================================

const Validation = {
  // Required Field Validation
  isRequired(value) {
    return value.trim() !== "";
  },

  // Name Validation
  isValidName(name) {
    const regex = /^[A-Za-z\s]{3,50}$/;
    return regex.test(name);
  },

  // Phone Number Validation
  isValidPhone(phone) {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone);
  },

  // Email Validation
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  // Number Validation
  isNumber(value) {
    return !isNaN(value) && value !== "";
  },

  // Fee Validation
  isValidFee(amount) {
    return this.isNumber(amount) && Number(amount) >= 0;
  },

  // Date Validation
  isValidDate(date) {
    return !isNaN(Date.parse(date));
  },

  // Minimum Length Validation
  minLength(value, length) {
    return value.trim().length >= length;
  },

  // Maximum Length Validation
  maxLength(value, length) {
    return value.trim().length <= length;
  },
};
