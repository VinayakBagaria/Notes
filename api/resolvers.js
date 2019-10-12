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
        },
        async updateNote(root, { _id, input }) {
            return await Note.findByIdAndUpdate({ _id }, input, { new: true });
        },
        async deleteNote(root, { _id }) {
            return await Note.findByIdAndRemove({ _id });
        }
    }
}

module.exports = resolvers;