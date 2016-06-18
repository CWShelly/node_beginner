
const querystring = require('querystring');
const fs = require('fs');
const formidable = require('formidable');
var exec = require('child_process').exec;

function start(response){
    console.log('Request handler "start" was called');
    var body ='<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />' +
        '</head>' +
        '<body> ' +
        '<form action="/upload" enctype= "multiplart/form-data" method="post">' +
        '<input type "file" name = "upload" multiple = "multiple">' +
        '<input type = "submit" value="sumbit text"/>' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();

}

function upload(response){
    console.log('Request handler "upload" was called');

    var form = new formidable.IncomingForm();
    console.log('about to parse');
    form.parse(request, function(error, fields, files){
        console.log('done parsing');
        fs.renameSync(files.upload.path, '/tmp/dice.png');
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('received image:<br/>');
        reponse.write('<img src=\'/show\'>');
        response.end();
    });

}

function show(response){
    console.log('request handler \'show\' was called');
    response.writeHead(200, {'Content-Type': 'image/png'});
    fs.createReadStream(__dirname + '/tmp/dice.png').pipe(response);
}
exports.start = start;
exports.upload = upload;
exports.show = show;
