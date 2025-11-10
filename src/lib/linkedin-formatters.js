'use strict';

function formatPersonProfile(raw, timestamp = Date.now()) {
  return {
    endpoint: raw.endpoint || 'person-data',
    url: raw.url || null,
    fullName: raw.fullName || null,
    headline: raw.headline || null,
    location: raw.location || null,
    about: raw.about || null,
    currentPositions: Array.isArray(raw.currentPositions) ? raw.currentPositions : [],
    pastPositions: Array.isArray(raw.pastPositions) ? raw.pastPositions : [],
    education: Array.isArray(raw.education) ? raw.education : [],
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    followersCount:
      typeof raw.followersCount === 'number' ? raw.followersCount : raw.followersCount || null,
    profilePictureUrl: raw.profilePictureUrl || null,
    timestamp,
    raw: raw.raw || undefined,
  };
}

function formatCompanyProfile(raw) {
  return {
    endpoint: raw.endpoint || 'company-data',
    url: raw.url || null,
    companyName: raw.companyName || null,
    companyWebsite: raw.companyWebsite || null,
    companyIndustry: raw.companyIndustry || null,
    companySize: raw.companySize || null,
    companyFoundedYear: raw.companyFoundedYear || null,
    companyHeadquarters: raw.companyHeadquarters || null,
    followersCount:
      typeof raw.followersCount === 'number' ? raw.followersCount : raw.followersCount || null,
    description: raw.description || null,
    raw: raw.raw || undefined,
  };
}

function formatPost(raw) {
  return {
    endpoint: raw.endpoint || 'post-data',
    postId: raw.postId || null,
    postUrl: raw.postUrl || null,
    postText: raw.postText || null,
    postMedia: Array.isArray(raw.postMedia) ? raw.postMedia : [],
    postCreatedAt: raw.postCreatedAt || null,
    postTimestamp: raw.postTimestamp || null,
    likesCount: typeof raw.likesCount === 'number' ? raw.likesCount : raw.likesCount || 0,
    commentsCount:
      typeof raw.commentsCount === 'number' ? raw.commentsCount : raw.commentsCount || 0,
    sharesCount:
      typeof raw.sharesCount === 'number' ? raw.sharesCount : raw.sharesCount || 0,
    url: raw.url || undefined,
    authorUrl: raw.authorUrl || undefined,
    authorType: raw.authorType || undefined,
    searchQuery: raw.searchQuery || undefined,
    raw: raw.raw || undefined,
  };
}

function formatJob(raw) {
  return {
    endpoint: raw.endpoint || 'search-jobs',
    jobId: raw.jobId || null,
    jobTitle: raw.jobTitle || null,
    jobCompanyName: raw.jobCompanyName || null,
    jobCompanyId: raw.jobCompanyId || null,
    jobLocation: raw.jobLocation || null,
    jobWorkplaceType: raw.jobWorkplaceType || null,
    jobEmploymentType: raw.jobEmploymentType || null,
    jobPostedAt: raw.jobPostedAt || null,
    jobPostedTimestamp: raw.jobPostedTimestamp || null,
    jobEasyApply: !!raw.jobEasyApply,
    searchQuery: raw.searchQuery || null,
    page: raw.page || null,
    raw: raw.raw || undefined,
  };
}

function formatEngagement(raw) {
  return {
    endpoint: raw.endpoint || 'engagement',
    engagementType: raw.engagementType || null,
    postId: raw.postId || null,
    commentsUrn: raw.commentsUrn || null,
    reactionsUrn: raw.reactionsUrn || null,
    repostsUrn: raw.repostsUrn || null,
    commentAuthor: raw.commentAuthor || null,
    commentText: raw.commentText || null,
    reactionType: raw.reactionType || null,
    reactor: raw.reactor || null,
    reshareAuthor: raw.reshareAuthor || null,
    raw: raw.raw || undefined,
  };
}

function formatSuggestion(raw) {
  return {
    endpoint: raw.endpoint || 'suggestion',
    suggestionType: raw.suggestionType || null,
    suggestionQuery: raw.suggestionQuery || null,
    suggestedName: raw.suggestedName || null,
    suggestedId: raw.suggestedId || null,
    raw: raw.raw || undefined,
  };
}

module.exports = {
  formatPersonProfile,
  formatCompanyProfile,
  formatPost,
  formatJob,
  formatEngagement,
  formatSuggestion,
};