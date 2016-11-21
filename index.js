//Libraries
var http = require('http');
var express = require('express');
//import il modulo del MODEL: contiene la gestione dei dati
var datamanger = require('./datamanager.js');
						 
//import il modulo per la gestione dei template: VIEW
var bind = require('bind');

//var miomodulo = require("./modulo.js");



var emp = new datamanger.Employee(5,'carlo', 'bianchi', 3, 1000);

//instantiate express
var app = express(); 

//listen in a specific port
app.set('port', (process.env.PORT || 1555));

//server for the client-side script
app.use('/script',express.static('client_scripts'));

//create a server
app.get('/', function(request, response) 
{
	bind.toFile('tpl/home.tpl',emp,
    function(data){
        //HTML head(type of the page)
        response.writeHead(200, {'Content-Type': 'html'});
        //HTML content
        response.end(data);
    });
  	
});

//create a server
app.post('/', function(request, response) 
{
	bind.toFile('tpl/home.tpl',emp,
    function(data){
        //HTML head(type of the page)
        response.writeHead(200, {'Content-Type': 'html'});
        //HTML content
        response.end(data);
    });
});

 
//listen in a specific port
app.listen(1555, '127.0.0.1');

//check status
console.log('Server running at http://127.0.0.1:1555/')

//per farlo partire chiamare in console