const Crypto = require('../models/Crypto');


exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.getAll = () => Crypto.find().populate('owner');

exports.getOne = (cryptoId) => Crypto.findById(cryptoId) //.populate('owner');

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);


exports.getByOwner = (userId) => Crypto.find({owner: userId});

// 1way:
exports.buy =async  (userId, cryptoId) => {
    const crypto = await Crypto.findById(cryptoId);
    crypto.buyCrypto.push(userId);

    return crypto.save();
}
//2way
// exports.buy = async  (userId, cryptoId) => {
//    await Crypto.findByIdAndUpdate(cryptoId, {$push: {buyCrypto: userId }})
// }