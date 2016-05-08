'use strict';

const Team = require('../services/Team');
const { SPORTS, LEAGUES } = require('../constants');

const type = `
  type Sport {
    name: String
    season: String
    leagues: [League]
  }
`;

const resolvers = {
  Sport: {
    leagues: ({ leagues }) => leagues.map(league => LEAGUES[league]),
  },
};

module.exports = {
  type,
  resolvers,
};
