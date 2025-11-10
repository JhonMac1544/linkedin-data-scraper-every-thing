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

module.exports = async function personData(body, context = {}) {
  const { logger } = context;
  validateBody('person-data', body);

  const url = body.url;
  const fullName = body.fullName || deriveNameFromUrl(url);

  const now = Date.now();
  const result = formatPersonProfile(
    {
      endpoint: 'person-data',
      url,
      fullName,
      headline:
        body.headline ||
        `Professional on LinkedIn - scraped via AIO scraper`,
      location: body.location || 'Unknown',
      about:
        body.about ||
        `Profile for ${fullName} extracted from LinkedIn with a unified scraper interface.`,
      currentPositions:
        body.currentPositions ||
        [
          {
            title: 'Unknown Role',
            companyName: 'Unknown Company',
            companyId: null,
            location: 'Unknown',
            startDate: null,
          },
        ],
      pastPositions: body.pastPositions || [],
      education: body.education || [],
      skills: body.skills || [],
      followersCount: body.followersCount || null,
      profilePictureUrl: body.profilePictureUrl || null,
    },
    now
  );

  if (logger && logger.debug) {
    logger.debug('person-data result built for', url);
  }

  return [result];
};