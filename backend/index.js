const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());



app.listen(PORT, function () {
    console.log('Server is running on port ' + PORT);
});