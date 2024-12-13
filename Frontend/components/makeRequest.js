import createMessage from './createMessage';
import loading from './loading';

const makeRequest = async (url, options) => {
	loading(true);

	const request = new Request(url, options);
	const response = await fetch(request);
	const status = await handleResponse(response);

	loading(false);
	return status;
};

//Crea mensajes de advertencia y devuelve un objeto
//Indicando si la petición es válida y el json.
const handleResponse = async (response) => {
	const json = await response.json();
	const status = {
		success: false,
		json: json,
	};
	switch (response.status) {
		case 400:
			createMessage('red', json);
			break;
		case 404:
			createMessage('red', json);
			break;
		case 500:
			createMessage('red', json);
			break;
		case 200:
			status.success = true;
		case 201:
			status.success = true;
	}
	return status;
};

export default makeRequest;
