const express = require('express');
const http = require('http');
const router = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.use('/', router);

// app.get('/:id', (req, res) => {
//     const id = req.params.id
// })

app.listen(PORT, function () {
    console.log('Server is running on port ' + PORT);
});