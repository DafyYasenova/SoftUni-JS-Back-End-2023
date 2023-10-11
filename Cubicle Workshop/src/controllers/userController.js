const router = require('express').Router();

const userServices = require('../services/userServices');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {

    const { username, password, repearPassword } = req.body;

    try {
        await userServices.register({ username, password, repearPassword });

        res.redirect('/users/login');
    } catch (error) {
        res.status(404).render('users/register', {errorMessage: error.message})
    }
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const token = await userServices.login(username, password);

    res.cookie('auth', token, { httpOnly: true });

    res.redirect('/');

});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})
module.exports = router; 