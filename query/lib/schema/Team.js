const Team = require('../services/Team');
const { SPORTS, LEAGUES } = require('../constants');

const type = `
  type Team {
    id: ID!
    abbreviation: String!
    league: String!
    name: String!
    arena: String
    city: String
    conference: String
    division: String
    prefix: String
    slug: String
    state: String
    full_name: String
  }
`;

const resolvers = {
  Team: {
    full_name: (source) => `${source.prefix} ${source.name}`.trim(),
  },
};

module.exports = {
  type,
  resolvers,
};
