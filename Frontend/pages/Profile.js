import './Profile.css';
import Events from './Events';
import confirm from '../components/confirm';
import handleResponse from '../components/handleResponse';
import createMessage from '../components/createMessage';

const $ = (el) => document.querySelector(el);

const template = () => {
	return `
        <div id="profile">
			<div id="confirm-remove" class="hidden">
				
			</div>
            <div class="profile-info">
                <div class="image">
                </div>
                <div class="text">
                </div>
            </div>
            <div class="actions">
                <button class="edit-info"><i class="bx bxs-edit"></i>Editar datos</button>
                <button class="log-out"><i class="bx bx-log-out"></i>Salir</button>
                <button class="remove-account"><i class="bx bx-error"></i>Eliminar cuenta</button>
            </div>
        </div>
    `;
};

const getProfile = (user) => {
	if (!user) {
		user = localStorage.getItem('user');
	}

	//Load user info

	const editInfoButton = $('.edit-info');
	const logOutButton = $('.log-out');
	const removeAccountButton = $('.remove-account');

	logOutButton.addEventListener('click', () => logOut());
	removeAccountButton.addEventListener('click', () => removeAccount());
};

const logOut = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('jwt');
	$('#link_profile').classList.add('hidden');
	$('#link_access').classList.remove('hidden');
	Events();
};

const removeAccount = async () => {
	const confirmation = await confirmModal();
	if (!confirmation) return;

	$('body').classList.add('loading');
	const token = 'Bearer ' + JSON.parse(localStorage.getItem('jwt'));
	const userId = JSON.parse(localStorage.getItem('user')).userId;
	const request = new Request(
		`http://localhost:3000/api/users/delete/${userId}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		}
	);

	const response = await fetch(request);
	const obj = await handleResponse(response);

	if (obj.success) {
		logOut();
		createMessage('green', obj.json);
	}

	$('body').classList.remove('loading');
};

const confirmModal = async () => {
	const question = 'Estás seguro de que quieres borrar tu cuenta?';
	const yesMessage = 'Estoy seguro';
	const noMessage = 'Cancelar';
	return await confirm(question, yesMessage, noMessage);
};

const Profile = (user) => {
	document.querySelector('main').innerHTML = template();

	getProfile(user);
};

export default Profile;
