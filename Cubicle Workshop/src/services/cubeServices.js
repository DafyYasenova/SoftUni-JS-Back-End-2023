const uniqid = require('uniqid');
const cubes = [
    {
        name: 'Gan356 Air SM', 
        desctiption: '',
        imageUrl: "https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg",
        difficultyLevel: 3,
    },
    {
        name: 'Eco-Dark', 
        desctiption: '',
        imageUrl: 'https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg',
        difficultyLevel: 6,
    },
    {
        name: 'Pyraminx',
        desctiption: '',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61izOzq%2BBAL._SY355_.jpg',
        difficultyLevel: 1,
    },
    {
        name: 'Megaminx',
        desctiption: '',
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

exports.getAll = () => cubes.slice();