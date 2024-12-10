import handleResponse from './handleResponse';
import loading from './loading';

const makeRequest = async (url, options) => {
	loading(true);

	const request = new Request(url, options);
	const response = await fetch(request);
	const obj = await handleResponse(response);

	loading(false);
	return obj;
};

export default makeRequest;
