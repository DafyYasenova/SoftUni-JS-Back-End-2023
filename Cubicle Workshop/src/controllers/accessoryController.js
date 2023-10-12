const router = require('express').Router();
const accessoryServices = require('../services/accessoryServices');

router.get('/create', (req, res) => {
    res.render('accessory/create');
});

router.post('/create', async (req, res) => {
    const { name, description, imageUrl } = req.body;
    try {
        await accessoryServices.create({ name, description, imageUrl });

        res.redirect('/');

    } catch (error) {
        console.log('current error: ', error)
        const firstErrorMsg = Object.values(error.errors)[0].message;
        console.log(firstErrorMsg)
        res.status(404).render('accessory/create',{ errorMessage: firstErrorMsg })
    }


})
module.exports = router;  