const router = require('express').Router();
const { getLastThreeCreatedAnimals } = require('../services/animalService');
const animalService = require('../services/animalService');

const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {

    // console.log(req.user)
    try {
        const animals = await getLastThreeCreatedAnimals();
        res.render('home', { animals, user: req.user })

    } catch (error) {
        res.render('home', error);
    }
});

router.get('/search', async (req, res) => {

    try {
        const { search } = req.query;
        //console.log('search', req.query)

        const animals = await animalService.search(search);

        res.render('search', { animals });

    } catch (error) {
        res.redirect('/404');
    }

});


router.get('/404', (req, res) => {
    res.render('404');
});



module.exports = router;
