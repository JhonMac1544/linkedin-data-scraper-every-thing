'use strict';

const { validateBody } = require('../lib/validators');
const { paginateArray } = require('../lib/pagination');
const { formatPost } = require('../lib/linkedin-formatters');

function generateSeed(query) {
  const base = query || 'posts';
  let hash = 0;
  for (let i = 0; i < base.length; i += 1) {
    hash = (hash * 37 + base.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
}

function pseudoRandom(seed, index) {
  const x = Math.sin(seed + index * 311) * 10000;
  return x - Math.floor(x);
}

function buildPosts(searchQuery, total = 60) {
  const seed = generateSeed(searchQuery);
  const posts = [];
  const now = Date.now();

  for (let i = 0; i < total; i += 1) {
    const rnd = pseudoRandom(seed, i);
    const hoursAgo = Math.floor(rnd * 24 * 14); // last 2 weeks
    const createdAt = new Date(now - hoursAgo * 60 * 60 * 1000);
    const postId = `sp-${seed}-${i}`;

    posts.push(
      formatPost({
        endpoint: 'search-posts',
        postId,
        postUrl: `https://www.linkedin.com/feed/update/${postId}`,
        postText: `Search result post #${i + 1} for query "${searchQuery || 'all'}".`,
        postMedia: [],
        postCreatedAt: createdAt.toISOString(),
        postTimestamp: createdAt.getTime(),
        likesCount: Math.floor(rnd * 300),
        commentsCount: Math.floor(rnd * 80),
        sharesCount: Math.floor(rnd * 40),
        searchQuery,
      })
    );
  }

  return posts;
}

module.exports = async function searchPosts(body, context = {}) {
  const { logger, defaults } = context;
  validateBody('search-posts', body);

  const searchQuery = body.searchQuery || body.query || '';
  const requestedPage = body.page || 1;
  const pageSize = defaults.pageSize || 10;

  const posts = buildPosts(searchQuery);
  const { items, pageInfo } = paginateArray(posts, requestedPage, pageSize);

  if (logger && logger.info) {
    logger.info(
      `search-posts for query="${searchQuery}" returned page ${pageInfo.page}/${pageInfo.totalPages} (${items.length} posts).`
    );
  }

  return items.map((item) => ({
    ...item,
    page: pageInfo.page,
  }));
};