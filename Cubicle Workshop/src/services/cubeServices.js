const Cube = require('../models/Cube');


const uniqid = require('uniqid');

exports.create = async (cubeData) => {
    const cube = new Cube(cubeData);

    await cube.save();
    return cube;
}

exports.getAll = async (search, from, to) => {
    let findCubes = await Cube.find().lean();

    if (search) {
        findCubes = findCubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
findCubes = findCubes.filter(cube => cube.difficultyLevel >= Number(from));
    }

    if (to) {
findCubes = findCubes.filter(cube => cube.difficultyLevel <= Number(to));
    }
    return findCubes;
}
exports.getOne = (cubeId) => Cube.findById(cubeId) //lean();