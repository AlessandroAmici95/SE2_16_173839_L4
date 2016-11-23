var toggleForm = function(formID){
	var form = document.getElementById(formID);
	if(form.style.display == 'block'){
		form.style.display = 'none';
	}
	else{
		form.reset();
		form.style.display = 'block';
	}
};