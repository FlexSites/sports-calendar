'use strict';

const Team = require('../services/Team');
const constants = require('../constants');

const SPORTS = constants.SPORTS;
const LEAGUES = constants.LEAGUES;
const LEAGUE_LIST = constants.LEAGUE_LIST;

const type = `
  type Root {
    league(id: String!): League
    leagues: [League]
    sports: [Sport]
  }
`;

console.log(LEAGUE_LIST);

const resolvers = {
  Root: {
    leagues: () => LEAGUE_LIST,
    sports: () => SPORT,
    league: (source) => LEAGUES[source],
  },
};

module.exports = {
  type,
  resolvers,
};
