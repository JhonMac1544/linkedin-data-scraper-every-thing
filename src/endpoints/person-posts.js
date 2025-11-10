'use strict';

const { validateBody } = require('../lib/validators');
const { paginateArray } = require('../lib/pagination');
const { formatPost } = require('../lib/linkedin-formatters');

function generateSeed(url) {
  let hash = 0;
  for (let i = 0; i < url.length; i += 1) {
    hash = (hash * 31 + url.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
}

function pseudoRandom(seed, index) {
  const x = Math.sin(seed + index * 1013) * 10000;
  return x - Math.floor(x);
}

function buildPosts(url, total = 30) {
  const seed = generateSeed(url);
  const posts = [];
  const now = Date.now();

  for (let i = 0; i < total; i += 1) {
    const rnd = pseudoRandom(seed, i);
    const daysAgo = Math.floor(rnd * 365);
    const createdAt = new Date(now - daysAgo * 24 * 60 * 60 * 1000);
    const postId = `${seed}-${i}`;
    const likesCount = Math.floor(rnd * 500);
    const commentsCount = Math.floor(rnd * 50);
    const sharesCount = Math.floor(rnd * 25);

    posts.push(
      formatPost({
        endpoint: 'person-posts',
        postId,
        postUrl: `${url}/posts/${postId}`,
        postText: `Sample LinkedIn post #${i + 1} for ${url}. This simulates a person timeline entry.`,
        postMedia: [],
        postCreatedAt: createdAt.toISOString(),
        postTimestamp: createdAt.getTime(),
        likesCount,
        commentsCount,
        sharesCount,
        authorUrl: url,
        authorType: 'person',
      })
    );
  }

  return posts;
}

module.exports = async function personPosts(body, context = {}) {
  const { logger, defaults } = context;
  validateBody('person-posts', body);

  const url = body.url;
  const requestedPage = body.page || 1;
  const pageSize = defaults.pageSize || 10;

  const posts = buildPosts(url);
  const { items, pageInfo } = paginateArray(posts, requestedPage, pageSize);

  const paginationToken =
    pageInfo.hasNext ? Buffer.from(String(pageInfo.page + 1)).toString('base64') : null;

  if (logger && logger.info) {
    logger.info(
      `person-posts for ${url} returned page ${pageInfo.page}/${pageInfo.totalPages} (${items.length} posts).`
    );
  }

  return items.map((item) => ({
    ...item,
    page: pageInfo.page,
    paginationToken,
  }));
};