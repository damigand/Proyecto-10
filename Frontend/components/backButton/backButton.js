import eventDetails from '@p/EventDetails/eventDetails';
import Events from '@p/Events/Events';

import './backButton.css';

const handleNavigation = (nav) => {
	switch (nav?.url) {
		case 'Event':
			eventDetails(nav?.id);
			break;
		case 'Profile':
			//Ir de vuelta al perfil.
			break;
		default:
			Events();
			break;
	}
};

const backButton = (nav) => {
	const div = document.createElement('div');
	div.id = 'backButton';

	const i = document.createElement('i');
	i.classList.add('bx', 'bx-arrow-back');

	const span = document.createElement('span');
	span.textContent = 'Volver';

	div.appendChild(i);
	div.appendChild(span);

	div.addEventListener('click', () => handleNavigation(nav));

	return div;
};

export default backButton;
