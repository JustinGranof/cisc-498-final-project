const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('username');
const password = document.getElementById('contactinfo');
const password2 = document.getElementById('medinfo');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const firstname = firstname.value.trim();
	const lastname = lastname.value.trim();
	const contactinfo = contactinfo.value.trim();
	const medinfo = medinfo.value.trim();
	
	if(firstname === '') {
		setErrorFor(firstname, 'Username cannot be blank');
	} else {
		setSuccessFor(firstname);
	}
	
	if(lastname === '') {
		setErrorFor(lastname, 'Username cannot be blank');
	} else {
		setSuccessFor(lastname);
	}
	
	if(contactinfo === '') {
		setErrorFor(contactinfo, 'Password cannot be blank');
	} else {
		setSuccessFor(contactinfo);
	}
	
	if(medinfo === '') {
		setErrorFor(medinfo, 'Password cannot be blank');
	} else {
		setSuccessFor(medinfo);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	



