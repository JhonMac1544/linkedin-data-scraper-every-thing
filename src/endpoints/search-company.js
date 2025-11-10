'use strict';

const { validateBody } = require('../lib/validators');
const { paginateArray } = require('../lib/pagination');
const { formatCompanyProfile } = require('../lib/linkedin-formatters');

function generateSeed(query) {
  const base = query || 'company-search';
  let hash = 0;
  for (let i = 0; i < base.length; i += 1) {
    hash = (hash * 29 + base.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
}

function pseudoRandom(seed, index) {
  const x = Math.sin(seed + index * 151) * 10000;
  return x - Math.floor(x);
}

function buildCompanies(searchQuery, total = 35) {
  const seed = generateSeed(searchQuery);
  const companies = [];

  const base = searchQuery || 'Sample Company';
  for (let i = 0; i < total; i += 1) {
    const rnd = pseudoRandom(seed, i);
    const name = `${base} ${i + 1}`;
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    companies.push(
      formatCompanyProfile({
        endpoint: 'search-company',
        url: `https://www.linkedin.com/company/${slug}`,
        companyName: name,
        companyWebsite: `https://www.${slug}.example`,
        companyIndustry: rnd > 0.6 ? 'Computer Software' : 'Information Technology & Services',
        companySize: rnd > 0.5 ? '51-200 employees' : '201-500 employees',
        companyFoundedYear: 2000 + (i % 20),
        companyHeadquarters: rnd > 0.5 ? 'Remote' : 'Unknown',
        followersCount: Math.floor(1000 + rnd * 10000),
        description: `Synthetic company search result for query "${searchQuery || 'all'}".`,
      })
    );
  }

  return companies;
}

module.exports = async function searchCompany(body, context = {}) {
  const { logger, defaults } = context;
  validateBody('search-company', body);

  const searchQuery = body.searchQuery || body.query || '';
  const requestedPage = body.page || 1;
  const pageSize = defaults.pageSize || 10;

  const companies = buildCompanies(searchQuery);
  const { items, pageInfo } = paginateArray(companies, requestedPage, pageSize);

  if (logger && logger.info) {
    logger.info(
      `search-company for query="${searchQuery}" returned page ${pageInfo.page}/${pageInfo.totalPages} (${items.length} companies).`
    );
  }

  return items.map((item) => ({
    ...item,
    searchQuery,
    page: pageInfo.page,
  }));
};