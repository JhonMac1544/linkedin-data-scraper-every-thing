'use strict';

const { validateBody } = require('../lib/validators');
const { paginateArray } = require('../lib/pagination');
const { formatJob } = require('../lib/linkedin-formatters');

function generateSeed(query) {
  const base = query || 'jobs';
  let hash = 0;
  for (let i = 0; i < base.length; i += 1) {
    hash = (hash * 33 + base.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
}

function pseudoRandom(seed, index) {
  const x = Math.sin(seed + index * 997) * 10000;
  return x - Math.floor(x);
}

function buildJobs(searchQuery, location, total = 50) {
  const seed = generateSeed(searchQuery + (location || ''));
  const jobs = [];
  const now = Date.now();

  for (let i = 0; i < total; i += 1) {
    const rnd = pseudoRandom(seed, i);
    const daysAgo = Math.floor(rnd * 60);
    const createdAt = new Date(now - daysAgo * 24 * 60 * 60 * 1000);
    const jobId = `${seed}-${i}`;
    const companyName = `Company ${String.fromCharCode(65 + (i % 26))}`;
    const titleBase = searchQuery || 'LinkedIn Job';

    jobs.push(
      formatJob({
        endpoint: 'search-jobs',
        jobId,
        jobTitle: `${titleBase} #${i + 1}`,
        jobCompanyName: companyName,
        jobCompanyId: 100000 + i,
        jobLocation: location || 'Worldwide',
        jobWorkplaceType: i % 3 === 0 ? 'Remote' : i % 3 === 1 ? 'Hybrid' : 'On-site',
        jobEmploymentType: i % 2 === 0 ? 'Full-time' : 'Contract',
        jobPostedAt: createdAt.toISOString(),
        jobPostedTimestamp: createdAt.getTime(),
        jobEasyApply: i % 4 === 0,
        searchQuery,
        page: null,
      })
    );
  }

  return jobs;
}

module.exports = async function searchJobs(body, context = {}) {
  const { logger, defaults } = context;
  validateBody('search-jobs', body);

  const searchQuery = body.searchQuery || body.query || '';
  const location = body.location || body.jobLocation || null;
  const requestedPage = body.page || 1;
  const pageSize = defaults.pageSize || 10;

  const jobs = buildJobs(searchQuery, location);
  const { items, pageInfo } = paginateArray(jobs, requestedPage, pageSize);

  if (logger && logger.info) {
    logger.info(
      `search-jobs for query="${searchQuery}" returned page ${pageInfo.page}/${pageInfo.totalPages} (${items.length} jobs).`
    );
  }

  return items.map((item) => ({
    ...item,
    page: pageInfo.page,
  }));
};