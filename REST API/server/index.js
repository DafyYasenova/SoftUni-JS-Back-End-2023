const express = require('express');

const routes = require('./routes')
const app = express();

app.get('/', (req, res) => {
res.send('hello');

});

app.use('/data', routes);

app.listen(3030, () => console.log('RESTful server is listening on port 3030...'));
