const router = require('express').Router();

const userServices = require('../services/userServices');
const { extractErrorMessage } = require('../utils/errorHelpers');


router.get('/login', (req, res) => {
    res.render('users/login');
   
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try{
    const token = await userServices.login(email, password);

    res.cookie('token', token, {httpOnly: true});

    res.redirect('/');

    } catch(error){
        res.render('users/login', {error: extractErrorMessage(error)});
    }
})

router.get('/register', (req, res) => {

    res.render('users/register');

})

router.post('/register', async (req, res) => {

    try{
       
    const { email, password, repeatPassword } = req.body;
        //  console.log(req.body)
        //for only register:
        // await userServices.register({ firstName, lastName, email, password, repeatPassword});
        // res.redirect('/');

        if (!email || !password) {
            throw new Error('All fields are required!');
        }

        if (password !== repeatPassword) {
            throw new Error("Passwords don't match!");
        }

        // if must automatically login after register:
        const token = await userServices.register({email, password});
     
        res.cookie('token', token, { httpOnly:true});
        res.redirect('/');

    } catch (error) {
        res.render('users/register', { error: extractErrorMessage(error)});
        console.log(error)
    }
});

router.get('/logout', (req, res) => {

    res.clearCookie('token');

    res.redirect('/');
})

module.exports = router;
