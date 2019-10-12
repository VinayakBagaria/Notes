const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type Note {
        _id: ID!,
        title: String!,
        content: String!,
        date: Date,
    }

    scalar Date

    type Query {
        allNotes: [Note]
    }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
