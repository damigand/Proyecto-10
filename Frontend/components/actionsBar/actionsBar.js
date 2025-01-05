import eventForm from '@m/_eventForm/_eventForm';
import './actionsBar.css';
const $ = (el) => document.querySelector(el);

const template = () => {
	return `
        <div id="action-bar">
            <button id="create-event-button">Crear evento</button>
            <div class="filter-events-container">
                <h3>Filtros rápidos</h3>
                <div class="quick-filters">
                    <button class="assistants-filter">
                        Asistentes
                        <i class="bx bx-up-arrow"></i>
                    </button>
                    <button class="date-filter">
                        Fecha
                        <i class="bx bx-up-arrow"></i>
                    </button>
                </div>
                <h3>Filtros</h3>
                <form id="filter-events-form">
                </form>
            </div>
        </div>
    `;
};

let assistIndex = 0;
let dateIndex = 0;

const actionBar = () => {
	$('main').insertAdjacentHTML('afterbegin', template());
	$('#create-event-button').addEventListener('click', () => eventForm());

	const assistFilterButton = $('.assistants-filter');
	assistFilterButton.addEventListener('click', () => {
		assistIndex = changeQuickFilter(assistIndex, assistFilterButton);
	});

	const dateFilterButton = $('.date-filter');
	dateFilterButton.addEventListener('click', () => {
		dateIndex = changeQuickFilter(dateIndex, dateFilterButton);
	});
};

//Cambia aspectos visuales de los botones.
const changeQuickFilter = (index, button) => {
	const icon = button.querySelector('i');
	switch (index) {
		case 0:
			index = 1;
			button.classList.add('most');
			icon.classList.toggle('bx-up-arrow');
			icon.classList.toggle('bxs-up-arrow');
			break;
		case 1:
			index = 2;
			button.classList.remove('most');
			button.classList.add('least');
			icon.classList.toggle('reverse');
			break;
		case 2:
			index = 0;
			button.classList.remove('least');
			icon.classList.toggle('bx-up-arrow');
			icon.classList.toggle('bxs-up-arrow');
			icon.classList.remove('reverse');
			break;
	}

	return index;
};

export default actionBar;
