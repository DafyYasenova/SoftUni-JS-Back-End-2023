const router = require('express').Router();

const photoServices = require('../services/photoServices');

const { extractErrorMessage} = require('../utils/errorHelpers');

router.get('/catalog', (req, res) =>{
    res.render('photos/catalog')
})

router.get('/create', (req, res) => {

    res.render('photos/create');

});


router.post('/create', async (req, res) => {
    const photoData = {...req.body, owner: req.user._id};

    try {

        await photoServices.create(photoData);
        res.redirect('/photos');

    } catch (error) {
        res.render('photos/create', { error: extractErrorMessage(error)});

    }
});
module.exports = router;
