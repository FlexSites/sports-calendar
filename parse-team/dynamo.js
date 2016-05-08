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

function batchWrite(changes) {
  console.log('batch write', changes);
  let updateRequests = changes.additions.map(Item => {
    console.log(`Updating ${Item.name}`);
    return { PutRequest: { Item } };
  });
  let deleteRequests = changes.deletions.map(obj => {
    console.log(`Deleting ${obj.name} with ID ${obj.id}`);
    return { DeleteRequest: { Key: { id: obj.id } } };
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
    .then(res => res.Items);
}

function list() {
  return dynamo
    .scan()
    .promise()
    .then(res => res.Items);
}


module.exports = {
  findByLeague,
  list,
  batchWrite,
};
