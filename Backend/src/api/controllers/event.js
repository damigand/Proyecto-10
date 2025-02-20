const Event = require("../models/Event");
const User = require("../models/User");
const { removeImg } = require("../../middlewares/cloudinary");
const { getOrderValue } = require("../../utils/orderValue");

const getAllEvents = async (req, res, next) => {
    try {
        const { dateOrder, assistOrder, assistLower, assistHigher, beforeDate, afterDate } =
            req.query;

        const aggregateArray = [];

        //Construimos el $project del aggregate.
        const project = {
            $project: {
                _id: 1,
                titulo: 1,
                fecha: 1,
                ubicacion: 1,
                asistentes: 1,
                //Fecha sin hora para poder ordenar correctamente por asistentes
                //En el caso de que haya varios eventos el mismo día.
                fechaSinHora: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
                //Contador de asistentes para poder ordenar bien.
                asistentesCount: { $size: "$asistentes" }
            }
        };

        aggregateArray.push(project);

        //Construimos el $match del aggregate.
        const match = {};

        if (assistLower && assistHigher) {
            match.asistentesCount = {
                $lt: parseInt(assistLower),
                $gte: parseInt(assistHigher)
            };
        } else {
            if (assistLower) match.asistentesCount = { $lt: parseInt(assistLower) };
            if (assistHigher) match.asistentesCount = { $gte: parseInt(assistHigher) };
        }

        if (beforeDate && afterDate) {
            match.fecha = {
                $lt: new Date(beforeDate),
                $gte: new Date(afterDate)
            };
        } else {
            if (beforeDate) match.fecha = { $lt: new Date(beforeDate) };
            if (afterDate) match.fecha = { $gte: new Date(afterDate) };
        }

        if (Object.keys(match).length > 0) {
            aggregateArray.push({ $match: match });
        }

        //Construimos el $sort del aggregate.
        const sort = {};
        if (dateOrder) sort.fechaSinHora = getOrderValue(dateOrder);
        if (assistOrder) sort.asistentesCount = getOrderValue(assistOrder);

        //Si hay algún $sort, lo metemos al aggregate.
        if (Object.keys(sort).length > 0) {
            aggregateArray.push({ $sort: sort });
        }

        let events;

        //aggregateArray siempre tendrá "project", ya que es lo que tiene que devolver.
        // Por lo que chequeamos si su longitud es mayor a 1 para filtrar con aggregate.
        if (Object.keys(aggregateArray).length > 1) {
            events = await Event.aggregate(aggregateArray);
        } else {
            //Si no se filtra con aggregate, no hay filtros, por lo que
            //Devolvemos todos los eventos (hacer un aggregate vacío da error).
            events = await Event.find();
        }

        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json(`Error (getAllEvents): ${error}`);
    }
};

const getEventById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id)
            .populate("creador", "usuario email _id")
            .populate("asistentes", "usuario _id avatar");
        return res.status(200).json(event);
    } catch (error) {
        return res.status(500).json(`Error (getEventById): ${error}`);
    }
};

const getUserEvents = async (req, res, next) => {
    try {
        const { id } = req.params;

        const response = {
            createdEvents: [],
            attendingEvents: []
        };

        response.createdEvents = await Event.find({ creador: id }).select("_id titulo");
        response.attendingEvents = await Event.find({ asistentes: id }).select("_id titulo");

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(`Error (getUserEvents): ${error}`);
    }
};

const createEvent = async (req, res, next) => {
    try {
        const eventObject = new Event(req.body);
        eventObject.imagen = req.file?.path || "";

        //Comprobamos campos obligatorios y su longitud máxima.
        if (!eventObject.titulo) return res.status(404).json("El evento necesita un título");
        if (!eventObject.fecha)
            return res.status(404).json("El evento necesita una fecha (YYYY-MM-DD)");

        if (!eventObject.ubicacion) return res.status(404).json("El evento necesita una ubicación");

        if (eventObject.descripcion?.length > 200)
            return res.status(404).json("La descripción no puede tener más de 200 caracteres.");

        if (eventObject.ubicacion.length > 50)
            return res.status(404).json("La ubicación no puede tener más de 50 caracteres.");

        if (eventObject.titulo.length > 50)
            return res.status(404).json("El título no puede tener más de 50 caracteres.");

        if (eventObject.fecha < new Date()) {
            return res.status(404).json("La fecha no puede ser anterior a hoy.");
        }

        eventObject.creador = req.user.id;
        if (req.body.attending) eventObject.asistentes.push(req.user.id);

        const event = await eventObject.save();

        //Añadimos el evento a los eventos creados del usuario.
        const change = {
            eventosCreados: [...new Set([...req.user.eventosCreados, event.id])]
        };

        await User.findByIdAndUpdate(req.user.id, change, {
            new: true
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

        if (!event) return res.status(404).json("No existe un evento con ese id.");

        //Lógica para que el usuario pueda asistir o dejar de asistir
        //Dándole click al mismo botón, ahorrando tiempo.
        if (event.asistentes.includes(req.user.id)) {
            event.asistentes = event.asistentes.filter((a) => a != req.user.id);
            await event.save();
            return res.status(200).json({
                message: "Ya no atenderás este evento.",
                attending: false,
                count: event.asistentes.length
            });
        } else {
            event.asistentes.push(req.user.id);
            await event.save();
            return res.status(200).json({
                message: "Atenderás este evento.",
                attending: true,
                count: event.asistentes.length
            });
        }
    } catch (error) {
        return res.status(500).json(`Error (attendEvent): ${error}`);
    }
};

const editEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const oldEvent = await Event.findById(id);

        //Si el evento ya tenia foto pero llega una nueva por req.file,
        //borramos la antigua.
        const removeImage = JSON.parse(req.body.removeImage);
        if (oldEvent.imagen && (req.file || removeImage)) {
            removeImg(oldEvent.imagen);
            oldEvent.imagen = "";
        }

        //Si el creador es el que edita el evento, creamos el cambio y lo ejecutamos.
        if (oldEvent.creador == req.user.id) {
            const change = {
                titulo: req.body.titulo || oldEvent.titulo,
                descripcion: req.body.descripcion || oldEvent.descripcion,
                fecha: req.body.fecha || oldEvent.fecha,
                ubicacion: req.body.ubicacion || oldEvent.ubicacion,
                imagen: req.file?.path || oldEvent.imagen || ""
            };

            const attending = JSON.parse(req.body.attending);

            if (attending && !oldEvent.asistentes.includes(req.user.id)) {
                oldEvent.asistentes.push(req.user.id);
            }

            if (!attending) {
                oldEvent.asistentes = oldEvent.asistentes.filter((a) => a != req.user.id);
            }

            oldEvent.save();
            const newEvent = await Event.findByIdAndUpdate(id, change, {
                new: true
            });
            return res.status(200).json(newEvent);
        }

        return res.status(404).json("No puedes editar este evento");
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
            const userEvents = (req.user.eventosCreados = req.user.eventosCreados.filter(
                (e) => e != id
            ));

            const change = {
                eventosCreados: userEvents
            };

            await User.findByIdAndUpdate(req.user.id, change, { new: true });
            return res.status(200).json("Evento eliminado con éxito.");
        }
        return res.status(200).json("deleteEvent");
    } catch (error) {
        return res.status(500).json(`Error (deleteEvent): ${error}`);
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    getUserEvents,
    createEvent,
    editEvent,
    attendEvent,
    deleteEvent
};
