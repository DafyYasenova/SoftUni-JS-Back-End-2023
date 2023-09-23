const router = require('express').Router();

const cubeServices = require('../services/cubeServices');

// Path = /cubes/create
router.get('/create', (req, res) => {
    console.log(cubeServices.getAll());
    res.render('create');
});

router.post('/create', (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    cubeServices.create({
        name, description, imageUrl, difficultyLevel: Number(difficultyLevel)
    });

    res.redirect('/');
})

router.get('/:cubeId/details', (req, res) => {
    const cube = cubeServices.getOne(req.params.cubeId);

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('details', { cube });
});

module.exports = router;
