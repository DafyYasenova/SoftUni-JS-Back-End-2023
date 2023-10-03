const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
    },
});

userSchema.virtual('repeatPassword')
.set(function(value){
    if(value!== this.password){
        throw new mongoose.MongooseError('Password don\'t match!')
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;