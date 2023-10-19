const { Error, MongooseError} = require('mongoose');

exports.extractErrorMessage = (error) =>{
    if(error instanceof MongooseError || error instanceof Error) {
        return Object.values(error.errors)[0].message;
    } else {
        return error.message;
    }
}