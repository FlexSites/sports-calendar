'use strict';

const execute = require('./lib/execute');

module.exports.handler = function(event, context, cb) {
  return execute(event.query, event.variables)
    .tap(stuff => {
      console.log(stuff);
    })
    .asCallback(cb);
};
