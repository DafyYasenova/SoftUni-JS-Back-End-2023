const router = require('express').Router();

const photoServices = require('../services/photoServices');

const { extractErrorMessage} = require('../utils/errorHelpers');

router.get('/catalog', async (req, res) =>{

    const photos = await photoServices.getAll().lean();

    res.render('photos/catalog', {photos});
})

router.get('/create', (req, res) => {

    res.render('photos/create');
   // res.redirect('/photos/catalog')

});


router.post('/create', async (req, res) => {
    const photoData = {...req.body, owner: req.user._id};

    try {

        await photoServices.create(photoData);
        res.redirect('/photos/catalog');

    } catch (error) {
        res.render('photos/create', { error: extractErrorMessage(error)});

    }
});
module.exports = router;
