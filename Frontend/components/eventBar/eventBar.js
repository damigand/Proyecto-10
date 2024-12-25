import createEvent from '../../pages/_Modals/_createEvent/_createEvent';
import './eventBar.css';

const $ = (el) => document.querySelector(el);

const eventBarHTML = () => {
	return `
        <div class="event-bar-container">
            <div class="toggle-container">
                <i id="toggle-bar" class="bx bx-chevron-up"></i>
            </div>
            <div id="event-bar">
                <button id="filter-button">Filtros</button>
                <button id="create-button">Crear evento</button>
            </div>
        </div>
    `;
};

const eventBar = (container) => {
	const barHTML = eventBarHTML();
	container.insertAdjacentHTML('afterbegin', barHTML);

	const toggleBar = $('#toggle-bar');
	const eventBar = $('#event-bar');
	const filterButton = $('#filter-button');
	const createButton = $('#create-button');
	const filterContainer = $('#filter-container');
	const createContainer = $('#create-container');

	toggleBar.addEventListener('click', () => {
		eventBar.classList.toggle('hide');
		toggleBar.classList.toggle('bx-chevron-down');
		toggleBar.classList.toggle('bx-chevron-up');
	});

	filterButton.addEventListener('click', () => {});

	createButton.addEventListener('click', () => {
		createEvent();
	});
};

export default eventBar;
