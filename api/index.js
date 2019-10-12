const express = require('express');

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