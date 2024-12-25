import './_createEvent.css';
import { showModal, closeModal } from '../_base.js';
const $ = (el) => document.querySelector(el);

const template = () => {
	return `
        <div id="create-event">
            <h1>Crear nuevo evento</h1>
            <form id="create-event-form">
                <div class="form-title">
                    <label for="event-title">Título</label>
                    <input type="text" id="event-title" />
                </div>
                <div class="form-description">
                    <label for="event-desc">
                        Descripción
                        <span class="optional">(Opcional)</span>
                    </label>
                    <textarea id="event-desc" rows="4"></textarea>
                </div>
                <div class="form-date">
                    <label for="event-date">Fecha</label>
                    <input type="date">
                </div>
                <div class="form-ubicacion">
                    <label for="event-ubicacion">Ubicación</label>
                    <input type="text" id="event-ubicacion" />
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
};

const submitEvent = () => {};

export default createEvent;
