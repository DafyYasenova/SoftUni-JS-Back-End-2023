const router = require('express').Router();

const photoServices = require('../services/photoServices'); // for profile 
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
   // console.log(req.user)
    res.render('home')
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/profile', isAuth, async (req, res) => {
    const photos = await photoServices.getByOwner(req.user._id).lean();


    res.render('profile', { photos, photoCount: photos.length })
});

module.exports = router;
