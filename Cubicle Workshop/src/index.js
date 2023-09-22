const express = require('express');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig')

const PORT = 5000;
const app = express();

expressConfig(app);
handlebarsConfig(app);


app.get('/', (req, res)=>{
res.render('index')
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));