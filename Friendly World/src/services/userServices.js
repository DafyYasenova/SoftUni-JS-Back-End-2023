const jwt = require('../lib/jwt');
const User = require('../models/User');
const { SECRET } = require('../config/constans')

const bcrypt = require('bcrypt');

async function generateToken(user) {

    const payload = {
        _id: user._id,
        //username: user.username,
        email: user.email,
    };
    
    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });
    return token;
};

exports.login = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid user or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid user or password');
    }


    // if must automatically login after register:
    const token = await generateToken(user);
    return token;

}
exports.register = async (userData) => {

    const user = await User.findOne({ email: userData.email });
    if (user) {
        throw new Error('Username already exists!')
    }
    //for only register:
    // return User.create(userData);

    //  if automatically login after register:
    // const createUser = await User.create(userData);

    // const token = await generateToken(createUser);

    // console.log('createUser:', createUser);


    const token = await generateToken(await User.create(userData))
    console.log('token', token)

    return token; // userController!
}

