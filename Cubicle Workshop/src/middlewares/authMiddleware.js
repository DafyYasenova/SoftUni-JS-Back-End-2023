const jwt = require('../lib/jwt');
const {SECRET} = require('../config/constants');

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {
        try {
            const decodeToken = await jwt.verify(token, SECRET)

            req.user = decodeToken;
            res.locals.user = decodeToken;
            res.locals.isAuthenticated = true;

            next();
        } catch (err) {
            res.clearCookie('auth');
            res.redirect('/users/login');
        }

    } else {
        next();
    }
};


