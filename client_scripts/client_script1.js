var toggleForm = function(formID){
	var form = document.getElementById(formID);
	if(form.style.display == 'block'){
		form.style.display = 'none';
	}
	else{
        var elements = form.elements;
        for(i in elements){
        	if(elements[i].type != 'submit'){
                elements[i].value = '';
			}
        }
		form.style.display = 'block';
	}
};