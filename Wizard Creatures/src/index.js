const { PORT }  = require('./config/constans');

const express = require('express');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const dbConnect = require('./config/dbConfig');
const routes = require('./routes');

const app = express();

expressConfig(app);
handlebarsConfig(app);

dbConnect()
.then(() => console.log('DB Connect successfully!'))
.catch(err => console.log('DB Error:', err.message));

app.use(routes);

app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
