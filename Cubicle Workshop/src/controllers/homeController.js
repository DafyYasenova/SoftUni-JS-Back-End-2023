const router =  require('express').Router();
const cubeServices = require('../services/cubeServices');

router.get ('/', (req, res)=>{
    const cubes = cubeServices.getAll();

    res.render('index', {cubes})
});

router.get('/about', (req, res) =>{
    res.render('about')
});

router.get('/404', (req, res)=>{
    res.render('404');
});

module.exports = router;