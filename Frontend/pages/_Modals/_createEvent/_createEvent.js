import './_createEvent.css';
import { showModal, closeModal } from '../_base.js';
const $ = (el) => document.querySelector(el);

const template = () => {
	return `
        <div id="create-event">
            <form id="create-event-form">
                <div style="height: 200px; background-color: lightgray; margin-bottom: 20px;">
                </div>
                <div style="height: 200px; background-color: lightgray; margin-bottom: 20px;">
                </div>
                <div style="height: 200px; background-color: lightgray; margin-bottom: 20px;">
                </div>
                <div style="height: 200px; background-color: lightgray; margin-bottom: 20px;">
                </div>
                <div style="height: 200px; background-color: lightgray; margin-bottom: 20px;">
                </div>
                <div style="height: 200px; background-color: lightgray; margin-bottom: 20px;">
                </div>
                <div style="height: 200px; background-color: lightgray; margin-bottom: 20px;">
                </div>
                <div style="height: 200px; background-color: lightgray; margin-bottom: 20px;">
                </div>
                <div style="height: 200px; background-color: lightgray; margin-bottom: 20px;">
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
