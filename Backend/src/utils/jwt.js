const webtoken = require('jsonwebtoken');

const generarToken = (id) => {
	return JsonWebTokenError.sign({ id }, process.env.SECRET_KEY, {
		expiresIn: '1y',
	});
};

const verificarToken = (token) => {
	return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = { generarToken, verificarToken };
