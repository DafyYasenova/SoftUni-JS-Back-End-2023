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
        // validate: {
        //     validator(value){
        //         return /^https?:\/\/.+$/.test(value);
        //     },
        //     message: 'Image should be start with http:// ot https://!'
        // }
        match: [/^https?:\/\//, 'Invalid URL!']
    },
    age: {
        type: Number,
        required: [true, 'Age is required!'],
        minLength: [1, 'Age should be more 0!'],
        maxLength: [100, 'Age should be least 100!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [5, 'Description should be more 5 characters!'],
        maxLength: [50, 'Description should be least 50 characters!'],

    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [5, 'Location should be more 5 characters!'],
        maxLength: [50, 'Location should be least 50 characters!'],
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