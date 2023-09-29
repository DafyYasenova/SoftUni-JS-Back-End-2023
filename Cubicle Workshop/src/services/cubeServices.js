const Cube = require('../models/Cube');
// const uniqid = require('uniqid');

exports.create = async (cubeData) => {
    const cube = new Cube(cubeData);

    await cube.save();
    console.log(cube)
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
exports.getOne = (cubeId) => Cube.findById(cubeId).populate('accessories');  //lean();

exports.attachAccessory = async (cubeId, accessoryId) => {

    const cube = await Cube.findById(cubeId);
    cube.accessories.push(accessoryId);

    return cube.save();

    // 2 way: 
    return Cube.findByIdAndUpdate(cubeId, { $push: { accessories: accessoryId } })

}