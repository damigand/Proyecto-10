import './Profile.css';
import advancedProfile from '@c/advancedProfile/advancedProfile.js';
import makeRequest from '@c/makeRequest/makeRequest.js';
import backButton from '@c/backButton/backButton.js';
import userAvatar from '@c/userAvatar/userAvatar.js';
import uploadImg from '@c/uploadImg/uploadImg';

const $ = (el) => document.querySelector(el);
const template = () => {
	return `
	<div class="profile-container">
        <div id="profile">
            <div class="profile-info">
                <div class="profile-avatar">
                </div>
                <div class="profile-text">
                </div>
            </div>
        </div>
	</div>
    `;
};

const getProfile = (user) => {
	const avatarDiv = $('.profile-avatar');
	const textDiv = $('.profile-text');
	avatarDiv.insertAdjacentHTML('beforeend', userAvatar(false, user));

	textDiv.innerHTML = `
		<div class="profile-usuario">
			<i class="bx bx-at"></i>
			<span>${user.usuario}</span>
		</div>
		<div class="profile-email">
			<i class="bx bx-envelope"></i>
			<span>${user.email || '-'}</span>
		</div>
	`;
};

const Profile = async (id, backNav) => {
	document.querySelector('main').innerHTML = template();
	if (backNav) {
		const back = backButton(backNav);
		$('.profile-container').insertAdjacentElement('afterbegin', back);
	}

	//Para poder cambiar la imagen de perfil.
	const avatar = $('.profile-avatar');
	avatar.addEventListener('click', () => uploadImg(avatar));

	const user = JSON.parse(localStorage.getItem('user'));

	//Si no pasa ID pero hay usuario local, carga el propio usuario.
	if (!id && user) {
		getProfile(user);
		advancedProfile(user);
		return;
	}

	//Si hay ID, carga los datos del usuario con ese ID, independientemente
	//De si es el usuario local o no.
	const url = `http://localhost:3000/api/users/${id}`;
	const options = {
		method: 'GET',
	};

	const response = await makeRequest(url, options);
	if (!response.success) return;

	//Cargamos los datos.
	const visitedUser = response.json;
	getProfile(visitedUser);

	//Si el usuario cargado es el usuario local, muestro los controles
	//De editar, cerrar sesión, etcétera.
	if (user?.userId == visitedUser._id) advancedProfile(user);
};

export default Profile;
