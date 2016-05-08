'use strict';

const Bluebird = require('bluebird');

const DIFF_FIELD = 'name';

module.exports = (...promises) => {
  return Bluebird.all(promises)
    .then((results) => diff(...results));
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


function createIndex(arr, field = DIFF_FIELD) {
  return arr
    .reduce((prev, curr) => {
      prev[curr[field]] = curr;
      return prev;
    }, {})
}

function createHash({ arena, city, state, prefix, division, conference } = {}) {
  // Checking object equality by creating a string hash
  return `${arena}${city}${state}${prefix}${division}${conference}`;
}
