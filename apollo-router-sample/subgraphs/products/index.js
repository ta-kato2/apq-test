const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { gql } = require('graphql-tag');

const typeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Product @key(fields: "id") {
    id: ID!
    name: String!
    price: Float!
    description: String
    inStock: Boolean!
  }
`;

const products = [
  { id: '1', name: 'Laptop', price: 999.99, description: 'High-performance laptop', inStock: true },
  { id: '2', name: 'Mouse', price: 29.99, description: 'Wireless mouse', inStock: true },
  { id: '3', name: 'Keyboard', price: 79.99, description: 'Mechanical keyboard', inStock: false },
  { id: '4', name: 'Monitor', price: 399.99, description: '27-inch 4K monitor', inStock: true },
];

const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => products.find(product => product.id === id),
  },
  Product: {
    __resolveReference: (reference) => {
      return products.find(product => product.id === reference.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, {
  listen: { port: 4002 },
}).then(({ url }) => {
  console.log(`🚀 Products subgraph ready at ${url}`);
});