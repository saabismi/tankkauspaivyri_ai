// Get the saved logs from local storage
let logs = JSON.parse(localStorage.getItem("refuelLogs")) || [];

function getLanguage() {
  return localStorage.getItem("language") || "en";
}

function saveToLocalStorage(logs) {
  localStorage.setItem("refuelLogs", JSON.stringify(logs));
}

function displayRefuelLog(logs) {
  const logBody = document.getElementById("logBody");

  // Clear the table body before adding new rows
  logBody.innerHTML = "";

  const language = getLanguage();
  const dateHeader = translations[language].date;
  const kilometersHeader = translations[language].kilometers;
  const litersHeader = translations[language].liters;
  const fuelTypeHeader = translations[language].fuelType;
  const petrolStationHeader = translations[language].petrolStation;
  const pricePerLiterHeader = translations[language].pricePerLiter;
  const totalCostHeader = translations[language].totalCost;
  const avgConsumptionHeader = translations[language].avgConsumption;

  const tableHeaders = document.createElement("tr");
  tableHeaders.innerHTML = `
    <th>${dateHeader}</th>
    <th>${kilometersHeader}</th>
    <th>${litersHeader}</th>
    <th>${fuelTypeHeader}</th>
    <th>${petrolStationHeader}</th>
    <th>${pricePerLiterHeader}</th>
    <th>${totalCostHeader}</th>
    <th>${avgConsumptionHeader}</th>
  `;
  logBody.appendChild(tableHeaders);

  logs.forEach((log) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${log.date}</td>
      <td>${log.kilometers}</td>
      <td>${log.liters}</td>
      <td>${translations[language].fuelTypes[log.fuelType]}</td>
      <td>${log.petrolStation}</td>
      <td>${log.pricePerLiter.toFixed(3)}</td>
      <td>${(log.liters * log.pricePerLiter).toFixed(2)}</td>
      <td>${(log.liters / (log.kilometers / 100)).toFixed(2)}</td>
    `;
    logBody.appendChild(newRow);
  });
}

function addRefuel(event) {
  event.preventDefault();

  const dateInput = document.getElementById("dateInput");
  const kilometersInput = document.getElementById("kilometersInput");
  const litersInput = document.getElementById("litersInput");
  const fuelTypeSelect = document.getElementById("fuelTypeSelect");
  const petrolStationInput = document.getElementById("petrolStationInput");
  const pricePerLiterInput = document.getElementById("pricePerLiterInput");

  const date = dateInput.value;
  const kilometers = parseFloat(kilometersInput.value);
  const liters = parseFloat(litersInput.value);
  const fuelType = fuelTypeSelect.value;
  const petrolStation = petrolStationInput.value;
  const pricePerLiter = parseFloat(pricePerLiterInput.value.replace(",", "."));

  if (!date || isNaN(kilometers) || isNaN(liters) || isNaN(pricePerLiter)) {
    alert("Please fill in all the fields with valid values.");
    return;
  }

  const newLog = {
    date,
    kilometers,
    liters,
    fuelType,
    petrolStation,
    pricePerLiter,
  };

  logs.push(newLog);
  saveToLocalStorage(logs);
  displayRefuelLog(logs);

  dateInput.value = "";
  kilometersInput.value = "";
  litersInput.value = "";
  fuelTypeSelect.value = "e95";
  petrolStationInput.value = "";
  pricePerLiterInput.value = "";
}

document.getElementById("refuelForm").addEventListener("submit", addRefuel);

document.getElementById("languageDropdown").addEventListener("click", toggleDropdown);

function toggleDropdown() {
  document.getElementById("languageMenu").classList.toggle("show");
}

function changeLanguage(event) {
  const newLanguage = event.target.dataset.lang;
  if (newLanguage && newLanguage !== getLanguage()) {
    localStorage.setItem("language", newLanguage);
    displayRefuelLog(logs);
    toggleDropdown();
  }
}

document.querySelectorAll(".languageOption").forEach((option) => {
  option.addEventListener("click", changeLanguage);
});

displayRefuelLog(logs);

// Set default current date for the date input field
const currentDate = new Date().toISOString().split("T")[0];
document.getElementById("dateInput").value = currentDate;