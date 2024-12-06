const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generarToken } = require('../../utils/jwt');

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json(`Error (getAllUsers): ${error}`);
	}
};

const getUserById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json(`Error (getUserById): ${error}`);
	}
};

const register = async (req, res, next) => {
	try {
		if (!req.body.username) return res.status(404).json('Necesitas un nombre de usuario.');

		if (!req.body.password) return res.status(404).json('Necesitas una contraseña.');

		const check = await User.findOne({ username: req.body.username });
		if (check) return res.status(404).json('El nombre de usuario no está disponible.');

		const user = new User(req.body);
		user.save();

		return res.status(201).json(user);
	} catch (error) {
		return res.status(500).json(`Error (register): ${error}`);
	}
};

const login = async (req, res, next) => {
	try {
		const user = User.findOne({ username: req.body.username });
		if (!user) return res.status(404).json('No hay ningún usuario con ese nombre.');

		const passCheck = bcrypt.compareSync(req.body.password, user.password);
		if (passCheck) {
			const token = generarToken(user._id);
			return res.status(200).json(token);
		}

		return res.status(404).json('Contraseña incorrecta.');
	} catch (error) {
		return res.status(500).json(`Error (login): ${error}`);
	}
};

const editUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const oldUser = await User.findById(id);

		if (req.user.id == oldUser.id) {
			const change = {
				username: req.body.username || oldUser.username,
				email: req.body.email || oldUser.email,
			};

			const newUser = await User.findByIdAndUpdate(id, change, { new: true });
			return res.status(200).json(newUser);
		}

		return res.status(404).json('No puedes editar este usuario.');
	} catch (error) {
		return res.status(500).json(`Error (editUser): ${error}`);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (req.user.id == id) {
			await User.findByIdAndDelete(id);
			return res.status(200).json('Usuario borrado correctamente.');
		}
		return res.status(200).json('No puedes borrar este usuario.');
	} catch (error) {
		return res.status(500).json(`Error (deleteUser): ${error}`);
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	register,
	login,
	editUser,
	deleteUser,
};
