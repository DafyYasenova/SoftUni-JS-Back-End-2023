const router = require('express').Router();

const creatureService = require('../services/creatureService');

const { extractErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/create', isAuth, (req, res) => {

    res.render('creatures/create');

});

router.post('/create', isAuth, async (req, res) => {
    const creatureData = { ...req.body, owner: req.user._id };
    console.log(req.body)
    try {

        await creatureService.create(creatureData);
        res.redirect('/creatures/catalog');

    } catch (error) {

        res.render('creatures/create', { error: extractErrorMessage(error) });

    }
});

router.get('/catalog', async (req, res) => {

    try {
        const creatures = await creatureService.getAll().lean();

        res.render('creatures/catalog', { creatures });


    } catch (error) {
        res.render('creatures/catalog', { error: extractErrorMessage(error) });
    }
});

router.get('/:creatureId/details', async (req, res) => {
    try {
        console.log('params::', req.params)
        const creatureId = req.params.creatureId;

        const creature = await creatureService.getOne(creatureId).lean();

        const isOwner = req.user?._id == creature.owner._id;

        const isVoted = creature.votes.some((vote) => vote._id.toString() == req.user?._id);
        const usersVoted = creature.votes.map((vote) => vote.email).join(', ');
        
        res.render(`creatures/details`, { creature, isOwner, isVoted, usersVoted });

    } catch (error) {
        res.render('creatures/details', { error: extractErrorMessage(error) });

    }
});

router.get('/:creatureId/delete', isAuth, async (req, res) => {
    const creatureId = req.params.creatureId;

    try {
        await creatureService.delete(creatureId);
        res.redirect('/creatures/catalog')
    } catch (error) {
        res.render(`creatures/${creatureId}/details`, { error: 'Unsuccessfull delete!' });
    }
});

router.get('/:creatureId/edit', isAuth, async (req, res) => {

    try {
        const creature = await creatureService.getOne(req.params.creatureId).lean();

        res.render('creatures/edit', { creature, });

    } catch (error) {
        res.render(`creatures/${req.params.creatureId}/edit`, { error: extractErrorMessage(error) });

    }
});



router.post('/:creatureId/edit', isAuth, async (req, res) => {
    const creatureData = req.body;
    const creatureId = req.params.creatureId;

    try {
        await creatureService.edit(creatureId, creatureData);

        res.redirect(`/creatures/${creatureId}/details`);

    } catch (error) {

        res.render('creatures/edit', { error: 'Unable to update', ...cryptoData })
    }
});

router.get('/:creatureId/vote', isAuth, async (req, res) => {

    const creatureId = req.params.creatureId;
    const userId = req.user._id;
    try {

        await creatureService.getVote(creatureId, userId);

        res.render(`creatures/${creatureId}/details`);

    } catch (error) {
        return res.render('404', { error: extractErrorMessage(error) })
    }
    res.redirect(`/creatures/${creatureId}/details`);
});



module.exports = router;
