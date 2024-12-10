import eventDetails from './eventDetails';
import Access from './Access';
import './Events.css';
import createMessage from '../components/createMessage';

const $ = (el) => document.querySelector(el);
const $$ = (els) => document.querySelectorAll(els);

const template = () => {
	$('#link_events').classList.add('active');
	$('#link_profile').classList.remove('active');
	return `
        <section id="events">
            <div id="event-container">  
                
            </div>
        </section>
    `;
};

const getEvents = async () => {
	const url = 'http://localhost:3000/api/events';
	const options = {
		method: 'GET',
	};

	const response = await makeRequest(url, options);
	if (response.success) {
		const container = $('#event-container');
		const events = response.json;

		for (const event of events) {
			const element = eventElement(event);
			container.appendChild(element);
		}
	}
};

const eventElement = (event) => {
	const div = document.createElement('div');
	div.classList.add('event');

	const title = document.createElement('h1');
	title.classList.add('title');
	title.innerText = event.titulo;

	const dateDiv = document.createElement('div');
	dateDiv.classList.add('date');
	const dateText = document.createElement('span');
	const dateIcon = document.createElement('i');
	const dateObject = new Date(event.fecha);

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
	detailsButton.addEventListener('click', () => eventDetails(event));

	const attendButton = document.createElement('button');
	attendButton.classList.add('attend');
	attendButton.textContent = 'Atender evento';
	attendButton.addEventListener('click', () => attendEvent(event));

	actionsDiv.appendChild(detailsButton);
	actionsDiv.appendChild(attendButton);

	div.appendChild(title);
	div.appendChild(dateDiv);
	div.appendChild(actionsDiv);
	return div;
};

const attendEvent = (event) => {
	const token = localStorage.getItem('jwt');
	if (!token) {
		Access();
		createMessage('red', 'Necesitas acceso para atender un evento.');
	}
};

const Events = () => {
	$('main').innerHTML = template();

	getEvents();
};

export default Events;
