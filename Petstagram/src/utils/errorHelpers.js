const { MongooseError} = require('mongoose');

exports.extractErrorMessage = (error) =>{
    if(error instanceof MongooseError) {
        return Object.values(error.errors)[0].message;
    } else {
        return error.message;
    }
}