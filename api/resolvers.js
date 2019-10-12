const Note = require('./models/note');

const resolvers = {
    Query: {
        async allNotes() {
            return await Note.find();
        },
        async getNote(root, { _id }) {
            return await Note.findById(_id);
        }
    },
    Mutation: {
        async createNote(root, { input }) {
            return await Note.create(input);
        }
    }
}

module.exports = resolvers;