import removeTimer from '../removeTimer/removeTimer.js';
import './createMessage.css';

const createMessage = (color, text) => {
	const messageDiv = document.querySelector('#messages');
	const message = document.createElement('div');
	message.classList.add('message');
	message.classList.add(color);

	const i = document.createElement('i');
	i.classList.add('bx');
	i.classList.add('bx-x');

	const span = document.createElement('span');
	span.innerText = text;

	message.appendChild(span);
	message.appendChild(i);

	i.addEventListener('click', () =>
		message.parentElement.removeChild(message)
	);

	messageDiv.insertBefore(message, messageDiv.firstChild);
	removeTimer(message);
};

export default createMessage;
