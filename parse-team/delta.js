'use strict';

const Bluebird = require('bluebird');

const DIFF_FIELD = 'name';

module.exports = (src, dest) => {
  return Bluebird.all([src, dest])
    .then((results) => diff(results[0], results[1]));
};

function diff(src, dest) {
  let srcIndex = createIndex(src);
  let destIndex = createIndex(dest);

  let additions = src
    .filter(srcObj => {
      let destObj = destIndex[srcObj[DIFF_FIELD]]
      // If the destination doesn't already have the object, add it
      if (!destObj) return true;

      if (createHash(srcObj) !== createHash(destObj)) return true;

      return false;
    });

  let deletions = dest
    .filter(destObj => {
      // If the source doesn't have the object, delete it
      if (!srcIndex[destObj[DIFF_FIELD]]) return true;
      return false;
    });

  return {
    additions,
    deletions,
  };
};


function createIndex(arr, field) {
  return arr
    .reduce((prev, curr) => {
      prev[curr[field || DIFF_FIELD]] = curr;
      return prev;
    }, {})
}

function createHash(obj) {
  obj = obj || {};
  // Checking object equality by creating a string hash
  return `${obj.arena}${obj.city}${obj.state}${obj.prefix}${obj.division}${obj.conference}`;
}
