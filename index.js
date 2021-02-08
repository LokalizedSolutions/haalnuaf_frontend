var express = require('express');
var server = express();
const path = require('path')
server.use('/', express.static(__dirname + '/dist'));
server.use(express.static(__dirname + '/public'));


server.use(function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, './dist')});
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, console.log(`Server started on port ${PORT}`));