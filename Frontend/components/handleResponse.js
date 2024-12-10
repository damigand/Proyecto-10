import createMessage from './createMessage';

const handleResponse = async (response) => {
	const json = await response.json();
	const object = {
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
			object.success = true;
		case 201:
			object.success = true;
	}
	return object;
};

export default handleResponse;
