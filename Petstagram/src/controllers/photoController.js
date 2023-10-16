const router = require('express').Router();

const photoServices = require('../services/photoServices');

const { extractErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/catalog', async (req, res) => {

    const photos = await photoServices.getAll().lean();

    res.render('photos/catalog', { photos });
})

router.get('/create', isAuth, (req, res) => {

    res.render('photos/create');
    // res.redirect('/photos/catalog')

});


router.post('/create', isAuth, async (req, res) => {
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
    const photo = await photoServices.getOne(photoId).populate('comments.user').lean();

    const isOwner = req.user?._id == photo.owner._id;

    res.render('photos/details', { photo, isOwner });

});

router.get('/:photoId/delete', isAuth, async (req, res) => {
    const photoId = req.params.photoId;

    try {
        await photoServices.delete(photoId);
        res.redirect('/photos/catalog')
    } catch (error) {
        res.render(`photos/${photoId}/details`, { error: 'Unsuccessfull delete!' });
    }
});

router.get('/:photoId/edit', isAuth, async (req, res) => {

    const photo = await photoServices.getOne(req.params.photoId).lean();

    res.render('photos/edit', { photo });
});

router.post('/:photoId/edit', isAuth, async (req, res) => {
    const photoData = req.body;
    const photoId = req.params.photoId;

    try {
        await photoServices.edit(photoId, photoData);

        res.redirect(`/photos/${photoId}/details`);

    } catch (error) {
        res.render('photos/edit', { error: 'Unable to update', ...photoData })
    }
});

router.post('/:photoId/comments', isAuth, async (req, res) => {

    const photoId = req.params.photoId;
    const { message } = req.body;

    const user = req.user._id;

    try {
        await photoServices.addComment(photoId, { user, message });
        res.redirect(`/photos/${photoId}/details`);
    } catch (error) {
        res.render(`photos/${photoId}/details`, { error: extractErrorMessage(error) })
    }
});

module.exports = router;
