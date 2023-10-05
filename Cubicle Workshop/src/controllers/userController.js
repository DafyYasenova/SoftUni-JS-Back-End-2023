const router = require('express').Router();

const userServices = require('../services/userServices');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {

    const { username, password, repearPassword } = req.body;

    await userServices.register({ username, password, repearPassword });

    res.redirect('/users/login');
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await userServices.login(username, password);
    console.log(user);
    res.cookie('username', user.username);

    res.redirect('/');

})
module.exports = router;