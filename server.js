var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var stringifyFile;

var server = app.listen(3000);

app.use(bodyParser.json());

app.get('/getNote', (req, res) => {
    fs.readFile('./test.json', 'utf8', (err, data) => {
        if (err) throw err;
        stringifyFile = data;
        res.send(data);
    });
});

app.post('/updateNote/:note', (req, res) => {

    ///to prevent situation that user is going directly to endpoint /updateNote/:note 
    //whitout going first to endpoint /getNote
    if (stringifyFile  === 'undefined' ) {
    
        fs.readFile('./test.json', 'utf8', (err, data) => {
            if (err) throw err;
            stringifyFile = data;
        });
    }
    
    stringifyFile = req.params.note;
    fs.writeFile('./test.json', stringifyFile, (err) => {
        if (err) throw err;
        console.log('file updated');
        res.send('File updated: ' + stringifyFile);
    });
});

