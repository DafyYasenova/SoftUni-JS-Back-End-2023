const http = require('http');
const homeHtml = require('./views/home/index');
const siteCss = require('./content/styles/site')


const server = http.createServer(async (req, res) =>{
const url = req.url;

console.log('server is called');

if(url == '/'){
    res.writeHead(200, {
    'Content-Type': 'text/html'
})
res.write(homeHtml);

} else if(url == '/content/styles/site.css'){
    res.writeHead(200, { 
        'Content-Type': 'text/css'
    })
    res.write(siteCss);

}

res.end();
});

server.listen(5000, () => console.log(`Server is running on port 5000...`));
