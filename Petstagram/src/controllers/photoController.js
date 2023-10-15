const router = require('express').Router();

const photoServices = require('../services/photoServices');

const { extractErrorMessage } = require('../utils/errorHelpers');

router.get('/catalog', async (req, res) => {

    const photos = await photoServices.getAll().lean();

    res.render('photos/catalog', { photos });
})

router.get('/create', (req, res) => {

    res.render('photos/create');
    // res.redirect('/photos/catalog')

});


router.post('/create', async (req, res) => {
    const photoData = { ...req.body, owner: req.user._id };

    try {

        await photoServices.create(photoData);
        res.redirect('/photos/catalog');

    } catch (error) {
        res.render('photos/create', { error: extractErrorMessage(error) });

    }
});

router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photoServices.getOne(photoId).lean();

    const isOwner = req.user?._id == photo.owner._id
    res.render('photos/details', { photo, isOwner });

});

router.get('/:photoId/delete', async (req, res) => {
    const photoId = req.params.photoId;

    try {
        await photoServices.delete(photoId);
        res.redirect('/photos/catalog')
    } catch (error) {
        res.render(`/photos/${photoId}/details`, {error: 'Unsuccessfull delete!'});
    }
})
module.exports = router;
