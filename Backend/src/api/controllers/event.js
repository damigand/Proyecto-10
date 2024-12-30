const Event = require('../models/Event');
const User = require('../models/User');

const getAllEvents = async (req, res, next) => {
	try {
		const events = await Event.find()
			.populate('creador', 'usuario email -_id')
			.populate('asistentes', 'usuario -_id');
		return res.status(200).json(events);
	} catch (error) {
		return res.status(500).json(`Error (getAllEvents): ${error}`);
	}
};

const getEventById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const event = await Event.findById(id)
			.populate('creador', 'usuario email _id')
			.populate('asistentes', 'usuario _id');
		return res.status(200).json(event);
	} catch (error) {
		return res.status(500).json(`Error (getEventById): ${error}`);
	}
};

const createEvent = async (req, res, next) => {
	try {
		const eventObject = new Event(req.body);

		//Comprobamos campos obligatorios y su longitud máxima.
		if (!eventObject.titulo)
			return res.stauts(404).json('El evento necesita un título');
		if (!eventObject.fecha)
			return res
				.status(404)
				.json('El evento necesita una fecha (YYYY-MM-DD)');

		if (!eventObject.ubicacion)
			return res.status(404).json('El evento necesita una ubicación');

		if (eventObject.description?.length > 200)
			return res
				.status(404)
				.json('La descripción no puede tener más de 200 caracteres.');

		if (eventObject.ubicacion.length > 50)
			return res
				.status(404)
				.json('La ubicación no puede tener más de 50 caracteres.');

		if (eventObject.titulo.length > 50)
			return res
				.status(404)
				.json('El título no puede tener más de 50 caracteres.');

		eventObject.creador = req.user.id;
		if (req.body.attending) eventObject.asistentes.push(req.user.id);

		const event = await eventObject.save();

		//Añadimos el evento a los eventos creados del usuario.
		const change = {
			eventosCreados: [...new Set([...req.user.eventosCreados, event.id])],
		};

		await User.findByIdAndUpdate(req.user.id, change, {
			new: true,
		});

		return res.status(201).json(event);
	} catch (error) {
		return res.status(500).json(`Error (createEvent): ${error}`);
	}
};

const attendEvent = async (req, res, next) => {
	try {
		const { id } = req.params;
		const event = await Event.findById(id);

		if (!event)
			return res.status(404).json('No existe un evento con ese id.');

		//Lógica para que el usuario pueda asistir o dejar de asistir
		//Dándole click al mismo botón, ahorrando tiempo.
		if (event.asistentes.includes(req.user.id)) {
			event.asistentes = event.asistentes.filter((a) => a != req.user.id);
			await event.save();
			return res.status(200).json({
				message: 'Ya no atenderás este evento.',
				attending: false,
			});
		} else {
			event.asistentes.push(req.user.id);
			await event.save();
			return res
				.status(200)
				.json({ message: 'Atenderás este evento.', attending: true });
		}
	} catch (error) {
		return res.status(500).json(`Error (attendEvent): ${error}`);
	}
};

const editEvent = async (req, res, next) => {
	try {
		const { id } = req.params;
		const oldEvent = await Event.findById(id);

		//Si el creador es el que edita el evento, creamos el cambio y lo ejecutamos.
		if (oldEvent.creador == req.user.id) {
			const change = {
				titulo: req.body.titulo || oldEvent.titulo,
				descripcion: req.body.descripcion || oldEvent.descripcion,
				fecha: req.body.fecha || oldEvent.fecha,
				ubicacion: req.body.ubicacion || oldEvent.ubicacion,
			};

			//ESTO NO FUNCIONA
			if (!req.body.attending) {
				change.asistentes = oldEvent.asistentes.filter(
					(a) => a == req.user.id
				);
				console.log(oldEvent);
			} else {
				change.asistentes = [
					...new Set([...oldEvent.asistentes, req.user.id]),
				];
			}

			const newEvent = await Event.findByIdAndUpdate(id, change, {
				new: true,
			});
			return res.status(200).json(newEvent);
		}

		return res.status(404).json('No puedes editar este evento');
	} catch (error) {
		return res.status(500).json(`Error (editEvent): ${error}`);
	}
};

const deleteEvent = async (req, res, next) => {
	try {
		const { id } = req.params;
		const event = await Event.findById(id);

		if (event.creador == req.user.id) {
			await Event.deleteOne(event);

			//Borramos el evento de los eventos creados del usuario.
			const userEvents = (req.user.eventosCreados =
				req.user.eventosCreados.filter((e) => e != id));

			const change = {
				eventosCreados: userEvents,
			};

			await User.findByIdAndUpdate(req.user.id, change, { new: true });
			return res.status(200).json('Evento eliminado con éxito.');
		}
		return res.status(200).json('deleteEvent');
	} catch (error) {
		return res.status(500).json(`Error (deleteEvent): ${error}`);
	}
};

module.exports = {
	getAllEvents,
	getEventById,
	createEvent,
	editEvent,
	attendEvent,
	deleteEvent,
};
