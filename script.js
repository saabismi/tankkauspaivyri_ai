document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("date");
    const submitButton = document.getElementById("submit-button");
  
    // Handle form submission when clicking the submit button
    submitButton.addEventListener("click", function (event) {
      event.preventDefault();
      handleFormSubmission();
    });
  
    // Handle form submission when pressing the "Enter" key
    dateInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleFormSubmission();
      }
    });
  
    function handleFormSubmission() {
      // Check if all required fields are filled
      if (isFormValid()) {
        // Implement the logic to handle form submission here
        // For simplicity, we'll just add a new row to the table with the form data
        const tableBody = document.querySelector("#fuel-log-table tbody");
        const newRow = tableBody.insertRow();
        const inputFields = document.querySelectorAll("#fuel-log-form input, #fuel-log-form select");
        inputFields.forEach((input, index) => {
          const cell = newRow.insertCell(index);
          cell.textContent = input.value;
        });
        // Clear the input fields after submission
        inputFields.forEach((input) => {
          input.value = "";
        });
      } else {
        alert("Please fill in all required fields.");
      }
    }
  
    function isFormValid() {
      const inputFields = document.querySelectorAll("#fuel-log-form input, #fuel-log-form select");
      for (const input of inputFields) {
        if (input.hasAttribute("required") && !input.value) {
          return false;
        }
      }
      return true;
    }
  });
  