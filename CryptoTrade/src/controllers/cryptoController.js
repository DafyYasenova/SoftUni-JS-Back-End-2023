const router = require('express').Router();

const cryptoService = require('../services/cryptoService');

const { extractErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');




router.get('/create', isAuth, (req, res) => {

    res.render('crypto/create');
    
});

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = { ...req.body, owner: req.user._id };

    try {

        await cryptoService.create(cryptoData);
        res.redirect('/crypto/catalog');

    } catch (error) {
        res.render('crypto/create', { error: extractErrorMessage(error) });

    }
});

router.get('/catalog', async (req, res) => {

    const crypto = await cryptoService.getAll().lean();

    res.render('crypto/catalog', { crypto }); 
});

router.get('/:cryptoId/details', async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const crypto = await cryptoService.getOne(cryptoId).lean();

    const isOwner = req.user?._id == crypto.owner._id;

    res.render('crypto/details', { crypto, isOwner });

});

router.get('/:cryptoId/delete', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {
        await cryptoService.delete(cryptoId);
        res.redirect('/crypto/catalog')
    } catch (error) {
        res.render(`crypto/${cryptoId}/details`, { error: 'Unsuccessfull delete!' });
    }
});

router.get('/:cryptoId/edit', isAuth, async (req, res) => {

    const crypto = await cryptoService.getOne(req.params.cryptoId).lean();

    res.render('crypto/edit', { photo });
});

router.post('/:crypto/edit', isAuth, async (req, res) => {
    const cryptoData = req.body;
    const cryptoId = req.params.cryptoId;

    try {
        await cryptoService.edit(cryptoId, cryptoData);

        res.redirect(`/crypto/${cryptoId}/details`);

    } catch (error) {
        res.render('crypto/edit', { error: 'Unable to update', ...cryptoData })
    }
});




// router.post('/:cryptoId/comments', isAuth, async (req, res) => {

//     const cryptoId = req.params.cryptoId;
//     const { message } = req.body;

//     const user = req.user._id;

//     try {
//         await cryptoService.addComment(crypto, { user, message });
//         res.redirect(`/crypto/${cryptoId}/details`);
//     } catch (error) {
//         res.render(`crypto/${cryptoId}/details`, { error: extractErrorMessage(error) })
//     }
// });

module.exports = router;
