const mongoose = require('mongoose');


const creatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters!'],
    },
    image: {
        type: String,
        required: [true, 'ImageURL is required!'],
        match: [/^https?:\/\//, 'Invalid URL!']
    },
    species: {
        type: String,
        required: [true, 'Species is required!'],
        minLength: [3, 'Species should be 3 characters!'],
    },
    skinColor: {
        type: String,
        required: [true, 'Skin color is required!'],
        minLength: [3, 'Skin color should be minimum 3 characters!'],
    },
    eyeColor: {
        type: String,
        required: [true, 'Eye color is required!'],
        minLength: [3, 'Eye color should be minimum 3 characters!'],
    },
    description: {
        type: String,
        required: [true, 'Description method is required!'],
        minLength: [5, 'Description should be minimum 5 characters!'],
        maxLength: [500, 'Description should be no longer than 500 characters!'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});

const Creature = mongoose.model('Creature', creatureSchema);

module.exports = Creature;