const Team = require('../services/Team');
const SPORTS = require('../constants').SPORTS;
const defaultResolve = require('../defaultResolve');


let team = new Team();

const type = `
  type League {
    id: ID!
    name: String
    sport: [Sport]
    teams: [Team]
  }
`;

const resolvers = {
  League: {
    sport: defaultResolve,
    teams: (source) => team.findByLeagueId(source.id),
  },
};

module.exports = {
  type,
  resolvers,
};
