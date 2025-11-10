'use strict';

const { validateBody } = require('../lib/validators');
const { formatEngagement } = require('../lib/linkedin-formatters');
const { paginateArray } = require('../lib/pagination');

function generateSeed(id) {
  const base = id || 'comments';
  let hash = 0;
  for (let i = 0; i < base.length; i += 1) {
    hash = (hash * 41 + base.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
}

function pseudoRandom(seed, index) {
  const x = Math.sin(seed + index * 199) * 10000;
  return x - Math.floor(x);
}

function buildComments(postId, commentsUrn, total = 25) {
  const seed = generateSeed(postId || commentsUrn);
  const comments = [];

  for (let i = 0; i < total; i += 1) {
    const rnd = pseudoRandom(seed, i);
    const authorName = `Commenter ${i + 1}`;
    comments.push(
      formatEngagement({
        endpoint: 'post-comments',
        engagementType: 'comment',
        postId,
        commentsUrn,
        commentAuthor: {
          name: authorName,
          profileUrl: `https://www.linkedin.com/in/commenter-${i + 1}`,
        },
        commentText: `Sample comment #${i + 1} on post ${postId || commentsUrn}.`,
        reactionType: null,
        reactor: null,
        reshareAuthor: null,
      })
    );
  }

  return comments;
}

module.exports = async function postComments(body, context = {}) {
  const { logger, defaults } = context;
  validateBody('post-comments', body);

  const { postId, commentsUrn } = body;
  const requestedPage = body.page || 1;
  const pageSize = defaults.pageSize || 10;

  const comments = buildComments(postId, commentsUrn);
  const { items, pageInfo } = paginateArray(comments, requestedPage, pageSize);

  if (logger && logger.info) {
    logger.info(
      `post-comments for postId="${postId || commentsUrn}" returned page ${pageInfo.page}/${pageInfo.totalPages} (${items.length} comments).`
    );
  }

  return items.map((item) => ({
    ...item,
    page: pageInfo.page,
  }));
};