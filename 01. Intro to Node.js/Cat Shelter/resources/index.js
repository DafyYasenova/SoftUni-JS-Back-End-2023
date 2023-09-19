const http = require('http');
const fs = require('fs/promises');


const cats = [
    {
        id: 1,
        name: 'Pretty Kitty',
        breed: 'Bombay Cat',
        imageUrl: 'https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
        id: 2,
        name: 'Sweety Cat',
        breed: 'Bombay Cat',
        imageUrl: 'https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=2000',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
        id: 3,
        name: 'Grey Cat',
        breed: 'Bombay Cat',
        imageUrl: 'https://straycatalliance.org/wp-content/uploads/2022/10/feat-image-kitten-4.jpg',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
        id: 4,
        name: 'Perfectly Cat',
        breed: 'Bombay Cat',
        imageUrl: 'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/09/08/142774.jpg',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
];


const server = http.createServer(async (req, res) => {


    console.log(req.url);

    if (req.url == '/') {
        const homeHtml = await fs.readFile('./views/home/index.html', 'utf-8');
        const catHtml = await fs.readFile('./views/cat.html', 'utf-8');


        const catsHtml = cats.map(cat => {
            let result = catHtml;

            Object.keys(cat).forEach(key => {
                result = result.replaceAll(`{{${key}}}`, cat[key])
            })

            return result;
        }).join('');

        const homeResult = homeHtml.replace('{{cats}}', catsHtml)

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(homeResult);

    } else if (req.url == '/content/styles/site.css') {
        const siteCss = await fs.readFile('./content/styles/site.css')
        res.writeHead(200, {
            'Content-Type': 'text/css'
        })
        res.write(siteCss);

    } else if (req.url == '/cats/add-breed') {
        const addBreedHtml = await fs.readFile('./views/addBreed.html', 'utf-8');

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(addBreedHtml);


    } else if (req.url == '/cats/add-cat') {
        const addCatHtml = await fs.readFile('./views/addCat.html', 'utf-8');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(addCatHtml);

    } else  {
        const page404Html = await fs.readFile('./views/page404.html', 'utf-8');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(page404Html)
    }

    res.end();
});

server.listen(5000, () => console.log(`Server is running on port 5000...`));
