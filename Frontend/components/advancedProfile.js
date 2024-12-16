import './advancedProfile.css';
import Events from '../pages/Events/Events.js';
import confirm from './confirm.js';
import makeRequest from './makeRequest.js';
import createMessage from './createMessage.js';
import * as formCheck from './formCheck.js';

const $ = (el) => document.querySelector(el);

let localUser;

const confirmModal = () => {
	return `
		<div id="confirm-remove" class="hidden"></div>
	`;
};

//esto va dentro de .profile-info
const editForm = () => {
	return `
        <form id="edit-form" class="hidden">
            <div class="edit-usuario">
                <label for="usuario-input">Usuario</label>
                <input type="text" id="usuario-input" />
            </div>
            <div class="edit-email">
                <label for="email-input">
                    Email
                    <span class="optional">(Opcional)</span>
                </label>
                <input type="text" id="email-input" />
            </div>
            <div class="edit-actions">
                <button id="save-edit">Guardar</button>
                <button id="cancel-edit">Cancelar</button>
            </div>
        </form>
    `;
};

const actions = () => {
	return `
		<div class="actions">
			<button class="log-out"><i class="bx bx-log-out"></i>Cerrar sesión</button>
			<button class="edit-password"><i class="bx bxs-edit"></i>Cambiar contraseña</button>
			<button class="remove-account"><i class="bx bx-error"></i>Eliminar cuenta</button>
		</div>
	`;
};

//Esto va dentro de .profile-text
const editButton = () => {
	return `
		<div class="edit-info">
			<i class="bx bx-edit-alt"></i>
			<span class="edit-info-button">Editar datos</span>
		</div>
	`;
};

const editInfo = () => {
	$('.profile-text').classList.add('hidden');
	$('#edit-form').classList.remove('hidden');

	$('#usuario-input').value = localUser?.usuario;
	$('#email-input').value = localUser?.email;
};

const saveEdit = async (profile, form) => {
	const newUsuario = $('#usuario-input').value;
	const newEmail = $('#email-input').value;

	//Si el usuario no ha cambiado nada, no hacemos nada.
	if (localUser?.usuario == newUsuario && localUser?.email == newEmail) {
		closeEdit(profile, form);
		return;
	}

	let check;
	check = formCheck.checkTextInput(newUsuario, 'Usuario', 6);
	if (!check) return;

	if (newEmail) {
		check = formCheck.checkEmailInput(newEmail);
		if (!check) return;
	}

	const token = 'Bearer ' + JSON.parse(localStorage.getItem('jwt'));
	const url = `http://localhost:3000/api/users/edit/${localUser.userId}`;
	const reqBody = {
		usuario: newUsuario,
		email: newEmail,
	};
	const options = {
		method: 'PUT',
		body: JSON.stringify(reqBody),
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};

	const response = await makeRequest(url, options);
	if (response.success) {
		const color = 'green';
		const message = 'Usuario editado correctamente.';
		createMessage(color, message);

		const newUser = {
			usuario: response.json.usuario,
			email: response.json.email,
			userId: response.json._id,
		};
		localStorage.setItem('user', JSON.stringify(newUser));
		localUser = newUser;
		closeEdit(profile, form);

		$('.profile-usuario span').textContent = newUser.usuario;
		$('.profile-email span').textContent = newUser.email || '-';
	}
};

const closeEdit = (profile, form) => {
	profile.classList.remove('hidden');
	form.classList.add('hidden');
	form.reset();
};

const logOut = async (askQuestion) => {
	if (!askQuestion) {
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

const advancedProfile = (user) => {
	localUser = user;
	//Metemos todo el HTML que necesitamos.
	const profile = $('#profile');
	profile.insertAdjacentHTML('afterbegin', confirmModal());
	profile.insertAdjacentHTML('beforeend', actions());

	const profileInfo = $('.profile-info');
	profileInfo.insertAdjacentHTML('beforeend', editForm());

	const profileText = $('.profile-text');
	profileText.insertAdjacentHTML('afterbegin', editButton());

	const form = $('#profile form');
	const saveEditButton = $('#save-edit');
	const cancelEditButton = $('#cancel-edit');
	const editInfoButton = $('.edit-info');
	const logOutButton = $('.log-out');
	const removeAccountButton = $('.remove-account');
	saveEditButton.addEventListener('click', () => saveEdit(profileText, form));
	cancelEditButton.addEventListener('click', () =>
		closeEdit(profileText, form)
	);
	editInfoButton.addEventListener('click', () => editInfo());
	logOutButton.addEventListener('click', () => logOut());
	removeAccountButton.addEventListener('click', () => removeAccount());
	form.addEventListener('submit', (event) => event.preventDefault());
};

export default advancedProfile;
