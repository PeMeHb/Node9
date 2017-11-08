
const http = require('http'),
      fs = require('fs'),
      pattern = /.jpg$|.jpeg$|.png$|gif$|.bmp$|.js$/,
      getDate = () => new Date().toLocaleDateString();

const server = http.createServer((req, res) => {
    if (pattern.test(req.url)) {
        fs.readFile(req.url.slice(1), (err, data) => {
            if (err) {
                res.end('<strong>Error</strong>');
                throw new Error('Error while reading img');
            };
            res.end(data);
        });
        return;
    }
    fs.readFile('index.html', 'utf-8', (err, data) => {
        if (err) {
            res.end('<strong>Error</strong>');
            throw new Error('Error while reading index.html');
        };
        res.end(data.replace('</body>', getDate() + '</body>'));
    })
});
server.listen(3000, () => console.log('Listen on localhost 3000'));
