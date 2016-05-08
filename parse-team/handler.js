'use strict';

const Bluebird = require('bluebird');

const fetchSource = require('./fetch-sources');
const delta = require('./delta');
const dynamo = require('./dynamo');

const findByLeague = dynamo.findByLeague;
const batchWrite = dynamo.batchWrite;

const LEAGUES = ['NBA', 'MLB'];


module.exports.handler = function(event, context, cb) {
  return Bluebird.all(
    LEAGUES
      .map(league =>
        delta(fetchSource(league), findByLeague(league))
          .then(batchWrite)
          .then(results => ({ [league]: results }))
      )
  )
  .then(messages => messages.reduce((prev, curr) => Object.assign(prev, curr)))
  .asCallback(cb);
};
