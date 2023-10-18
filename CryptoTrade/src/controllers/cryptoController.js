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

    //for buy:
    const isBuyer = crypto.buyCrypto?.some(id => id == req.user?._id);
    res.render('crypto/details', { crypto, isOwner, isBuyer });

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

    // for selected paymentMethod:
    const paymentMetodsMap = {
        'crypto-wallet': 'Crypto Wallet',
        'credit-card': 'Credit Card',
        'debit-card': 'Debit Card',
        'paypal': 'PayPal',
    }

    const paymentMethods = Object.keys(paymentMetodsMap).map(key => ({
        value: key,
        label: paymentMetodsMap[key],
        isSelected: crypto.paymentMethod == key,
    }));


    res.render('crypto/edit', { crypto, paymentMethods });
});

router.post('/:cryptoId/edit', isAuth, async (req, res) => {
    const cryptoData = req.body;
    const cryptoId = req.params.cryptoId;

    try {
        await cryptoService.edit(cryptoId, cryptoData);

        res.redirect(`/crypto/${cryptoId}/details`);

    } catch (error) {

        res.render('crypto/edit', { error: 'Unable to update', ...cryptoData })
    }
});

router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;

    await cryptoService.buy(req.user._id, req.params.cryptoId);

    res.redirect(`/crypto/${cryptoId}/details`);
});

router.get('/search', async (req, res) => {

    const { name, paymentMethod } = req.query;
    // console.log( req.query)
    const crypto = await cryptoService.search(name, paymentMethod);


    res.render('crypto/search', { crypto });
})


module.exports = router;
