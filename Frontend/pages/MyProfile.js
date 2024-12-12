import './MyProfile.css';
import Events from './Events';
import confirm from '../components/confirm';
import makeRequest from '../components/makeRequest';
import createMessage from '../components/createMessage';
import * as formCheck from '../components/formCheck';

const $ = (el) => document.querySelector(el);

const template = () => {
	return `
        <div id="profile">
			<div id="confirm-remove" class="hidden">
			</div>
            <div class="profile-info">
                <div class="profile-avatar">
                </div>
                <div class="profile-text">
                </div>
				<form id="edit-form" class="hidden">
					<div class="edit-usuario">
						<label for="usuario-input">Nuevo usuario:</label>
						<input type="text" id="usuario-input" />
					</div>
					<div class="edit-email">
						<label for="email-input">Nuevo email:</label>
						<input type="text" id="email-input" />
					</div>
					<div class="edit-actions">
						<button id="save-edit">Guardar</button>
						<button id="cancel-edit">Cancelar</button>
					</div>
				</form>
            </div>
            <div class="actions">
				<button class="log-out"><i class="bx bx-log-out"></i>Cerrar sesión</button>
                <button class="edit-password"><i class="bx bxs-edit"></i>Cambiar contraseña</button>
                <button class="remove-account"><i class="bx bx-error"></i>Eliminar cuenta</button>
            </div>
        </div>
    `;
};

const getProfile = () => {
	const user = JSON.parse(localStorage.getItem('user'));

	const avatarDiv = $('.profile-avatar');
	const textDiv = $('.profile-text');
	if (!user.avatar) {
		avatarDiv.innerHTML = `
			<div class="no-avatar">${user.usuario[0]}</div>
		`;
	} else {
		// Añadir avatar en un futuro
	}
	textDiv.innerHTML = `
		<div class="edit-info">
			<i class="bx bx-edit-alt"></i>
			<span class="edit-info-button">Editar datos</span>
		</div>
		<div class="profile-usuario">
			<i class="bx bx-at"></i>
			<span>${user.usuario}</span>
		</div>
		<div class="profile-email">
			<i class="bx bx-envelope"></i>
			<span>${user.email || '-'}</span>
		</div>
	`;

	const editInfoButton = $('.edit-info');
	const logOutButton = $('.log-out');
	const removeAccountButton = $('.remove-account');

	editInfoButton.addEventListener('click', () => editInfo());
	logOutButton.addEventListener('click', () => logOut());
	removeAccountButton.addEventListener('click', () => removeAccount());
};

const editInfo = () => {
	const profile = $('.profile-text');
	const form = $('#edit-form');
	profile.classList.add('hidden');
	form.classList.remove('hidden');

	const save = $('#save-edit');
	const cancel = $('#cancel-edit');

	save.addEventListener('click', async () => {
		await saveEdit();
		closeEdit(profile, form);
	});

	cancel.addEventListener('click', () => closeEdit(profile, form));
};

const saveEdit = async () => {
	//CAMBIAR LOGIN Y REGISTER PARA USAR FORMCHECK.
	//formCheck.checkTextInput();
};

const closeEdit = (profile, form) => {
	profile.classList.remove('hidden');
	form.classList.add('hidden');
	form.reset();
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

	//Cancelar la recarga de página al editar la información de usuario.
	$('#edit-form').addEventListener('submit', (event) =>
		event.preventDefault()
	);

	getProfile(user);
};

export default Profile;
