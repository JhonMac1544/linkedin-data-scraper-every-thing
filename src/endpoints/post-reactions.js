'use strict';

const { validateBody } = require('../lib/validators');
const { formatEngagement } = require('../lib/linkedin-formatters');
const { paginateArray } = require('../lib/pagination');

const REACTION_TYPES = ['LIKE', 'CELEBRATE', 'SUPPORT', 'LOVE', 'INSIGHTFUL', 'CURIOUS'];

function generateSeed(id) {
  const base = id || 'reactions';
  let hash = 0;
  for (let i = 0; i < base.length; i += 1) {
    hash = (hash * 43 + base.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
}

function pseudoRandom(seed, index) {
  const x = Math.sin(seed + index * 179) * 10000;
  return x - Math.floor(x);
}

function buildReactions(postId, reactionsUrn, total = 40) {
  const seed = generateSeed(postId || reactionsUrn);
  const reactions = [];

  for (let i = 0; i < total; i += 1) {
    const rnd = pseudoRandom(seed, i);
    const type = REACTION_TYPES[i % REACTION_TYPES.length];
    const name = `Reactor ${i + 1}`;

    reactions.push(
      formatEngagement({
        endpoint: 'post-reactions',
        engagementType: 'reaction',
        postId,
        reactionsUrn,
        commentAuthor: null,
        commentText: null,
        reactionType: type,
        reactor: {
          name,
          profileUrl: `https://www.linkedin.com/in/reactor-${i + 1}`,
        },
        reshareAuthor: null,
      })
    );
  }

  return reactions;
}

module.exports = async function postReactions(body, context = {}) {
  const { logger, defaults } = context;
  validateBody('post-reactions', body);

  const { postId, reactionsUrn } = body;
  const requestedPage = body.page || 1;
  const pageSize = defaults.pageSize || 10;

  const reactions = buildReactions(postId, reactionsUrn);
  const { items, pageInfo } = paginateArray(reactions, requestedPage, pageSize);

  if (logger && logger.info) {
    logger.info(
      `post-reactions for postId="${postId || reactionsUrn}" returned page ${pageInfo.page}/${pageInfo.totalPages} (${items.length} reactions).`
    );
  }

  return items.map((item) => ({
    ...item,
    page: pageInfo.page,
  }));
};