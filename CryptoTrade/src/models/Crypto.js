const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
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
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'Price should be positive number!'],
    },
    cryptoDescription: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be minimum 10 characters!'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required!'],
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buyCrypto: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;