const API_KEYS = {
  NUMVERIFY: "e1ed7a2be9b9d72b6adb1f952e856235",
  HUNTER: "12a2bb366a4ed466a04f9a5adc86c0dcf425c738",
  TWITTER_BEARER: "YOUR_TWITTER_API_KEY"
};

/**
 * Validate a phone number using the Numverify API.
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {Promise<Object>} - The response data from Numverify.
 */
async function validatePhoneNumber(phoneNumber) {
  const url = `https://apilayer.net/api/validate?access_key=${API_KEYS.NUMVERIFY}&number=${encodeURIComponent(phoneNumber)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to validate phone number");
    return await response.json();
  } catch (error) {
    console.error("Error validating phone number:", error);
    throw error;
  }
}

/**
 * Validate an email address using the Hunter API.
 * @param {string} email - The email address to validate.
 * @returns {Promise<Object>} - The response data from Hunter.
 */
async function validateEmail(email) {
  const url = `https://api.hunter.io/v2/email-verifier?email=${encodeURIComponent(email)}&api_key=${API_KEYS.HUNTER}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to validate email");
    return await response.json();
  } catch (error) {
    console.error("Error validating email:", error);
    throw error;
  }
}

/**
 * Search for public social media profiles using a hypothetical API.
 * @param {string} query - Name or email to search.
 * @returns {Promise<Object>} - Social media profile data.
 */
async function searchSocialMedia(query) {
  const url = `https://api.socialsearch.com/search?q=${encodeURIComponent(query)}&api_key=${API_KEYS.TWITTER_BEARER}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEYS.TWITTER_BEARER}`
      }
    });
    if (!response.ok) throw new Error("Failed to fetch social media data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching social media data:", error);
    throw error;
  }
}

/**
 * Wrapper function to handle tracing.
 * @param {Object} params - User input (name, email, phone).
 * @returns {Promise<Object>} - Aggregated results from all APIs.
 */
async function traceData({ name, email, phone }) {
  const results = {};

  try {
    if (phone) {
      results.phoneValidation = await validatePhoneNumber(phone);
    }

    if (email) {
      results.emailValidation = await validateEmail(email);
      results.socialMedia = await searchSocialMedia(email);
    }

    if (name) {
      results.nameSearch = await searchSocialMedia(name); // Using social media for name search
    }

    return results;
  } catch (error) {
    console.error("Error tracing data:", error);
    throw error;
  }
}

// Export functions for external usage
export { validatePhoneNumber, validateEmail, searchSocialMedia, traceData };
