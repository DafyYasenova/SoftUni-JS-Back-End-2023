const uniqid = require('uniqid');
const cubes = [
    {
        id: 't5ue14mglmvzkpo',
        name: 'Gan356 Air SM',
        desctiption: 'Gan356 Air SM is a cool!',
        imageUrl: "https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg",
        difficultyLevel: 3,
    },
    {
        id: 't5ue18mglmvzkpo',
        name: 'Eco-Dark',
        desctiption: 'Eco-Dark is a classic',
        imageUrl: 'https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg',
        difficultyLevel: 6,
    },
    {
        id: '75ue14mglmvzkpo',
        name: 'Pyraminx',
        desctiption: 'Pretty Pyraminx',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61izOzq%2BBAL._SY355_.jpg',
        difficultyLevel: 1,
    },
    {
        id: 'csde14mglmvzkpo',
        name: 'Megaminx',
        desctiption: 'Great cube!',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61HpQqVQ37L._SY355_.jpg',
        difficultyLevel: 3,
    },
];



exports.create = (cubeData) => {
    const newCube = {
        id: uniqid(),
        ...cubeData
    }
    cubes.push(newCube);

    return newCube;
}

exports.getAll = (search, from, to) => {
    let findCubes = cubes.slice();

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
exports.getOne = (cubeId) => cubes.find(cube => cube.id == cubeId)