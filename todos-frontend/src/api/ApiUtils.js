// @ts-check

/**
 * @param {string} endpoint
 * @returns {Promise<object>}
 */
async function getJson(endpoint) {
  const response = await fetch(endpoint);
  return response.json();
}

/**
 * @param {string} endpoint
 * @param {object} payload
 * @returns {Promise<object>}
 */
async function postJson(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

const ApiUtils = {
  getJson,
  postJson,
};

export default ApiUtils;
