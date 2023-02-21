// Initialize history array
let history = [];

// Load history from local storage
if (localStorage.getItem('history')) {
  history = JSON.parse(localStorage.getItem('history'));
  displayHistory();
}

// Function to convert temperature
function convertTemp() {
  const inputTemp = document.getElementById('input-temp').value;
  const inputUnit = document.getElementById('input-unit').value;
  const outputUnit = document.getElementById('output-unit').value;

  // Check if input temperature is valid
  if (isNaN(inputTemp) || inputTemp === '') {
    alert('Please enter a valid temperature');
    return;
  }

  let convertedTemp;
  switch (inputUnit) {
    case 'celsius':
      convertedTemp = convertFromCelsius(inputTemp, outputUnit);
      break;
    case 'fahrenheit':
      convertedTemp = convertFromFahrenheit(inputTemp, outputUnit);
      break;
    case 'kelvin':
      convertedTemp = convertFromKelvin(inputTemp, outputUnit);
      break;
    default:
      return;
  }

  document.getElementById('output-temp').value = convertedTemp.toFixed(2);

  // Add conversion to history
  const conversion = {
    inputTemp,
    inputUnit,
    outputTemp: convertedTemp,
    outputUnit,
    date: new Date()
  };
  history.push(conversion);
  saveHistory();
  displayHistory();
}

// Functions to convert temperature from Celsius
function convertFromCelsius(temp, toUnit) {
  switch (toUnit) {
    case 'celsius':
      return temp;
    case 'fahrenheit':
      return (temp * 9 / 5) + 32;
    case 'kelvin':
      return parseFloat(temp) + 273.15;
    default:
      return;
  }
}

// Functions to convert temperature from Fahrenheit
function convertFromFahrenheit(temp, toUnit) {
  switch (toUnit) {
    case 'celsius':
      return (temp - 32) * 5 / 9;
    case 'fahrenheit':
      return temp;
    case 'kelvin':
      return (temp + 459.67) * 5 / 9;
    default:
      return;
  }
}

// Functions to convert temperature from Kelvin
function convertFromKelvin(temp, toUnit) {
  switch (toUnit) {
    case 'celsius':
      return temp - 273.15;
    case 'fahrenheit':
      return (temp * 9 / 5) - 459.67;
    case 'kelvin':
      return temp;
    default:
      return;
  }
}

// Function to display conversion history
function displayHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';
  history.forEach((conversion, index) => {
    const date = new Date(conversion.date);
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'history-item');
    listItem.innerHTML = `
      <span>${conversion.inputTemp} ${conversion.inputUnit}</span>
      <span>&#x2192;</span>
      <span>${conversion.outputTemp.toFixed(2)} ${conversion.outputUnit}</span>
      <span>${date.toLocaleString()}</span>
      <button onclick="deleteItem(${index})">Delete</button>
    `;
    historyList.appendChild(listItem);
  });
}

// Function to save history to local storage
function saveHistory() {
  localStorage.setItem('history', JSON.stringify(history));
}

// Function to delete item from history
function deleteItem(index) {
  history.splice(index, 1);
  saveHistory();
  displayHistory();
}

// Function to clear entire history
function clearHistory() {
  history = [];
  saveHistory();
  displayHistory();
}
