//Libraries
var http = require('http');
//import il modulo del MODEL: contiene la gestione dei dati
var datamanger = require('./datamanager.js');
						 
//import il modulo per la gestione dei template: VIEW
var bind = require('bind');

//var miomodulo = require("./modulo.js");



var emp = new datamanger.Employee(5,'carlo', 'bianchi', 3, 1000);

//create a server
var server = http.createServer(function(req,res){
	//faccio il bind dei dati sul template
    bind.toFile('tpl/home.tpl',emp,
    function(data){
        //HTML head(type of the page)
        res.writeHead(200, {'Content-Type': 'html'});
        //HTML content
        res.end(data);
    });
    
});

//listen in a specific port
server.listen(1337, '127.0.0.1');

//check status
console.log('Server running at http://127.0.0.1:1337/')

//per farlo partire chiamare in console