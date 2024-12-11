import './MyProfile.css';
import Events from './Events';
import confirm from '../components/confirm';
import makeRequest from '../components/makeRequest';
import createMessage from '../components/createMessage';

const $ = (el) => document.querySelector(el);

const template = () => {
	return `
        <div id="profile">
			<div id="confirm-remove" class="hidden">
			</div>
            <div class="profile-info">
                <div class="avatar">
                </div>
                <div class="text">
                </div>
            </div>
            <div class="actions">
                <button class="edit-info"><i class="bx bxs-edit"></i>Editar datos</button>
                <button class="log-out"><i class="bx bx-log-out"></i>Cerrar sesión</button>
                <button class="remove-account"><i class="bx bx-error"></i>Eliminar cuenta</button>
            </div>
        </div>
    `;
};

const getProfile = () => {
	const user = JSON.parse(localStorage.getItem('user'));

	const avatarDiv = $('#profile .avatar');
	const textDiv = $('#profile .text');
	if (!user.avatar) {
		avatarDiv.innerHTML = `
			<div class="no-avatar">${user.usuario[0]}</div>
		`;
	} else {
		// Añadir avatar en un futuro
	}
	textDiv.innerHTML = `
		<div class="usuario">
			<i class="bx bx-at"></i>
			<span>${user.usuario}</span>
		</div>
		<div class="email">
			<i class="bx bx-envelope"></i>
			<span>${user.email || '-'}</span>
		</div>
	`;

	const editInfoButton = $('.edit-info');
	const logOutButton = $('.log-out');
	const removeAccountButton = $('.remove-account');

	logOutButton.addEventListener('click', () => logOut());
	removeAccountButton.addEventListener('click', () => removeAccount());
};

const logOut = async (confirmation) => {
	if (!confirmation) {
		const question = 'Estás seguro de que quieres cerrar sesión?';
		const yesMessage = 'Cerrar sesión';
		const noMessage = 'Cancelar';
		const confirmation = await confirm(question, yesMessage, noMessage);
		if (!confirmation) return;
	}

	localStorage.removeItem('user');
	localStorage.removeItem('jwt');
	$('#link_profile').classList.add('hidden');
	$('#link_access').classList.remove('hidden');
	Events();
};

const removeAccount = async () => {
	const question = 'Estás seguro de que quieres borrar tu cuenta?';
	const yesMessage = 'Estoy seguro';
	const noMessage = 'Cancelar';
	const confirmation = await confirm(question, yesMessage, noMessage);
	if (!confirmation) return;

	const token = 'Bearer ' + JSON.parse(localStorage.getItem('jwt'));
	const userId = JSON.parse(localStorage.getItem('user')).userId;
	const url = `http://localhost:3000/api/users/delete/${userId}`;
	const options = {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	};

	const response = await makeRequest(url, options);

	if (response.success) {
		logOut(true);
		createMessage('green', response.json);
	}
};

const Profile = (user) => {
	document.querySelector('main').innerHTML = template();

	getProfile(user);
};

export default Profile;
