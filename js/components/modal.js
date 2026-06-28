// =====================================
// MODAL.JS
// Reusable Modal Component
// =====================================

const Modal = {
  // Create Modal
  create(title, message, onConfirm = null) {
    // Remove existing modal if any
    const existingModal = document.getElementById("customModal");

    if (existingModal) {
      existingModal.remove();
    }

    const modalHTML = `
            <div class="modal-overlay" id="customModal">
                <div class="modal-box">

                    <div class="modal-header">
                        <h2>${title}</h2>
                    </div>

                    <div class="modal-body">
                        <p>${message}</p>
                    </div>

                    <div class="modal-footer">

                        ${
                          onConfirm
                            ? `<button id="confirmBtn" class="btn btn-success">
                                        Confirm
                                   </button>`
                            : ""
                        }

                        <button id="closeBtn" class="btn btn-danger">
                            Close
                        </button>

                    </div>

                </div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Close Button
    document.getElementById("closeBtn").addEventListener("click", () => {
      this.close();
    });

    // Confirm Button
    if (onConfirm) {
      document.getElementById("confirmBtn").addEventListener("click", () => {
        onConfirm();
        this.close();
      });
    }
  },

  // Success Modal
  success(message) {
    this.create("Success", message);
  },

  // Error Modal
  error(message) {
    this.create("Error", message);
  },

  // Confirmation Modal
  confirm(message, callback) {
    this.create("Confirmation", message, callback);
  },

  // Close Modal
  close() {
    const modal = document.getElementById("customModal");

    if (modal) {
      modal.remove();
    }
  },
};
