'use strict';

const { validateBody } = require('../lib/validators');
const { formatEngagement } = require('../lib/linkedin-formatters');
const { paginateArray } = require('../lib/pagination');

function generateSeed(id) {
  const base = id || 'reshares';
  let hash = 0;
  for (let i = 0; i < base.length; i += 1) {
    hash = (hash * 47 + base.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
}

function pseudoRandom(seed, index) {
  const x = Math.sin(seed + index * 257) * 10000;
  return x - Math.floor(x);
}

function buildReshares(postId, repostsUrn, total = 20) {
  const seed = generateSeed(postId || repostsUrn);
  const reshares = [];

  for (let i = 0; i < total; i += 1) {
    const rnd = pseudoRandom(seed, i);
    const name = `Resharer ${i + 1}`;

    reshares.push(
      formatEngagement({
        endpoint: 'post-reshares',
        engagementType: 'reshare',
        postId,
        repostsUrn,
        commentAuthor: null,
        commentText: null,
        reactionType: null,
        reactor: null,
        reshareAuthor: {
          name,
          profileUrl: `https://www.linkedin.com/in/resharer-${i + 1}`,
          followersCount: Math.floor(rnd * 5000),
        },
      })
    );
  }

  return reshares;
}

module.exports = async function postReshares(body, context = {}) {
  const { logger, defaults } = context;
  validateBody('post-reshares', body);

  const { postId, repostsUrn } = body;
  const requestedPage = body.page || 1;
  const pageSize = defaults.pageSize || 10;

  const reshares = buildReshares(postId, repostsUrn);
  const { items, pageInfo } = paginateArray(reshares, requestedPage, pageSize);

  if (logger && logger.info) {
    logger.info(
      `post-reshares for postId="${postId || repostsUrn}" returned page ${pageInfo.page}/${pageInfo.totalPages} (${items.length} reshares).`
    );
  }

  return items.map((item) => ({
    ...item,
    page: pageInfo.page,
  }));
};