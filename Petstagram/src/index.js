const express = require('express');
const PORT = 3000;
const app = express();

app.get('/', (req, res) =>{
    res.send('Action');
});

app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
