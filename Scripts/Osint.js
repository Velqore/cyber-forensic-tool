const {NUMVERIFY,HUNTER } = require('./Api.js') 
async function traceData({ name, email, phone }) {
  let results = {};
  
  if (email) {
    results.emailValidation = await validateEmail(email);
    results.socialMedia = await getSocialMediaProfiles(email);
  }
  
  if (phone) {
    results.phoneInfo = await validatePhoneNumber(phone);
  }

  if (name) {
    results.nameSearch = await searchPublicRecords(name);
  }

  return results;
}

async function validateEmail(email) {
  // Example API for email validation
  return fetch(`${HUNTER}`)
    .then((response) => response.json());
}

async function validatePhoneNumber(phone) {
  // Example API for phone validation
  return fetch(`${NUMVERIFY}`)
    .then((response) => response.json());
}

async function getSocialMediaProfiles(email) {
  // Simulated result
  return { profiles: ['LinkedIn: example', 'Twitter: example'] };
}

async function searchPublicRecords(name) {
  // Simulated result
  return { records: ['Public Record 1', 'Public Record 2'] };
}

module.exports = traceData;
