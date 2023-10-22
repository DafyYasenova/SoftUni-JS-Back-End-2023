const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({


});

const Furniture = mongoose.model('Furniture', furnitureSchema);

module.exports = Furniture;