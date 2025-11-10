'use strict';

const { validateBody } = require('../lib/validators');
const { formatCompanyProfile } = require('../lib/linkedin-formatters');

function deriveCompanyNameFromUrl(url) {
  if (!url) return 'Unknown Company';
  const match = url.match(/\/company\/([^/?#]+)/i);
  const slug = match ? match[1] : url.split('/').filter(Boolean).pop();
  if (!slug) return 'Unknown Company';
  const cleaned = slug.split(/[^\w]+/).filter(Boolean);
  if (!cleaned.length) return 'Unknown Company';
  return cleaned
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

module.exports = async function multiCompanyData(body, context = {}) {
  const { logger } = context;
  validateBody('multi-company-data', body);

  const urls = body.urls || [];

  const results = urls.map((url) => {
    const companyName = deriveCompanyNameFromUrl(url);
    const createdYear = 2000 + (companyName.length % 20);
    return formatCompanyProfile({
      endpoint: 'multi-company-data',
      url,
      companyName,
      companyWebsite: `https://www.${companyName.replace(/\s+/g, '').toLowerCase()}.example`,
      companyIndustry: 'Information Technology & Services',
      companySize: '11-50 employees',
      companyFoundedYear: createdYear,
      companyHeadquarters: 'Unknown',
      followersCount: Math.floor(500 + companyName.length * 83),
      description: `${companyName} is part of a batch LinkedIn company scrape.`,
    });
  });

  if (logger && logger.info) {
    logger.info(`multi-company-data processed ${results.length} companies.`);
  }

  return results;
};