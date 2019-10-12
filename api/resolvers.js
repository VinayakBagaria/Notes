const Note = require('./models/note');

const resolvers = {
    Query: {
        async allNotes() {
            return await Note.find();
        }
    }
}

module.exports = resolvers;