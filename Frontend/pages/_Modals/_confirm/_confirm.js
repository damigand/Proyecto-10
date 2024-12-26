import './_confirm.css';
import { showModal, closeModal } from '@m/_base.js';

const confirm = async (q, yes, no) => {
	return new Promise((resolve, reject) => {
		const div = document.createElement('div');

		const text = document.createElement('span');
		const yesButton = document.createElement('button');
		const noButton = document.createElement('button');
		const buttonsDiv = document.createElement('div');

		text.textContent = q;
		yesButton.textContent = yes;
		yesButton.classList.add('yes');
		noButton.textContent = no;
		noButton.classList.add('no');
		buttonsDiv.classList.add('modal-buttons');

		yesButton.addEventListener('click', () => {
			resolve(true);
			closeModal();
		});
		noButton.addEventListener('click', () => {
			resolve(false);
			closeModal();
		});

		div.appendChild(text);
		buttonsDiv.appendChild(yesButton);
		buttonsDiv.appendChild(noButton);
		div.appendChild(buttonsDiv);

		showModal(div);
	});
};

export default confirm;
