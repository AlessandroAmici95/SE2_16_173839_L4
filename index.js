//Libraries
var http = require('http');
var express = require('express');
//import il modulo del MODEL: contiene la gestione dei dati
var datamanger = require('./datamanager.js');
						 
//import il modulo per la gestione dei template: VIEW
var bind = require('bind');
var searchFormId = 'searchEmployeeForm';
var insertFormId = 'insertEmployeeForm';
//var miomodulo = require("./modulo.js");

console.log("ciao amico".replace(/\s/g, ""));

var employer = new datamanger.Employer();
employer.insertUpdateEmployee(new datamanger.Employee('', 'Mario', 'Rossi', 1,100));
employer.insertUpdateEmployee(new datamanger.Employee('', 'Marco', 'Bianchi', 2,200));
employer.insertUpdateEmployee(new datamanger.Employee('', 'Luca', 'Neri', 3,300));
employer.insertUpdateEmployee(new datamanger.Employee('', 'Alessio', 'Riva', 4,400));

var searchEmployee = function(employeeId, response){
    var emp = employer.getEmployeeFromId(employeeId);
    var message = "";
    var visibility = 'block';
    if(emp.ID == '' ){
        visibility = 'none';
        message =  "Non sono riuscito a trovare l'employee con id = " + employeeId;
    }
    console.log("id cercato = " + emp.ID);
    bind.toFile('tpl/home.tpl',{
        'visibility': visibility,
            'message':message,
            'ID' : emp.ID,
            'name' : emp.name,
            'surname' : emp.surname,
            'level' : emp.level,
            'salary' : emp.salary

        },
        function(data){
            //HTML head(type of the page)
            response.writeHead(200, {'Content-Type': 'html'});
            //HTML content
            response.end(data);
        }
    );
};

var deleteEmployee = function(empId, response){
    var message = employer.deleteEmployeeFromId(parseInt(empId));
    bind.toFile('tpl/home.tpl',{
        'message' : message
        },
        function(data){
            //HTML head(type of the page)
            response.writeHead(200, {'Content-Type': 'html'});
            //HTML content
            response.end(data);
        });
};

var insertEmployee = function(employee, response){
    var message;
    if(employer.insertUpdateEmployee(employee)){
        message = 'Employee inserito con successo';
    }
    else{
        message ='Employee non inserito, controlla i dati!';
    }
    bind.toFile('tpl/home.tpl',{
        'message' : message
        },
        function(data){
            //HTML head(type of the page)
            response.writeHead(200, {'Content-Type': 'html'});
            //HTML content
            response.end(data);
        }
    );
};

var emp = new datamanger.Employee('', '', '', '', '');

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


//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//create a server
app.post('/', function(request, response) 
{
    //se la request ha un body -> controllo che form è stato compilato
    if ( typeof request.body !== 'undefined' && request.body)
    {
        if ( typeof request.body.search !== 'undefined' && request.body.search){
            searchEmployee(request.body.employeeId, response);
            console.log('search');
        }
        else if(typeof request.body.delete !== 'undefined' && request.body.delete){
            deleteEmployee(request.body.employeeId, response);
            console.log('delete');

        }
        else if(typeof request.body.insert !== 'undefined' && request.body.insert){
            var rb = request.body;
            //console.log( Number(rb.id) + "  " + rb.empname + "  " +  rb.surname + "  " +  Number(rb.level) + "  " +   Number(rb.salary));
            var emp = new datamanger.Employee(Number(rb.id), rb.empname, rb.surname, Number(rb.level), Number(rb.salary));
            insertEmployee(emp,response);
            console.log('insert');
        }
    }
});

 
//listen in a specific port
app.listen(1555, '127.0.0.1');

//check status
console.log('Server running at http://127.0.0.1:1555/')

//per farlo partire chiamare in console