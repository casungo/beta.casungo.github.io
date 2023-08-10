// language.js

// Function to determine the user's preferred language code
function getPreferredLanguageCode() {
  const supportedLanguageCodes = new Set(["en", "it"]);
  const userLanguageCodes = [navigator.language, ...navigator.languages];
  for (const languageCode of userLanguageCodes) {
    if (supportedLanguageCodes.has(languageCode)) {
      return languageCode;
    }
  }
  return supportedLanguageCodes.values().next().value; // return the first supported language code as default
}

// Function to set the preferred language code
function setPreferredLanguageCode(languageCode) {
  localStorage.language = languageCode;
  selectLanguageCode(languageCode); // call selectLanguageCode function after setting the preferred language code
}

// Function to load the JSON file
async function loadJSON() {
  try {
    const response = await fetch("../lang.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Function to display the value based on the user's language preference
function displayValues(data) {
  const preferredLanguageCode = getPreferredLanguageCode();
  const elements = {};

  // Create a mapping between property IDs and their corresponding elements
  for (const prop in data) {
    elements[prop] = document.getElementById(prop);
  }

  // Iterate over the properties of the data object and update the corresponding elements
  for (const prop in data) {
    const value = data[prop][preferredLanguageCode] || data[prop].en; // Use the preferred language if available, otherwise default to English
    const element = elements[prop];
    if (element) {
      element.innerHTML = value;
    } else {
      console.error(`Element with ID ${prop} not found`);
    }
  }
}

// Function to handle language selection
function selectLanguageCode(languageCode) {
  setPreferredLanguageCode(languageCode);
  loadJSON().then(displayValues);
}

// Call the loadJSON function to retrieve the JSON data and display values
loadJSON().then(displayValues);
