import './_base.css';

const $ = (el) => document.querySelector(el);
let modal;

const template = () => {
	return `
        <div id="modal" class="hidden">
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
};
