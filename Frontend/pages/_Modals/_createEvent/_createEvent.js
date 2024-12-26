import './_createEvent.css';
import { showModal, closeModal } from '@m/_base.js';
const $ = (el) => document.querySelector(el);

const maxTitle = 50;
const maxDesc = 200;
const maxUbicacion = 50;

const template = () => {
	return `
        <div id="create-event">
            <h1>Crear nuevo evento</h1>
            <form id="create-event-form">
                <div class="form-title">
                    <label for="event-title">Título</label>
                    <input type="text" id="event-title" />
                    <p class="input-length">
                        <span class="current-length">0</span>
                        /
                        <span class="max-length">${maxTitle}</span>
                    </p>
                </div>
                <div class="form-description">
                    <label for="event-desc">
                        Descripción
                        <span class="optional">(Opcional)</span>
                    </label>
                    <textarea id="event-desc" rows="4"></textarea>
                    <p class="input-length">
                        <span class="current-length">0</span>
                        /
                        <span class="max-length">${maxDesc}</span>
                    </p>
                </div>
                <div class="form-datetime">
                    <div class="form-date">
                        <label for="event-date">Fecha</label>
                        <input type="date" id="event-date">
                    </div>
                    <div class="form-time">
                        <label for="event-time">Hora</label>
                        <input type="time" id="event-time" />   
                    </div>
                </div>
                <div class="form-ubicacion">
                    <label for="event-ubicacion">Ubicación</label>
                    <input type="text" id="event-ubicacion" />
                    <p class="input-length">
                        <span class="current-length">0</span>
                        /
                        <span class="max-length">${maxUbicacion}</span>
                    </p>
                </div>
                <div class="form-attend">
                    <input type="checkbox" id="event-attend" />
                    <label for="event-attend">Atenderé al evento.</label>
                </div>
            </form>
            <div class="create-event-actions">
                <button type="button" id="submit-event">Crear evento</button>
                <button type="button" id="cancel-event">Cancelar</button>
            </div>
        </div>
    `;
};

const createEvent = () => {
	const div = document.createElement('div');
	div.id = 'create-modal';
	div.innerHTML = template();

	showModal(div);

	const submitEventButton = $('#submit-event');
	const cancelEventButton = $('#cancel-event');

	submitEventButton.addEventListener('click', () => submitEvent());
	cancelEventButton.addEventListener('click', () => closeModal());

	//Linea que formatea la fecha actual a yyyy-mm-dd y la usa como
	//"min" para que el usuario solo pueda crear eventos en futuras fechas
	$('#event-date').min = new Date().toLocaleDateString('fr-ca');
	inputCounters();
};

const inputCounters = () => {
	const titleInput = $('#event-title');
	const descInput = $('#event-desc');
	const ubicacionInput = $('#event-ubicacion');

	titleInput.addEventListener('keyup', () => {
		$('.form-title .current-length').textContent =
			titleInput.value?.length || 0;
		if (titleInput.value?.length > maxTitle) {
			titleInput.classList.add('error');
		} else {
			titleInput.classList.remove('error');
		}
	});

	descInput.addEventListener('keyup', () => {
		$('.form-description .current-length').textContent =
			descInput.value?.length || 0;
		if (descInput.value?.length > maxDesc) {
			descInput.classList.add('error');
		} else {
			descInput.classList.remove('error');
		}
	});

	ubicacionInput.addEventListener('keyup', () => {
		$('.form-ubicacion .current-length').textContent =
			ubicacionInput.value?.length || 0;
		if (ubicacionInput.value?.length > maxUbicacion) {
			ubicacionInput.classList.add('error');
		} else {
			ubicacionInput.classList.remove('error');
		}
	});
};

const submitEvent = () => {
	const title = $('#event-title').value;
	const desc = $('#event-desc').value;
	const date = $('#event-date').value;
	const time = $('#event-time').value;
	const location = $('#event-ubicacion').value;
	const attending = $('#event-attend').checked;

	let check;

	check = formCheck;
};

export default createEvent;
