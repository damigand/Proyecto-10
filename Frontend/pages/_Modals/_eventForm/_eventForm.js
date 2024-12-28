import './_eventForm.css';
import { showModal, closeModal } from '@m/_base.js';
import * as formCheck from '@c/formCheck/formCheck.js';
import makeRequest from '@c/makeRequest/makeRequest';
import eventDetails from '@p/EventDetails/eventDetails';
import createMessage from '@c/createMessage/createMessage';
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

const eventForm = (event) => {
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

const submitEvent = async () => {
	const title = $('#event-title').value;
	const desc = $('#event-desc').value;
	const date = $('#event-date').value;
	const time = $('#event-time').value;
	const location = $('#event-ubicacion').value;
	const attending = $('#event-attend').checked;

	let check;

	check = formCheck;
	check = formCheck.checkTextInput(title, 'Título', 0, maxTitle);
	if (!check) return;

	check = formCheck.checkTextInput(desc, 'Descripción', 0, maxDesc, true);
	if (!check) return;

	check = formCheck.checkTextInput(location, 'Ubicación', 0, maxUbicacion);
	if (!check) return;

	const finalDate = formCheck.checkDatetimeInput(date, time);
	if (!finalDate) return;

	const url = 'http://localhost:3000/api/events/create';
	const token = JSON.parse(localStorage.getItem('jwt'));

	const body = {
		titulo: title,
		descripcion: desc,
		fecha: finalDate,
		ubicacion: location,
		attending: attending,
	};

	const options = {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};

	const response = await makeRequest(url, options);
	if (response.success) {
		eventDetails(response.json._id);
		const color = 'green';
		const message = 'Evento creado con éxito.';
		createMessage(color, message);
		closeModal();
	}
};

export default eventForm;
