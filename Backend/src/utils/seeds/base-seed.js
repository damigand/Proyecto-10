const User = require('../../api/models/User');
const Event = require('../../api/models/Event');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
	.connect(process.env.DB_URL)
	.then(async () => {
		//Limpiar datos de la bbdd.
		console.log('Limpiando usuarios...');

		const users = await User.find();
		if (users) {
			User.collection.drop();
		}

		console.log('Limpiando eventos...');

		const events = await Event.find();
		if (events) {
			Event.collection.drop();
		}
	})
	.catch((error) => console.log('Error limpiando BBDD: ', error))
	.then(async () => {
		//Crear usuarios en la bbdd.
		console.log('Creando usuarios...');

		const users = await User.insertMany(userData);
		return users;
	})
	.catch((error) => console.log('Error creando datos en la BBDD:', error))
	.then(async (users) => {
		//Usuarios 0, 1 y 2 van a tener su propio evento.
		const events = [];

		//Evento 0 (Usuario 0)
		//Asistentes: 0, 1, 2, 3, 4
		const event0 = new Event(eventData[0]);
		event0.creador = users[0]._id;
		event0.asistentes = [
			users[0]._id,
			users[1]._id,
			users[2]._id,
			users[3]._id,
			users[4]._id,
		];

		change = {
			eventosCreados: [event0._id],
		};

		await event0.save();
		await User.findByIdAndUpdate(users[0]._id, change);

		//Evento 1 (Usuario 1)
		//Asistentes: 2, 3, 4, 5, 6, 7
		const event1 = new Event(eventData[1]);
		event1.creador = users[1]._id;
		event1.asistentes = [
			users[2]._id,
			users[3]._id,
			users[4]._id,
			users[5]._id,
			users[6]._id,
			users[7]._id,
		];

		change = {
			eventosCreados: [event1._id],
		};

		await event1.save();
		await User.findByIdAndUpdate(users[1]._id, change);

		//Evento 2 (Usuario 2)
		//Asistentes: 0, 2, 4, 8
		const event2 = new Event(eventData[2]);
		event2.creador = users[2]._id;
		event2.asistentes = [
			users[0]._id,
			users[2]._id,
			users[4]._id,
			users[8]._id,
		];

		change = {
			eventosCreados: [event2._id],
		};

		await event2.save();
		await User.findByIdAndUpdate(users[2]._id, change);
	})
	.catch((error) => console.log('Error cruzando datos en la BBDD:', error))
	.finally(() => {
		console.log('Seed completada.');
		mongoose.disconnect();
	});

const userData = [
	{
		usuario: 'juanperez89',
		password: 'abc123456',
		email: 'juanperez89@mail.com',
	},
	{
		usuario: 'mariarodriguez',
		password: 'pass1234!',
		email: 'mariarodriguez@example.com',
	},
	{
		usuario: 'luisgomez21',
		password: '1234luis@',
		email: 'luisgomez21@gmail.com',
	},
	{
		usuario: 'carlosperez90',
		password: 'carlos2020!',
		email: 'carlosperez90@hotmail.com',
	},
	{
		usuario: 'ana_smith',
		password: 'AnaPass2024',
		email: 'ana.smith@outlook.com',
	},
	{
		usuario: 'sofia.martinez',
		password: 'sofia1234$',
		email: 'sofia.martinez@mail.com',
	},
	{
		usuario: 'daniel_camara',
		password: 'danielPass@01',
		email: 'daniel.camara@yahoo.com',
	},
	{
		usuario: 'laura_bautista',
		password: 'lauraB@2024',
		email: 'laura.bautista@aol.com',
	},
	{
		usuario: 'pedro_torres',
		password: 'pedro12345!',
		email: 'pedro.torres@live.com',
	},
	{
		usuario: 'elena_perez',
		password: 'elena2024$!',
		email: 'elena.perez@webmail.com',
	},
];

const eventData = [
	{
		titulo: 'Concierto de Rock en Vivo',
		descripcion:
			'Un espectáculo en vivo con bandas locales de rock, con un ambiente enérgico y una experiencia inolvidable.',
		fecha: '2024-12-18T19:30:00Z',
		ubicacion: 'Estadio Olímpico, Barcelona, España',
	},
	{
		titulo: 'Feria Internacional de Arte Contemporáneo',
		descripcion:
			'Exposición de obras de arte contemporáneo de artistas internacionales, donde se podrán ver y adquirir piezas únicas.',
		fecha: '2025-01-05T10:00:00Z',
		ubicacion: 'Museo de Arte Moderno, Ciudad de México, México',
	},
	{
		titulo: 'Seminario de Marketing Digital',
		descripcion:
			'Un seminario de un día completo sobre estrategias de marketing digital, SEO, redes sociales y más, dirigido a profesionales del área.',
		fecha: '2024-12-22T09:00:00Z',
		ubicacion: 'Hotel Intercontinental, Lima, Perú',
	},
];
