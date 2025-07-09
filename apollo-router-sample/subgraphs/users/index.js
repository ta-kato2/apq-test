const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { gql } = require('graphql-tag');

const typeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type Query {
    users(name: String): [User]
    user(id: ID!): User
  }

  type User @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
`;

const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', age: 28 },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', age: 35 },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', age: 23 },
];

const resolvers = {
  Query: {
    users: (_, { name }) => {
      if (!name) return users;
      return users.filter(user => 
        user.name.toLowerCase().includes(name.toLowerCase())
      );
    },
    user: (_, { id }) => users.find(user => user.id === id),
  },
  User: {
    __resolveReference: (reference) => {
      return users.find(user => user.id === reference.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, {
  listen: { port: 4001 },
}).then(({ url }) => {
  console.log(`🚀 Users subgraph ready at ${url}`);
});