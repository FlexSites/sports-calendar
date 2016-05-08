const GraphQLObjectType = require('graphql').GraphQLObjectType;

module.exports = (source, args, context, info) => {
  let isObject = info.returnType instanceof GraphQLObjectType;
  if (typeof source === 'object') return source[info.fieldName] || isObject ? {} : null;
};
