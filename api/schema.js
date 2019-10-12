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
        getNote(_id: ID!): Note
    }

    input NoteInput {
        title: String!,
        content: String!
    }

    type Mutation {
        createNote(input: NoteInput): Note
    }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
