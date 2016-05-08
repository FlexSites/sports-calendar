'use strict';

const Bluebird = require('bluebird');

const fetchSource = require('./fetch-sources');
const { findByLeague, list, batchWrite } = require('./dynamo');
const delta = require('./delta');

const LEAGUES = ['NBA', 'MLB'];


module.exports.handler = function(event, context, cb) {
  return Bluebird.all(
    LEAGUES
      .map(league =>
        delta(fetchSource(league), findByLeague(league))
          .then(({ additions, deletions }) => batchWrite(additions, deletions))
          .then(results => ({ [league]: results }))
      )
  )
  .then(messages => messages.reduce((prev, curr) => Object.assign(prev, curr)))
  .asCallback(cb);
};
