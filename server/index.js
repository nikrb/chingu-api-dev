const mongodb = require('mongodb');
const { MongoClient } = mongodb;
const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const URL = 'http://localhost';
const PORT = process.env.PORT || 3001;

const init = async () => {
  console.log('using db:', process.env.MONGO_URI);
  try {
    const c = await MongoClient.connect(process.env.MONGO_URI,
      { useNewUrlParser: true });
    const db = c.db(process.env.DBNAME);
    const resolvers = require('./schema/resolvers')(db);
    const typeDefs = require('./schema/typedefs');
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const app = express();
    app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
    app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}/graphiql`);
    });
  } catch (e) {
    console.error(e);
  }
};

init();
