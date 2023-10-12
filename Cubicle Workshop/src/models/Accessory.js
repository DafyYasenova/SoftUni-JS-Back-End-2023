const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'Name is too short!'],
        match: [/^[A-Za-z0-9 ]+$/, 'Name must be alphanumeric!'],
    },

    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [5, 'Description is it should be more 20 characters!'],
        match: [/^[A-Za-z0-9 ]+$/, 'Name must be alphanumeric!'],
    },
    imageUrl: String,
});

const Accessory = mongoose.model('Accessory', accessorySchema);
module.exports = Accessory;