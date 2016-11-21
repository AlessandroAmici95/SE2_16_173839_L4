

//oggetto che contiene i dati da inserire nel template
function Employee(ID, name, surname, level, salary){
	this.ID = ID;
	this.name = name;
	this.surname = surname;
	this.level = level;
	this.salary = salary
}

exports.Employee = Employee;