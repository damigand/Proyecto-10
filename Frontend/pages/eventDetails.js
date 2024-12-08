import Events from './Events';
import './eventDetails.css';
const $ = (el) => document.querySelector(el);
const $$ = (els) => document.querySelector(els);

const template = () => {
	return `
        <div id="event-details">
            <i id="back" class="bx bx-arrow-back"></i>
            
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
};

const eventDetails = (event) => {
	$('main').innerHTML = template();
	$('#back').addEventListener('click', () => Events());

	getDetails(event);
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
        <div class="creador">Creado por <span>${
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

export default eventDetails;
