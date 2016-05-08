'use strict';

const AWS = require('aws-sdk');
const Bluebird = require('bluebird');

const TABLE_NAME = 'SF-Team';

AWS.config.setPromisesDependency(Bluebird);

const dynamo = new AWS.DynamoDB.DocumentClient({
  params: {
    TableName: TABLE_NAME,
  },
  region: 'us-west-2',
});

function batchWrite(updates = [], deletions = []) {

  let updateRequests = updates.map(Item => {
    console.log(`Updating ${Item.name}`);
    return { PutRequest: { Item } };
  });
  let deleteRequests = deletions.map(({ id, name }) => {
    console.log(`Deleting ${name} with ID ${id}`);
    return { DeleteRequest: { Key: { id } } };
  });

  let requests = updateRequests.concat(deleteRequests);

  if (!requests.length) return Bluebird.resolve('No updates');

  return dynamo
    .batchWrite({
      RequestItems: { [TABLE_NAME]: requests }
    })
    .promise()
    .return(`Updated ${updateRequests.length} records. Deleted ${deleteRequests.length} records.`);
}

function findByLeague(league) {
  return dynamo
    .query({
      IndexName: 'league-index',
      KeyConditionExpression: 'league = :hkey',
      ExpressionAttributeValues: {
        ':hkey': league,
      },
    })
    .promise()
    .then(({ Items }) => Items);
}

function list() {
  return dynamo
    .scan()
    .promise()
    .then(({ Items }) => Items);
}


module.exports = {
  findByLeague,
  list,
  batchWrite,
};
