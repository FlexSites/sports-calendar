const AWS = require('aws-sdk');
const Service = require('./Service');

const dynamo = new AWS.DynamoDB.DocumentClient({
  params: {
    TableName: 'SF-Team',
  },
  region: 'us-west-2',
});

module.exports = class Team extends Service {
  constructor() {
    super('Teams');
  }
  findByLeagueId(id) {
    return dynamo
      .query({
        IndexName: 'league-index',
        KeyConditionExpression: 'league = :hkey',
        ExpressionAttributeValues: {
          ':hkey': id,
        },
      })
      .promise()
      .then(res => res.Items)
  }
}
