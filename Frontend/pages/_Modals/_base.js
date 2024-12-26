import './_base.css';
import createEvent from '@m/_createEvent/_createEvent';

const $ = (el) => document.querySelector(el);
let modal;

const template = () => {
	return `
        <div id="modal" class="">
        </div>
    `;
};

export const showModal = (content) => {
	if (!modal) baseModal();

	$('body').classList.add('noscroll');

	modal.classList.remove('hidden');
	modal.appendChild(content);
};

export const closeModal = () => {
	if (!modal) baseModal();

	$('body').classList.remove('noscroll');

	modal.innerHTML = '';
	modal.classList.add('hidden');
};

export const baseModal = () => {
	$('body').insertAdjacentHTML('afterbegin', template());
	modal = $('#modal');

	window.addEventListener('keydown', (event) => {
		if (event.key == 'Escape') closeModal();
	});

	createEvent();
};
