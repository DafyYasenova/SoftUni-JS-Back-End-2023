const router = require('express').Router();

const cubeServices = require('../services/cubeServices');
const accessoryServices = require('../services/accessoryServices');
const { getDifficultyOptions } = require('../utils/viewHelpers');


// Path = /cubes/create
router.get('/create', (req, res) => {
    // console.log(cubeServices.getAll());

    res.render('cubes/create');
});

router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await cubeServices.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
        owner: req.user._id,
    });

    res.redirect('/');
})

router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeServices.getOneWithAccessories(req.params.cubeId).lean();

    if (!cube) {
        return res.redirect('/404');
    }

    const isOwner = cube.owner?.toString() === req.user._id;
    console.log(isOwner)
    res.render('cubes/details', { cube, isOwner });
});


router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeServices.getOneWithAccessories(req.params.cubeId).lean();
    const accessories = await accessoryServices.getRest(cube.accessories).lean();

    const hasAccessories = accessories.length > 0;
    res.render('accessory/attach', { cube, accessories, hasAccessories })
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const { accessory: accessoryId } = req.body;

    const cubeId = req.params.cubeId;
    await cubeServices.attachAccessory(cubeId, accessoryId)

    res.redirect(`/cubes/${cubeId}/details`);

});

router.get(`/:cubeId/delete`, async (req, res) => {
    const cube = await cubeServices.getOne(req.params.cubeId).lean();
    const options = getDifficultyOptions(cube.difficultyLevel)
    res.render('cubes/delete', { cube, options });
});

router.post('/:cubeId/delete', async (req, res) => {
    await cubeServices.delete(req.params.cubeId);

    res.redirect('/');
});



router.get('/:cubeId/edit', async (req, res) => {
    const cube = await cubeServices.getOne(req.params.cubeId).lean();

    const options = getDifficultyOptions(cube.difficultyLevel);
    res.render('cubes/edit', { cube, options });
});

router.post('/:cubeId/edit', async (req, res) => {
    const cubeData = req.body;

    await cubeServices.update(req.params.cubeId, cubeData);

    res.redirect(`/cubes/${req.params.cubeId}/details`);
});

module.exports = router;

