const router = require('express').Router();

const cubeServices = require('../services/cubeServices');
const accessoryServices = require('../services/accessoryServices');


// Path = /cubes/create
router.get('/create', (req, res) => {
    console.log(cubeServices.getAll());
    res.render('create');
});

router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await cubeServices.create({
        name, description, imageUrl, difficultyLevel: Number(difficultyLevel)
    });

    res.redirect('/');
})

router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeServices.getOne(req.params.cubeId).lean();

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('details', { cube });

});


router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeServices.getOne(req.params.cubeId).lean();
    const accessories = await accessoryServices.getAll().lean();

    const hasAccessories = accessories.length > 0;
    res.render('accessory/attach', { cube, accessories , hasAccessories })
});

module.exports = router;

