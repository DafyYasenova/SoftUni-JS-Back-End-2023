const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/furnitures')
.then(() => console.log('DB Connected'))
.catch(err => console.log(err));

app.use(express.urlencoded({extended: false})); //for parse query strings
app.use(cors());

app.use(express.json()); //for parse json data
 
// app.use((req,res, next) =>{

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader('Access-Control-Allow-Headers', '*');

//     next();

// }); 
// 2 way: install cors

app.get('/', (req, res) => {
res.send('hello');

});

app.use(routes);

app.listen(3030, () => console.log('RESTful server is listening on port 3030...'));

