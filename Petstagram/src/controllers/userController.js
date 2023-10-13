const router = require('express').Router();

const userServices = require('../services/userServices');

router.get('/login', (req, res) =>{
res.render('users/login')

});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    await userServices.login(username, password);

    res.send('Logged in');
})

router.get('/register', (req, res) =>{

    res.render('users/register');

})

router.post('/register', async (req, res) => {

    const { username, email, password, repeatPassword  } = req.body;
    
    await userServices.register({ username, email, password, repeatPassword });
    res.send('I am registered')
})

module.exports = router;
