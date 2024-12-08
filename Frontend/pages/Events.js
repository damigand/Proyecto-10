import eventDetails from './eventDetails';
const $ = (el) => document.querySelector(el);
const $$ = (els) => document.querySelectorAll(els);

import './Events.css';

const template = () => {
	const user = localStorage.getItem('user');
	return `
        <section id="events">
            <div id="event-container">  
                
            </div>
        </section>
    `;
};

const getEvents = async () => {
	const request = await fetch('http://localhost:3000/api/events');
	const events = await request.json();

	const container = $('#event-container');

	for (const event of events) {
		const element = eventElement(event);
		element.addEventListener('click', () => eventDetails(event));
		container.appendChild(element);
	}
};

const eventElement = (element) => {
	const div = document.createElement('div');
	div.classList.add('event');

	const title = document.createElement('h1');
	title.classList.add('title');
	title.innerText = element.titulo;

	const dateDiv = document.createElement('div');
	dateDiv.classList.add('date');
	const dateText = document.createElement('span');
	const dateIcon = document.createElement('i');
	const dateObject = new Date(element.fecha);

	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	dateText.innerText = dateObject.toLocaleDateString('es-ES', options);
	dateIcon.classList.add('bx');
	dateIcon.classList.add('bxs-calendar');

	dateDiv.appendChild(dateIcon);
	dateDiv.appendChild(dateText);

	const actionsDiv = document.createElement('div');
	actionsDiv.classList.add('actions');

	const detailsButton = document.createElement('button');
	detailsButton.classList.add('details');
	detailsButton.textContent = 'Ver detalles';

	const attendButton = document.createElement('button');
	attendButton.classList.add('attend');
	attendButton.textContent = 'Atender evento';

	actionsDiv.appendChild(detailsButton);
	actionsDiv.appendChild(attendButton);

	div.appendChild(title);
	div.appendChild(dateDiv);
	div.appendChild(actionsDiv);
	return div;
};

const Events = () => {
	$('main').innerHTML = template();

	getEvents();
};

export default Events;
