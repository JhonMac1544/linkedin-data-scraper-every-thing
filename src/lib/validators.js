'use strict';

const fs = require('fs');
const path = require('path');

let inputSchemaCache = null;

function loadInputSchema() {
if (inputSchemaCache) return inputSchemaCache;
const schemaPath = path.join(__dirname, '..', '..', 'config', 'input-schema.json');
const raw = fs.readFileSync(schemaPath, 'utf8');
inputSchemaCache = JSON.parse(raw);
return inputSchemaCache;
}

function assertEndpoint(endpoint, endpointsMap) {
if (!endpoint || typeof endpoint !== 'string') {
throw new Error('Endpoint must be a non-empty string.');
}
if (!endpointsMap[endpoint]) {
const known = Object.keys(endpointsMap).sort().join(', ');
throw new Error(`Unknown endpoint "${endpoint}". Known endpoints: ${known}`);
}
}

function validateBody(endpoint, body) {
const schema = loadInputSchema();
const def = schema[endpoint];
if (!def) {
// No schema defined, assume free-form body
return;
}

const errors = [];

if (def.required && Array.isArray(def.required)) {
def.required.forEach((field) => {
if (body[field] === undefined || body[field] === null || body[field] === '') {
errors.push(`Missing required field "${field}"`);
}
});
}

if (errors.length) {
const error = new Error(
`Invalid body for endpoint "${endpoint}": ${errors.join('; ')}`
);
error.code = 'VALIDATION_ERROR';
throw error;
}
}

module.exports = {
loadInputSchema,
assertEndpoint,
validateBody,
};