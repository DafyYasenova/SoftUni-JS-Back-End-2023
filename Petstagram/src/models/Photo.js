const mongoose = require('mongoose');

const photoSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters!'],
    },
    image: {
        type: String,
        required: [true, 'ImageURL is required!'],
        match: ['/^https?:\/\/||^http:\/\//', 'ImageUrl should be a valid url']
    },
    age: {
        type: Number,
        required: [true, 'Age is required!'],
        minLength: [1, 'Age should be more 0!'],
        maxLength: [1, 'Age should be least 100!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [1, 'Description should be more 5 characters!'],
        maxLength: [1, 'Description should be least 50 characters!'],

    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [1, 'Location should be more 5 characters!'],
        maxLength: [1, 'Location should be least 50 characters!'],
    }, 
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: [true, 'User required!'],
                ref: 'User',
            },
            message: {
                type: String,
            required: [true, 'Comment message is required!'],
        },
        }
    ]
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;