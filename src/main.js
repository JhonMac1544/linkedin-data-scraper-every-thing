'use strict';

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { validateBody, assertEndpoint } = require('./lib/validators');
const defaults = require('./config/defaults.json');
const endpointsMap = require('../config/endpoints-map.json');
const { createHttpClient } = require('./lib/httpClient');

function createLogger() {
const levels = ['debug', 'info', 'warn', 'error'];
const envLevel = (process.env.LOG_LEVEL || defaults.logLevel || 'info').toLowerCase();
const minIndex = levels.indexOf(envLevel === 'verbose' ? 'debug' : envLevel);
const enabled = (level) => levels.indexOf(level) >= (minIndex === -1 ? 1 : minIndex);

const make = (level) => (...args) => {
if (!enabled(level)) return;
const prefix = `[${new Date().toISOString()}] [${level.toUpperCase()}]`;
// eslint-disable-next-line no-console
console[level === 'debug' ? 'log' : level](prefix, ...args);
};

return {
debug: make('debug'),
info: make('info'),
warn: make('warn'),
error: make('error'),
};
}

function loadEndpointModule(endpoint) {
const moduleName = endpointsMap[endpoint];
if (!moduleName) {
throw new Error(`No handler configured for endpoint "${endpoint}". Check config/endpoints-map.json.`);
}
const modulePath = path.join(__dirname, 'endpoints', `${moduleName}.js`);
// eslint-disable-next-line import/no-dynamic-require, global-require
return require(modulePath);
}

async function runScraper({ endpoint, body }) {
const logger = createLogger();

assertEndpoint(endpoint, endpointsMap);

let parsedBody = body;
if (typeof body === 'string') {
try {
parsedBody = JSON.parse(body);
} catch (err) {
throw new Error(`Body must be valid JSON string when passed as string: ${err.message}`);
}
} else if (!parsedBody || typeof parsedBody !== 'object') {
throw new Error('Body must be an object or JSON string.');
}

validateBody(endpoint, parsedBody);

const baseUrl = process.env.SCRAPER_BASE_URL || '';
const httpClient = createHttpClient(baseUrl, logger);

const handler = loadEndpointModule(endpoint);
const context = {
logger,
httpClient,
defaults,
};

logger.info(`Running endpoint "${endpoint}"`);
const result = await handler(parsedBody, context);
logger.info(`Endpoint "${endpoint}" completed with ${Array.isArray(result) ? result.length : 1} result item(s).`);

return result;
}

module.exports = {
runScraper,
};

if (require.main === module) {
(async () => {
const logger = createLogger();
try {
const args = process.argv.slice(2);
let inputPath = null;
let endpoint = null;
let bodyString = null;

for (let i = 0; i < args.length; i += 1) {
const arg = args[i];
if (arg === '--input' && args[i + 1]) {
inputPath = args[i + 1];
} else if (arg === '--endpoint' && args[i + 1]) {
endpoint = args[i + 1];
} else if (arg === '--body' && args[i + 1]) {
bodyString = args[i + 1];
}
}

let payload;
if (inputPath) {
const resolved = path.resolve(process.cwd(), inputPath);
const raw = fs.readFileSync(resolved, 'utf8');
payload = JSON.parse(raw);
} else if (endpoint && bodyString) {
payload = {
endpoint,
body: JSON.parse(bodyString),
};
} else {
const defaultPath = path.join(__dirname, '..', 'data', 'inputs.sample.json');
logger.info(`No CLI arguments provided, falling back to sample input at ${defaultPath}`);
const raw = fs.readFileSync(defaultPath, 'utf8');
payload = JSON.parse(raw);
}

const result = await runScraper({
endpoint: payload.endpoint,
body: payload.body,
});
// eslint-disable-next-line no-console
console.log(JSON.stringify(result, null, 2));
} catch (err) {
logger.error('Fatal error running scraper:', err.message);
// eslint-disable-next-line no-console
console.error(err.stack);
process.exit(1);
}
})();
}