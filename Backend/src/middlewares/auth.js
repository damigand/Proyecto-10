const User = require('../api/models/User');
const { verificarToken } = require('../utils/jwt');

const isAuth = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const parsedToken = token.replace('Bearer ', '');

		const { id } = verificarToken(parsedToken);
		const user = await User.findById(id).select('-password');

		req.user = user;
		next();
	} catch (error) {
		return res.status(400).json('No tienes autorización. ¿Has probado a iniciar sesión?');
	}
};

module.exports = { isAuth };
