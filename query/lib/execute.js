'use strict';

const graphql = require('graphql').graphql;
const schema = require('./schema');
const Bluebird = require('bluebird');

module.exports = (query, variables) => {
  return Bluebird.resolve(graphql(schema, query, {}, {}, variables));
};
