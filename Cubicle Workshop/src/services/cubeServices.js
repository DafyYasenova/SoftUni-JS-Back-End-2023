const uniqid = require('uniqid');
const cubes = [];



exports.create = (cubeData) =>{
    const newCube = {
        id: uniqid(),
        ...cubeData
    }
cubes.push(newCube);

return newCube;
}

exports.getAll = () => cubes.slice();