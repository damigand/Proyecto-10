const User = require('../models/User');
const Event = require('../models/Event');
const bcrypt = require('bcrypt');
const { generarToken } = require('../../utils/jwt');
const { removeImg } = require('../../middlewares/cloudinary');

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find().select('-password');
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json(`Error (getAllUsers): ${error}`);
	}
};

const getUserById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id).select('-password');
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json(`Error (getUserById): ${error}`);
	}
};

const register = async (req, res, next) => {
	try {
		if (!req.body.usuario)
			return res.status(404).json('Necesitas un nombre de usuario.');

		if (!req.body.password)
			return res.status(404).json('Necesitas una contraseña.');

		const check = await User.findOne({ usuario: req.body.usuario });
		if (check)
			return res
				.status(404)
				.json('El nombre de usuario no está disponible.');

		const user = new User(req.body);
		user.save();

		return res.status(201).json('Usuario registrado con éxito.');
	} catch (error) {
		return res.status(500).json(`Error (register): ${error}`);
	}
};

const login = async (req, res, next) => {
	try {
		const userCheck = await User.findOne({ usuario: req.body.usuario });
		if (!userCheck)
			return res.status(404).json('No hay ningún usuario con ese nombre.');

		const passCheck = bcrypt.compareSync(
			req.body.password,
			userCheck.password
		);
		if (passCheck) {
			const token = generarToken(userCheck._id);
			//Devolvemos solo la informacion que queremos guardar en localStorage.
			const user = {
				usuario: userCheck.usuario,
				email: userCheck.email,
				_id: userCheck._id,
			};
			return res.status(200).json({ user: user, token: token });
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
				usuario: req.body.usuario || oldUser.usuario,
				email: req.body.email,
			};

			//Comprobamos que el nuevo nombre de usuario no esté en uso.
			if (change.usuario != oldUser.usuario) {
				const check = await User.findOne({ usuario: change.usuario });
				if (check)
					return res
						.status(404)
						.json('Ese nombre de usuario ya está en uso.');
			}

			const newUser = await User.findByIdAndUpdate(id, change, {
				new: true,
			}).select('-password');

			return res.status(201).json(newUser);
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
			const events = await Event.find({ creador: id });
			if (events.length > 1) await Event.deleteMany(events);

			return res.status(200).json('Usuario borrado correctamente.');
		}
		return res.status(200).json('No puedes borrar este usuario.');
	} catch (error) {
		return res.status(500).json(`Error (deleteUser): ${error}`);
	}
};

const changeAvatar = async (req, res, next) => {
	try {
		if (!req.file) {
			return res.status(500).json(`Error, prueba de nuevo más tarde.`);
		}

		let user = await User.findById(req.user.id);

		if (!user)
			return res.status(500).json(`Error, prueba de nuevo más tarde.`);

		const change = {
			avatar: req.file.path,
		};

		if (user.avatar) {
			removeImg(user.avatar);
		}

		user = await User.findByIdAndUpdate(req.user.id, change, { new: true });

		return res.status(201).json(user.avatar);
	} catch (error) {
		return res.status(500).json(`Error (changeAvatar): ${error}`);
	}
};

const removeAvatar = async (req, res, next) => {
	try {
		let user = await User.findById(req.user.id);

		if (!user)
			return res.status(500).json(`Error, prueba de nuevo más tarde.`);

		if (!user.avatar) {
			return res.status(202).json('No tienes foto de perfil.');
		}

		const change = {
			avatar: '',
		};

		removeImg(user.avatar);

		await User.findByIdAndUpdate(req.user.id, change, { new: true });

		return res.status(201).json('Foto de perfil borrada con éxito.');
	} catch (error) {
		return res.status(500).json(`Error (removeAvatar): ${error}`);
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	register,
	login,
	editUser,
	deleteUser,
	changeAvatar,
	removeAvatar,
};
