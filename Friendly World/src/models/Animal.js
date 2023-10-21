const mongoose = require('mongoose');


const animalSchema = new mongoose.Schema({
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
    years: {
        type: Number,
        required: [true, 'Years is required!'],
        min: [1, 'Years should be a number between 1 and 100!'],
        max: [100, 'Years should be a number between 1 and 100!'],
       
    },
    kind: {
        type: String,
        required: [true, 'Kind is required!'],
        minLength: [3, 'Kind should be at least 3 characters!'],
   
    },
    need: {
        type: String,
        required: [true, 'Need is required!'],
        minLength: [3, 'Need should be at least 3 characters!'],
        maxLength: [20, 'Kind should be no longer 20 characters!'],

    },
    description: {
        type: String,
        required: [true, 'Description  is required!'],
        minLength: [5, 'Description should be at least 5 characters!'],
        maxLength: [50, 'Description should be no longer 50 characters!'],
        
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [5, 'Location should be at least 5 characters!'],
        maxLength: [15, 'Location should be no longer 15 characters!'],
        
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    donations: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;