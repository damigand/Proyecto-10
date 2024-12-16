import './Profile.css';
import advancedProfile from '../../components/advancedProfile';
import createMessage from '../../components/createMessage';
import makeRequest from '../../components/makeRequest';

const $ = (el) => document.querySelector(el);
const template = () => {
	return `
        <div id="profile">
            <div class="profile-info">
                <div class="profile-avatar">
                </div>
                <div class="profile-text">
                </div>
            </div>
        </div>
    `;
};

const getProfile = (user) => {
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

const Profile = async (id) => {
	document.querySelector('main').innerHTML = template();
	const user = JSON.parse(localStorage.getItem('user'));

	//Si no pasa ID pero hay usuario, carga el propio usuario.
	if (!id) {
		if (user) {
			getProfile(user);
			advancedProfile(user);
			return;
		}

		//error.
	}

	//Si hay ID, carga los datos del usuario con ese ID.
	const url = `http://localhost:3000/api/users/${id}`;
	const options = {
		method: 'GET',
	};

	const response = await makeRequest(url, options);
	if (!response.success) return;

	const visitedUser = response.json;
	getProfile(visitedUser);

	if (user?.userId == visitedUser._id) advancedProfile();
};

export default Profile;
