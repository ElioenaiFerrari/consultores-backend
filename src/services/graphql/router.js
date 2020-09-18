const router = require('express').Router();
const { graphqlHTTP } = require('express-graphql');

router.post(
  '/',
  graphqlHTTP({
    schema: require('@/services/graphql/schemas'),
    rootValue: require('@/services/graphql/resolvers'),
    graphiql: true,
  })
);

module.exports = (app) => app.use('/graphql', router);
