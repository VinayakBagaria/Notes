const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/notetaking_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const app = express();
const PORT = 4300;

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.get('/', (req, res) => {
    res.json({
        message: 'Note api v1'
    });
});
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});