const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/notetaking_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const app = express();
const PORT = 4300;

app.get('/', (req, res) => {
    res.json({
        message: 'Note api v1'
    })
})
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
})