const router = require('express').Router();

const userServices = require('../services/userServices');
const { extractErrorMessage } = require('../utils/errorHelpers');
router.get('/login', (req, res) => {
    res.render('users/login')

});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const token = await userServices.login(username, password);

    res.cookie('token', token);

    res.redirect('/');
})

router.get('/register', (req, res) => {

    res.render('users/register');

})

router.post('/register', async (req, res) => {

    const { username, email, password, repeatPassword } = req.body;
    try {
        await userServices.register({ username, email, password, repeatPassword });
        
        res.redirect('/users/login');

    } catch (error) {
        res.render('users/register', { error: extractErrorMessage(error)});
    }
});

router.get('/logout', (req, res) => {

    res.clearCookie('token');

    res.redirect('/');
})

module.exports = router;
