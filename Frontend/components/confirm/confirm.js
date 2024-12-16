import './confirm.css';

const confirm = async (q, yes, no) => {
	return new Promise((resolve, reject) => {
		const modal = document.querySelector('#modal');

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
			modal.classList.add('hidden');
			modal.removeChild(div);
		});
		noButton.addEventListener('click', () => {
			resolve(false);
			modal.classList.add('hidden');
			modal.removeChild(div);
		});

		div.appendChild(text);
		buttonsDiv.appendChild(yesButton);
		buttonsDiv.appendChild(noButton);
		div.appendChild(buttonsDiv);

		modal.appendChild(div);
		modal.classList.remove('hidden');
	});
};

export default confirm;
