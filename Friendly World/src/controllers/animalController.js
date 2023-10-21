const router = require('express').Router();

const animalService = require('../services/animalService');

const { extractErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/create', isAuth, (req, res) => {

    res.render('animals/create');

});

router.post('/create', isAuth, async (req, res) => {
    const animalData = { ...req.body, owner: req.user._id };
    // console.log(req.body)
    try {

        await animalService.create(animalData);
        res.redirect('/animals/catalog');

    } catch (error) {

        res.render('animals/create', { error: extractErrorMessage(error) });

    }
});

router.get('/catalog', async (req, res) => {

    try {
        const animals = await animalService.getAll().lean();

        res.render('animals/catalog', { animals });


    } catch (error) {
        res.render('animals/catalog', { error: extractErrorMessage(error) });
    }
});

router.get('/:animalId/details', async (req, res) => {
    try {
        // console.log('params::', req.params)
        const animalId = req.params.animalId;

        const animal = await animalService.getOne(animalId).lean();
        //console.log('animal', animal)
        const isOwner = req.user?._id == animal.owner._id;

        const isDonation = animal.donations.some((donate) => donate._id.toString() == req.user?._id);
        const usersVoted = animal.donations.map((donate) => donate.email).join(', ');

        res.render(`animals/details`, { animal, isOwner, isDonation });

    } catch (error) {
        res.render('animals/details', { error: extractErrorMessage(error) });

    }
});

router.get('/:animalId/delete', isAuth, async (req, res) => {
    const animalId = req.params.animalId;

    try {
        await animalService.delete(animalId);
        res.redirect('/animals/catalog')
    } catch (error) {
        res.render(`catalog/${animalId}/details`, { error: 'Unsuccessfull delete!' });
    }
});

router.get('/:animalId/edit', isAuth, async (req, res) => {

    try {
        const animal = await animalService.getOne(req.params.animalId).lean();

        res.render('animals/edit', { animal, });

    } catch (error) {
        res.render(`animals/${req.params.animalId}/edit`, { error: extractErrorMessage(error) });

    }
});



router.post('/:animalId/edit', isAuth, async (req, res) => {
    const {name, years, kind, image, need, location, description} = req.body;
    const animalId = req.params.animalId;

    try {
        await animalService.edit(animalId, {name, years, kind, image, need, location, description});

        res.redirect(`/animals/${animalId}/details`);

    } catch (error) {

        res.render('animals/edit', { error: 'Unable to update', ...req.body })
    }
});

router.get('/:animalId/donate', isAuth, async (req, res) => {

    const animalId = req.params.animalId;
    const userId = req.user._id;
    try {

        await animalService.getVote(animalId, userId);

        res.render(`animals/${animalId}/details`);

    } catch (error) {
        return res.render('404', { error: extractErrorMessage(error) })
    }
    res.redirect(`/animals/${animalId}/details`);
});



module.exports = router;
