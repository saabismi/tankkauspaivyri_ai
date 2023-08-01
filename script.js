document.addEventListener("DOMContentLoaded", function () {
    // Set the current date in the date field
    const dateInput = document.getElementById("date");
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
    dateInput.value = formattedDate;
  
    // Add event listener to the submit button
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", function (event) {
      event.preventDefault();
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
    });
  });  