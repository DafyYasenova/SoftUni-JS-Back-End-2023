const router = require('express').Router();
const accessoryServices = require('../services/accessoryServices');

router.get('/create', (req, res) => {
    res.render('accessory/create');
});

router.post('/create', async (req, res) => {
    const { name, description, imageUrl } = req.body;
    await accessoryServices.create({ name, description, imageUrl });


    res.redirect('/');
})
module.exports = router;  