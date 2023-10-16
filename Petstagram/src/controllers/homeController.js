const router = require('express').Router();

const photoServices = require('../services/photoServices'); // for profile 

router.get('/', (req, res) =>{
    console.log(req.user)
    res.render('home')
});

router.get('/404', (req, res) =>{
    res.render('404');
});

router.get('/profile', (req, res) =>{
    res.render('profile');

});

module.exports = router;
