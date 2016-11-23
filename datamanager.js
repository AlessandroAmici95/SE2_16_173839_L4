/**
 * Funzione che controlla che una variabile sia un intero maggiore di 0
 * @param a - una variabile
 * @returns {boolean} - Vero se a è un intero maggiore di 0, falso altrimenti
 */
var isPositiveInteger = function(a){
	var result = false;
	if(typeof a ==='number' && (a % 1) === 0){
		if(isFinite(a) && (a > 0)){
			result = true;
		}
	}
	return result;
};

/**
 * Funzione che controlla che una stringa sia composta solo da caratteri alfabetici e non sia vuota
 * @param str - una variabile
 * @returns {boolean} - Vero se str è una stringa non-vuota di caratteri alfabetici, falso altrimenti
 */
var isAlphaString = function(str){
	return /^[a-zA-Z]+$/.test(str);
};

var isEmptyString = function(str){
	var result = true;
	if(!isFinite(new Number(str))){
        result =  !(str.replace("\s", "").length > 0);
	}
	else{
		result  = false;
	}
	return result;
};

//oggetto che contiene i dati da inserire nel template
/**
 * Oggetto che descrive un employee
 * @param ID
 * @param name
 * @param surname
 * @param level
 * @param salary
 * @constructor
 */
function Employee(ID, name, surname, level, salary){
	this.ID = ID;
	this.name = name;
	this.surname = surname;
	this.level = level;
	this.salary = salary;

	this.isValid = function(){ //dice se i dati dell'employee sono corretti
		var result  = false;
		if(isEmptyString(this.ID) || isPositiveInteger(this.ID)){
			if(isPositiveInteger(this.level)){
				if(isPositiveInteger(this.salary)){
					if(isAlphaString(this.name)){
						if(isAlphaString(this.surname)){
							result = true;
						}
					}
				}
			}
		}
		return result;
	}
};
/**
 * Oggetto che descrive un employer, con la lista di employee e i metodi per la gestione di tale lista
 * @constructor
 */
function Employer(){
	this.employeeList = [];//la lista di employee
	this.autoIncrementKey = 1;//la variabile autoincrementante per assegnare gli identificatori

	//Ritorna l'indice di employeeList dell'employee con ID = empId, -1 se non tale employee non esiste
	this.getIndexOfEmployeeId = function(empId){
		var index = -1;
		for(i in this.employeeList){
			if(this.employeeList[i].ID == empId){
				index = i;
				break;
			}
		}
		return index;
	};

	//Inserisce un employee nella lista, fa l'update se è già presente un employee
	// con lo stesso ID e mette un ID se non è specificato
	this.insertUpdateEmployee = function(employee){
		var result = true;
		if(!employee.isValid()){
			result = false;
		}
		else{

			if(isEmptyString(employee.ID)){
                while(this.getIndexOfEmployeeId(this.autoIncrementKey) != -1){
                    this.autoIncrementKey += 1;
                }
                employee.ID = this.autoIncrementKey;
                this.employeeList.push(employee);
                this.autoIncrementKey +=1;
			}
			else{
                var index = this.getIndexOfEmployeeId(employee.ID);
				if(index == -1){
					this.employeeList.push(employee);
                }
                else{
                    this.employeeList[index] = employee;
                }
            }
		}
		return result;
	};

	//Ritorna l'employee con ID = empID, se non esiste ritorna un employee fittizio non valido.
	this.getEmployeeFromId = function(empId){
		var emp;
		var index = this.getIndexOfEmployeeId(empId);
		if( index == -1){
			emp = new Employee(0,0,0,0,0);
		}
		else{
			return this.employeeList[index];
		}
		return emp;
	};
	//Funzione che cancella l'employee di ID = empID e
	//ritorna un messaggio che indica la buona uscita o meno dell'operazione
	this.deleteEmployeeFromId = function(empID){
		var message;
		if(!isPositiveInteger(empID)){
			message = "L' ID dell' employee non è del formato corretto";
		}
		else{
			var i = this.getIndexOfEmployeeId(empID);
			if(i == -1){
				message = "Non esiste nessun Employee con questo l'ID =" + empID;
			}
			else{
				message = "Employee eliminato correttamente";
				this.employeeList.splice(i,1);
			}
		}
		return message;
	}
}

exports.Employee = Employee;
exports.Employer = Employer;
exports.isPositiveInteger = isPositiveInteger;