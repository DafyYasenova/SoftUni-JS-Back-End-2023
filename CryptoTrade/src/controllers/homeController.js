const router = require('express').Router();

const cryptoService = require('../services/cryptoService'); // for profile 
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
   // console.log(req.user)
    res.render('home')
});

router.get('/404', (req, res) => {
    res.render('404');
});


module.exports = router;
