import createMessage from '@c/createMessage/createMessage.js';

//input es el valor del input.
//Field es el nombre del campo para el mensaje de error.
export const checkTextInput = (
	input,
	field,
	minLength = 0,
	maxLength = 999,
	optional = false
) => {
	if (!optional && !input) {
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

	if (input.length > maxLength) {
		const color = 'red';
		const message = `"${field}" no puede pasar los ${maxLength} caracteres.`;
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

export const checkDatetimeInput = (date, time) => {
	if (!date) {
		const color = 'red';
		const message = `Necesitas establecer una fecha.`;
		createMessage(color, message);
		return false;
	}

	if (!time) {
		const color = 'red';
		const message = `Necesitas establecer una hora.`;
		createMessage(color, message);
		return false;
	}

	try {
		const newDate = new Date(`${date}T${time}`);
		const today = new Date();
		if (newDate < today) {
			const color = 'red';
			const message = `El evento debe ocurrir en el futuro.`;
			createMessage(color, message);
			return false;
		}

		return `${date}T${time}`;
	} catch (error) {
		const color = 'red';
		const message = `La fecha o la hora es inválida.`;
		createMessage(color, message);
		return false;
	}
};
