import makeRequest from '../../components/makeRequest/makeRequest.js';
import backButton from '../../components/backButton/backButton.js';
import Events from '../Events/Events.js';
import Profile from '../Profile/Profile.js';
import './eventDetails.css';

const $ = (el) => document.querySelector(el);
const $$ = (els) => document.querySelector(els);

const template = () => {
	return `
        <div id="event-details">
            
            
        </div>
    `;
};

const getDetails = (event) => {
	const div = document.createElement('div');
	div.classList.add('event-info');

	div.innerHTML = eventHTML(event);

	const attendants = document.createElement('div');
	attendants.classList.add('attendants');

	$('#event-details').appendChild(div);
	$('#event-details').appendChild(attendants);

	const creador = $('.creador-usuario');
	creador.addEventListener('click', () => {
		Profile(event.creador._id, { url: 'Event', id: event._id });
	});
};

const eventHTML = (event) => {
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	const date = new Date(event.fecha).toLocaleDateString('es-ES', options);
	return `
        <h1>${event.titulo}</h1>
        <div class="creador">Creado por <span class="creador-usuario">${
				event.creador.usuario
			}</span></div>
        <p>${
				event.descripcion
					? event.descripcion
					: 'Este evento no tiene ninguna descripción.'
			}</p>
        <div class="date">
            <i class="bx bxs-calendar"></i>
            <span>${date}</span>
        </div>
        <div class="location">
            <i class="bx bxs-map"></i>
            <span>${event.ubicacion}</span>
        </div>
    `;
};

const eventDetails = async (eventId, backNav) => {
	$('main').innerHTML = template();
	const back = backButton(backNav);
	console.log(back);
	$('#event-details').insertAdjacentElement('afterbegin', back);

	const url = `http://localhost:3000/api/events/${eventId}`;
	const options = {
		method: 'GET',
	};

	const response = await makeRequest(url, options);
	if (response.success) {
		const event = response.json;
		getDetails(event);
	}
};

export default eventDetails;
