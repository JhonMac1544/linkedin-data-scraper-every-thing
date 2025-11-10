'use strict';

const DEFAULT_TIMEOUT_MS = 15000;

async function httpRequest(url, options = {}) {
const {
method = 'GET',
headers = {},
body,
timeoutMs = DEFAULT_TIMEOUT_MS,
logger,
} = options;

const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

try {
if (logger && logger.debug) {
logger.debug(`HTTP ${method} ${url}`);
}

const response = await fetch(url, {
method,
headers: {
'Content-Type': 'application/json',
...headers,
},
body: body ? JSON.stringify(body) : undefined,
signal: controller.signal,
});

const text = await response.text();
let data;
try {
data = text ? JSON.parse(text) : null;
} catch (err) {
data = text;
}

if (!response.ok) {
const error = new Error(`HTTP ${method} ${url} failed with status ${response.status}`);
error.status = response.status;
error.responseBody = data;
throw error;
}

return data;
} catch (err) {
if (logger && logger.error) {
logger.error(`HTTP error for ${method} ${url}:`, err.message);
}
throw err;
} finally {
clearTimeout(timeoutId);
}
}

function createHttpClient(baseUrl, logger) {
const base = baseUrl ? baseUrl.replace(/\/+$/, '') : '';

return {
async get(path, options = {}) {
const url = base ? `${base}${path}` : path;
return httpRequest(url, { ...options, method: 'GET', logger });
},
async post(path, body, options = {}) {
const url = base ? `${base}${path}` : path;
return httpRequest(url, { ...options, method: 'POST', body, logger });
},
};
}

module.exports = {
httpRequest,
createHttpClient,
};