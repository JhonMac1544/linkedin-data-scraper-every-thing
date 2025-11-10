'use strict';

const { validateBody } = require('../lib/validators');
const { paginateArray } = require('../lib/pagination');
const { formatPersonProfile } = require('../lib/linkedin-formatters');

function generateSeed(query) {
  const base = query || 'people';
  let hash = 0;
  for (let i = 0; i < base.length; i += 1) {
    hash = (hash * 31 + base.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
}

function pseudoRandom(seed, index) {
  const x = Math.sin(seed + index * 73) * 10000;
  return x - Math.floor(x);
}

function buildPeople(searchQuery, total = 40) {
  const seed = generateSeed(searchQuery);
  const people = [];

  const baseTitle = searchQuery || 'Professional';
  for (let i = 0; i < total; i += 1) {
    const rnd = pseudoRandom(seed, i);
    const firstName = `Person${String.fromCharCode(65 + (i % 26))}`;
    const lastName = `Ln${i + 1}`;
    const fullName = `${firstName} ${lastName}`;
    const location = rnd > 0.5 ? 'Remote' : 'On-site';

    people.push(
      formatPersonProfile(
        {
          endpoint: 'search-people',
          url: `https://www.linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
          fullName,
          headline: `${baseTitle} - search match`,
          location,
          about: `Synthetic person profile for search query "${searchQuery || 'all'}".`,
          currentPositions: [],
          pastPositions: [],
          education: [],
          skills: [],
          followersCount: Math.floor(rnd * 2000),
        },
        Date.now()
      )
    );
  }

  return people;
}

module.exports = async function searchPeople(body, context = {}) {
  const { logger, defaults } = context;
  validateBody('search-people', body);

  const searchQuery = body.searchQuery || body.query || '';
  const requestedPage = body.page || 1;
  const pageSize = defaults.pageSize || 10;

  const people = buildPeople(searchQuery);
  const { items, pageInfo } = paginateArray(people, requestedPage, pageSize);

  if (logger && logger.info) {
    logger.info(
      `search-people for query="${searchQuery}" returned page ${pageInfo.page}/${pageInfo.totalPages} (${items.length} people).`
    );
  }

  return items.map((item) => ({
    ...item,
    searchQuery,
    page: pageInfo.page,
  }));
};