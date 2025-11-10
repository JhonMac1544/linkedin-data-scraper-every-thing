'use strict';

const { validateBody } = require('../lib/validators');

module.exports = async function companyEmployeeCountPerSkill(body, context = {}) {
  const { logger } = context;
  validateBody('company-employee-count-per-skill', body);

  const companyUrl = body.companyUrl || body.url;
  const skills = body.skillKeywords || [];
  const exclusions = body.skillExplicits || [];

  const baseFactor = (companyUrl || 'company').length || 1;
  const employeeCountPerSkill = {};

  skills.forEach((skill) => {
    const normalized = String(skill).toLowerCase();
    if (exclusions.includes(normalized)) return;
    const score = normalized.length * baseFactor;
    const estimate = Math.max(1, Math.floor(score * 3.7));
    employeeCountPerSkill[skill] = estimate;
  });

  if (logger && logger.info) {
    logger.info(
      `company-employee-count-per-skill for "${companyUrl}" computed estimates for ${Object.keys(
        employeeCountPerSkill
      ).length} skills.`
    );
  }

  return [
    {
      endpoint: 'company-employee-count-per-skill',
      companyUrl,
      skillKeywords: skills,
      skillExplicits: exclusions,
      employeeCountPerSkill,
    },
  ];
};