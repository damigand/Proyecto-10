import createMessage from '../createMessage/createMessage.js';

//input es el valor del input.
//Field es el nombre del campo para el mensaje de error.
export const checkTextInput = (input, field, minLength = 0) => {
	if (!input) {
		const color = 'red';
		const message = `"${field}" no puede estar vacío.`;
		createMessage(color, message);
		return false;
	}

	if (input.length < minLength) {
		const color = 'red';
		const message = `"${field}" necesita mínimo ${minLength} caracteres.`;
		createMessage(color, message);
		return false;
	}

	return true;
};

export const checkPassInput = (pass, repeatPass, field, minLength) => {
	if (!pass) {
		const color = 'red';
		const message = `"${field}" no puede estar vacío.`;
		createMessage(color, message);
		return false;
	}

	if (pass.length < minLength) {
		const color = 'red';
		const message = `"${field}" necesita mínimo ${minLength} caracteres.`;
		createMessage(color, message);
		return false;
	}

	if (!repeatPass) {
		const color = 'red';
		const message = `Tienes que repetir la contraseña.`;
		createMessage(color, message);
		return false;
	}

	if (pass !== repeatPass) {
		const color = 'red';
		const message = `Las contraseñas no coinciden.`;
		createMessage(color, message);
		return false;
	}

	return true;
};

export const checkEmailInput = (input) => {
	//Créditos de este RegEx: https://medium.com/@ryan_forrester_
	const regExPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const check = regExPattern.test(input);

	if (!check) {
		const color = 'red';
		const message = 'El correo no es válido. (ejemplo@gmail.com)';
		createMessage(color, message);
	}

	return check;
};
