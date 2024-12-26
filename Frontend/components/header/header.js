import './header.css';
const $ = (el) => document.querySelector(el);

import Access from '@p/Access/Access';
import Events from '@p/Events/Events';
import Profile from '@p/Profile/Profile';

const template = () => {
	return `
        <ul id="nav">
            <li id="theme">
                <i class="theme-icon bx bxs-sun"></i>
                <span class="theme-text">Light</span>
            </li>
            <li id="link_events" class="active">Eventos</li>
            <li id="link_profile" class="hidden">Mi perfil</li>
            <li id="link_access" class="hidden">
                <div id="link_login">
                    <span class="text">Acceso</span>
                </div>
            </li>
        </ul>
    `;
};

const header = () => {
	$('header').innerHTML = template();

	const linkEvents = $('#link_events');
	const linkProfile = $('#link_profile');
	const linkAccess = $('#link_access');

	//Si hay usuario, cargo el botón de "Perfil", si no, cargo
	//El botón de "Acceso".
	const jwt = localStorage.getItem('jwt');
	if (jwt) {
		linkProfile.classList.remove('hidden');
	} else {
		linkAccess.classList.remove('hidden');
	}

	//Cuando haga clic en algún elemento del header,
	//Realiza la acción y cambia estilos del header.
	linkEvents.addEventListener('click', () => {
		Events();
		linkProfile.classList.remove('active');
		linkEvents.classList.add('active');
	});

	linkProfile.addEventListener('click', () => {
		Profile();
		linkProfile.classList.add('active');
		linkEvents.classList.remove('active');
	});

	linkAccess.addEventListener('click', () => {
		Access();
	});
};

export default header;
