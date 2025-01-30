const User = require("../../api/models/User");
const Event = require("../../api/models/Event");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
        //Limpiar datos de la bbdd.
        console.log("Limpiando usuarios...");
        const users = await User.find();
        if (users) {
            User.collection.drop();
        }
        console.log("Limpiando eventos...");
        const events = await Event.find();
        if (events) {
            Event.collection.drop();
        }
    })
    .catch((error) => console.log("Error limpiando BBDD: ", error))
    .then(async () => {
        //Crear usuarios en la bbdd.
        console.log("Creando usuarios...");
        const users = await User.insertMany(userData);
        return users;
    })
    .catch((error) => console.log("Error creando datos en la BBDD:", error))
    .then(async (users) => {
        //Con ayuda de un array (seedHelp), asignamos un evento a cada usuario
        //Y asignamos asistentes a cada evento.
        console.log("Creando cruces de usuarios y eventos.");
        for (const help of seedHelp) {
            const eventIndex = help.eventIndex;
            const asistentesIndex = help.asistentesIndex;
            const creadorIndex = help.creadorIndex;

            const creador = users[creadorIndex];
            const eventObj = eventData[eventIndex];

            const event = new Event({
                titulo: eventObj.titulo,
                descripcion: eventObj.titulo,
                fecha: eventObj.fecha,
                ubicacion: eventObj.ubicacion,
                creador: creador._id
            });

            event.creador = creador._id;
            creador.eventosCreados.push(event._id);
            await creador.save();

            for (const index of asistentesIndex) {
                event.asistentes.push(users[index]._id);
            }

            await event.save();
        }

        console.log("Cruces creados.");
    })
    .catch((error) => console.log("Error cruzando datos en la BBDD:", error))
    .finally(() => {
        console.log("Seed terminada.");
        mongoose.disconnect();
    });

const userData = [
    {
        avatar: "https://l-ldesign.com.au/2016/wp-content/uploads/2020/01/profile-pic-katie-square.jpg",
        usuario: "mariarodriguez01",
        password: "password123",
        email: "mariarodriguez01@mail.com"
    },
    {
        avatar: "https://plus.college.indiana.edu/images/profiles/profiles-768x768/assistant.jpg",
        usuario: "pedro_gomez85",
        password: "1234abcd",
        email: "pedro_gomez85@mail.com"
    },
    {
        avatar: "https://shiftart.com/wp-content/uploads/2017/04/RC-Profile-Square.jpg",
        usuario: "luismoreno23",
        password: "luismoreno2023",
        email: "luismoreno23@mail.com"
    },
    {
        avatar: "https://elireview.com/wp-content/uploads/2016/12/reed-profile-square.jpg",
        usuario: "ana_perez92",
        password: "ana12345",
        email: "ana_perez92@mail.com"
    },
    {
        avatar: "https://www.themarketingnutz.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg",
        usuario: "carlos_sanchez77",
        password: "carlo$77",
        email: "carlos_sanchez77@mail.com"
    },
    {
        avatar: "https://www.silverstripe.org/assets/Uploads/Sacha-Judd-profile-square.jpg",
        usuario: "sofia_lopez66",
        password: "sofialopez66",
        email: "sofia_lopez66@mail.com"
    },
    {
        avatar: "https://cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png",
        usuario: "david_fernandez18",
        password: "david2023!",
        email: "david_fernandez18@mail.com"
    },
    {
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        usuario: "elena_ramos33",
        password: "elena@ramos",
        email: "elena_ramos33@mail.com"
    },
    {
        avatar: "https://media.creativemornings.com/uploads/user/avatar/49419/Bechtel_Profile_Square.jpg",
        usuario: "mario_solis44",
        password: "mario44!@",
        email: "mario_solis44@mail.com"
    },
    {
        avatar: "https://sandbox.elireview.com/wp-content/uploads/2016/12/reed-profile-square.jpg",
        usuario: "julia_garcia90",
        password: "julia123!",
        email: "julia_garcia90@mail.com"
    },
    {
        usuario: "alvaro_martinez77",
        password: "alvar@77",
        email: "alvaro_martinez77@mail.com"
    },
    {
        usuario: "veronica_suarez12",
        password: "veronica2024",
        email: "veronica_suarez12@mail.com"
    },
    {
        usuario: "jorge_hernandez99",
        password: "jorgeh123!",
        email: "jorge_hernandez99@mail.com"
    },
    {
        usuario: "lina_carrillo55",
        password: "lina!carrillo",
        email: "lina_carrillo55@mail.com"
    },
    {
        usuario: "pedro_martinez07",
        password: "pedro1234",
        email: "pedro_martinez07@mail.com"
    },
    {
        usuario: "ximena_rios22",
        password: "ximena2025",
        email: "ximena_rios22@mail.com"
    },
    {
        usuario: "roberto_gonzalez31",
        password: "roberto@31",
        email: "roberto_gonzalez31@mail.com"
    },
    {
        usuario: "silvia_torres54",
        password: "silvia#54",
        email: "silvia_torres54@mail.com"
    },
    {
        usuario: "sergio_mendez88",
        password: "sergiomendez88",
        email: "sergio_mendez88@mail.com"
    },
    {
        usuario: "rebecca_palomino20",
        password: "rebecca@palomino",
        email: "rebecca_palomino20@mail.com"
    }
];

const eventData = [
    {
        titulo: "Festival de Música Electrónica",
        descripcion:
            "Vive una noche llena de ritmos electrónicos con DJ's internacionales y una atmósfera única.",
        fecha: "2025-02-15T22:00:00Z",
        ubicacion: "Palacio de los Deportes, Madrid, España"
    },
    {
        titulo: "Concierto de Jazz Nocturno",
        descripcion:
            "Disfruta de una noche tranquila con los mejores músicos de jazz en un ambiente íntimo.",
        fecha: "2025-02-22T20:00:00Z",
        ubicacion: "Teatro Nuevo Apolo, Madrid, España"
    },
    {
        titulo: "Feria Gastronómica Internacional",
        descripcion:
            "Prueba platillos exquisitos de todas partes del mundo en esta feria llena de sabor y cultura.",
        fecha: "2025-03-05T10:00:00Z",
        ubicacion: "Parque Central, Barcelona, España"
    },
    {
        titulo: "Concierto de Indie Pop",
        descripcion:
            "Una noche para disfrutar de las mejores bandas indie locales e internacionales.",
        fecha: "2025-03-07T21:00:00Z",
        ubicacion: "Sala Apolo, Barcelona, España"
    },
    {
        titulo: "Espectáculo de Circo Moderno",
        descripcion: "Un show único donde el circo se encuentra con el arte contemporáneo.",
        fecha: "2025-03-12T19:30:00Z",
        ubicacion: "Circo Price, Madrid, España"
    },
    {
        titulo: "Teatro Experimental",
        descripcion:
            "Una propuesta teatral que desafía las convenciones tradicionales del escenario.",
        fecha: "2025-03-14T20:30:00Z",
        ubicacion: "Teatro Español, Madrid, España"
    },
    {
        titulo: "Maratón de Cine de Terror",
        descripcion:
            "Una noche de miedo continuo con las mejores películas de terror de todos los tiempos.",
        fecha: "2025-03-20T22:00:00Z",
        ubicacion: "Cines Renoir, Madrid, España"
    },
    {
        titulo: "Concierto de Música Clásica",
        descripcion:
            "Un evento especial con una orquesta sinfónica interpretando grandes piezas de música clásica.",
        fecha: "2025-03-22T19:00:00Z",
        ubicacion: "Auditorio Nacional, Madrid, España"
    },
    {
        titulo: "Festival de Cerveza Artesanal",
        descripcion:
            "Un festival para los amantes de la cerveza, con cervezas artesanales de todo el mundo.",
        fecha: "2025-04-03T16:00:00Z",
        ubicacion: "Recinto Ferial, Valencia, España"
    },
    {
        titulo: "Exposición de Arte Contemporáneo",
        descripcion: "Una muestra de las obras más vanguardistas de artistas emergentes.",
        fecha: "2025-04-06T10:00:00Z",
        ubicacion: "Museo Reina Sofía, Madrid, España"
    },
    {
        titulo: "Maratón de Yoga y Meditación",
        descripcion:
            "Un evento de bienestar para practicar yoga, meditar y encontrar la paz interior.",
        fecha: "2025-04-10T08:00:00Z",
        ubicacion: "Parque de la Vaguada, Zaragoza, España"
    },
    {
        titulo: "Concierto de Rock Alternativo",
        descripcion:
            "Bandas de rock alternativo se presentan en un evento que hará vibrar el corazón de los asistentes.",
        fecha: "2025-04-12T21:00:00Z",
        ubicacion: "La Riviera, Madrid, España"
    },
    {
        titulo: "Feria Internacional del Libro",
        descripcion:
            "Una feria llena de libros, escritores y actividades literarias para los amantes de la lectura.",
        fecha: "2025-04-15T09:00:00Z",
        ubicacion: "Palacio de Congresos, Barcelona, España"
    },
    {
        titulo: "Concierto de Música Electrónica",
        descripcion: "El mejor trance, house y techno con DJ's internacionales.",
        fecha: "2025-04-17T23:00:00Z",
        ubicacion: "Pacha, Barcelona, España"
    },
    {
        titulo: "Fiesta de Año Nuevo Chino",
        descripcion: "Celebra el Año Nuevo Chino con música, danza y comida tradicional.",
        fecha: "2025-04-20T19:00:00Z",
        ubicacion: "Plaza Mayor, Madrid, España"
    },
    {
        titulo: "Conferencia de Innovación Tecnológica",
        descripcion:
            "Una jornada llena de charlas y ponencias sobre los avances más recientes en tecnología.",
        fecha: "2025-04-25T10:00:00Z",
        ubicacion: "Centro de Convenciones, Barcelona, España"
    },
    {
        titulo: "Festival de Cine Independiente",
        descripcion:
            "Una selección de las mejores películas de cine independiente de todo el mundo.",
        fecha: "2025-04-28T18:30:00Z",
        ubicacion: "Cine Maldà, Barcelona, España"
    },
    {
        titulo: "Concierto de Música Latina",
        descripcion: "Una noche llena de salsa, bachata y reggaetón para bailar toda la noche.",
        fecha: "2025-05-01T22:00:00Z",
        ubicacion: "Café Berlín, Madrid, España"
    },
    {
        titulo: "Maratón de Videojuegos",
        descripcion:
            "Un evento para los fanáticos de los videojuegos, con torneos y demostraciones de nuevas consolas.",
        fecha: "2025-05-05T10:00:00Z",
        ubicacion: "IFEMA, Madrid, España"
    },
    {
        titulo: "Exposición de Fotografía Documental",
        descripcion:
            "Una muestra fotográfica que narra historias a través del lente de grandes fotógrafos.",
        fecha: "2025-05-08T11:00:00Z",
        ubicacion: "Museo de Arte Contemporáneo, Madrid, España"
    }
];

const seedHelp = [
    {
        eventIndex: 10,
        asistentesIndex: [17, 4, 13, 9],
        creadorIndex: 10
    },
    {
        eventIndex: 5,
        asistentesIndex: [3, 15, 11, 19, 8, 10],
        creadorIndex: 5
    },
    {
        eventIndex: 17,
        asistentesIndex: [13, 17, 5, 7, 3, 12, 19, 11],
        creadorIndex: 17
    },
    {
        eventIndex: 3,
        asistentesIndex: [18, 14, 8, 1],
        creadorIndex: 3
    },
    {
        eventIndex: 1,
        asistentesIndex: [4, 19, 7],
        creadorIndex: 1
    },
    {
        eventIndex: 14,
        asistentesIndex: [11, 18, 13, 4, 16, 1, 3, 10],
        creadorIndex: 14
    },
    {
        eventIndex: 18,
        asistentesIndex: [0, 2, 18, 14, 8],
        creadorIndex: 18
    },
    {
        eventIndex: 9,
        asistentesIndex: [2, 6, 10, 15, 11, 18, 16, 3, 8],
        creadorIndex: 9
    },
    {
        eventIndex: 12,
        asistentesIndex: [16, 19, 0, 14, 6, 3],
        creadorIndex: 12
    },
    {
        eventIndex: 13,
        asistentesIndex: [8, 5, 10, 15, 12, 9, 2],
        creadorIndex: 13
    },
    {
        eventIndex: 6,
        asistentesIndex: [9, 4, 6, 17, 14, 7, 2],
        creadorIndex: 6
    },
    {
        eventIndex: 4,
        asistentesIndex: [6, 13, 16, 0, 17],
        creadorIndex: 4
    },
    {
        eventIndex: 0,
        asistentesIndex: [15, 3],
        creadorIndex: 0
    },
    {
        eventIndex: 16,
        asistentesIndex: [9, 1, 18, 14],
        creadorIndex: 16
    },
    {
        eventIndex: 15,
        asistentesIndex: [6, 19, 17, 0, 8, 2, 4],
        creadorIndex: 15
    },
    {
        eventIndex: 7,
        asistentesIndex: [12, 0, 5, 18, 13, 9, 11, 16],
        creadorIndex: 7
    },
    {
        eventIndex: 8,
        asistentesIndex: [3, 14, 8, 19, 7, 1, 0, 13],
        creadorIndex: 8
    },
    {
        eventIndex: 11,
        asistentesIndex: [12, 18, 5, 7, 1],
        creadorIndex: 11
    },
    {
        eventIndex: 19,
        asistentesIndex: [16, 13, 9, 10, 3, 12],
        creadorIndex: 19
    },
    {
        eventIndex: 2,
        asistentesIndex: [12, 5, 9, 2],
        creadorIndex: 2
    }
];
