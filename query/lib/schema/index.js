'use strict';

const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const Schema = { type: `schema { query: Root }` };
const Root = require('./Root');

// Types
const League = require('./League');
const Match = require('./Match');
const Sport = require('./Sport');
const Team = require('./Team');

const definitions = [
  Schema,
  Root,
  League,
  Match,
  Sport,
  Team,
];


const schemaArgs = definitions
  .reduce((prev, curr) => {
    if (curr.type) prev.typeDefs.push(curr.type);
    if (curr.resolvers) prev.resolvers = Object.assign({}, curr.resolvers, prev.resolvers);
    if (curr.mocks) prev.mocks = Object.assign({}, curr.mocks, prev.mocks);
    return prev;
  }, { typeDefs: [], resolvers: {}, mocks: {} });

schemaArgs.allowUndefinedInResolve = true;

module.exports = makeExecutableSchema(schemaArgs);
