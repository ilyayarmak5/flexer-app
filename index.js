const { ApolloServer } = require("apollo-server");

const gql = require("graphql-tag");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then((res) => {
    console.log("MongoDB connected");
    return server.listen({ port: 5004 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
