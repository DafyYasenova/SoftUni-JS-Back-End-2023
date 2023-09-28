const mongoose = require('mongoose');

const cubeSchema =  new mongoose.Schema({
    name: String,
    descrtiprion: String,
    imageUrl: String,
    difficultyLevel: Number,
});

const Cube = mongoose.model('Cube', cubeSchema);

