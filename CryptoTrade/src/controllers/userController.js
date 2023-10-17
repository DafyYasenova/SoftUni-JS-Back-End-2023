const router = require('express').Router();

const userServices = require('../services/userServices');
const { extractErrorMessage } = require('../utils/errorHelpers');


router.get('/login', (req, res) => {
    res.render('users/login')
   

});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try{
    const token = await userServices.login(email, password);

    res.cookie('token', token);

    res.redirect('/');

    } catch(error){
        res.render('users/login', {error: extractErrorMessage(error)});
    }
})

router.get('/register', (req, res) => {

    res.render('users/register');

})

router.post('/register', async (req, res) => {

    const { username, email, password, confirmPassword } = req.body;
    console.log(req.body)
    try {
        await userServices.register({ username, email, password, confirmPassword });
        
        res.redirect('/');

        // if must automatically login after register:
        // const token = await userServices.register({ username, email, password, confirmPassword });
        // res.cookie('token', token);
        // res.redirect('/');

    } catch (error) {
        res.render('users/register', { error: extractErrorMessage(error)});
    }
});

router.get('/logout', (req, res) => {

    res.clearCookie('token');

    res.redirect('/');
})

module.exports = router;
