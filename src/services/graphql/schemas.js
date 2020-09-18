const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Query {
    welcome: String!
  }
`);
