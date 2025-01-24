import './userAvatar.css';
import uploadImg from '@c/uploadImg/uploadImg';

const $ = (el) => document.querySelector(el);

const template = (isSmall, user) => {
	if (!user.avatar) {
		return `
			<div class="${isSmall ? 'small-' : ''}no-avatar user-avatar">${user.usuario[0]}
			</div>
		`;
	} else {
		return `
            <div class="${isSmall ? 'small-' : ''}avatar user-avatar">
                <img src="${user.avatar}" />
			</div>
        `;
	}
};

const changeAvatar = async (input) => {
	const response = await uploadImg(input);
	if (response.success) {
		const user = JSON.parse(localStorage.getItem('user'));
		user.avatar = response.json;
		localStorage.setItem('user', JSON.stringify(user));
		userAvatar(false, user, true);
	}
};

const userAvatar = (isSmall, user, allowEdit) => {
	//Si el icono es pequeño, no estamos visitando un perfil
	//Por lo que no hace falta nada más que el template.
	if (isSmall) return template(isSmall, user);

	//Si es un icono grande, estamos visitando un perfil.
	$('.profile-avatar').innerHTML = template(isSmall, user);

	const div = $('.profile-avatar div');
	const label = document.createElement('label');
	label.setAttribute('for', 'upload-avatar');
	label.textContent = 'Subir foto';

	const input = document.createElement('input');
	input.type = 'file';
	input.id = 'upload-avatar';
	input.classList.add('hidden');
	input.accept = '.png,.jpg,.jpeg,.webp';

	//Si el perfil es nuestro, enganchamos todo lo que tenga que ver
	//Con cambiar el avatar.
	if (allowEdit) {
		input.addEventListener('change', () => changeAvatar(input));
		div.appendChild(label);
		div.appendChild(input);
	}
};

export default userAvatar;
