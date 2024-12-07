const webtoken = require('jsonwebtoken');

const generarToken = (id) => {
	return webtoken.sign({ id }, process.env.SECRET_KEY, {
		expiresIn: '1y',
	});
};

const verificarToken = (token) => {
	return webtoken.verify(token, process.env.SECRET_KEY);
};

module.exports = { generarToken, verificarToken };
