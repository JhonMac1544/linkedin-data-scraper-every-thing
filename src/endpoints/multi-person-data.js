'use strict';

const { validateBody } = require('../lib/validators');
const { formatPersonProfile } = require('../lib/linkedin-formatters');

function deriveNameFromUrl(url) {
  if (!url) return 'Unknown Person';
  const match = url.match(/\/in\/([^/?#]+)/i);
  const slug = match ? match[1] : url.split('/').filter(Boolean).pop();
  if (!slug) return 'Unknown Person';
  const cleaned = slug.split(/[^\w]+/).filter(Boolean);
  if (!cleaned.length) return 'Unknown Person';
  return cleaned
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

module.exports = async function multiPersonData(body, context = {}) {
  const { logger } = context;
  validateBody('multi-person-data', body);

  const urls = body.urls || [];
  const now = Date.now();

  const results = urls.map((url) =>
    formatPersonProfile(
      {
        endpoint: 'multi-person-data',
        url,
        fullName: deriveNameFromUrl(url),
        headline: 'Profile scraped in batch mode',
        location: 'Unknown',
        about: 'Batch-scraped LinkedIn profile.',
        currentPositions: [],
        pastPositions: [],
        education: [],
        skills: [],
        followersCount: null,
        profilePictureUrl: null,
      },
      now
    )
  );

  if (logger && logger.info) {
    logger.info(`multi-person-data processed ${results.length} profiles.`);
  }

  return results;
};