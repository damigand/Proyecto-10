import createMessage from '@c/createMessage/createMessage';
import './userAvatar.css';
import { uploadImg, removeImg } from '@c/uploadImg/imgHandler';

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

		const message = 'Foto de perfil subida con éxito.';
		const color = 'green';
		createMessage(color, message);
	}
};

const removeAvatar = async () => {
	const response = await removeImg();
	if (response?.success) {
		const user = JSON.parse(localStorage.getItem('user'));
		user.avatar = '';
		localStorage.setItem('user', JSON.stringify(user));
		userAvatar(false, user, true);

		const message = response.json;
		const color = 'green';
		createMessage(color, message);
	}
};

const userAvatar = (isSmall, user, allowEdit) => {
	//Si el icono es pequeño, no estamos visitando un perfil
	//En este caso, hay que retornarlo porque no estamos cambiando el "profile-avatar".
	if (isSmall) return template(isSmall, user);

	//Si es un icono grande, estamos visitando un perfil.
	$('.profile-avatar').innerHTML = template(isSmall, user);

	//Si el perfil es nuestro, enganchamos todo lo que tenga que ver
	//Con cambiar el avatar.
	if (allowEdit) {
		const div = $('.profile-avatar div');
		const labelUpload = document.createElement('label');
		labelUpload.setAttribute('for', 'upload-avatar');
		labelUpload.textContent = 'Subir foto';

		const labelRemove = document.createElement('label');
		labelRemove.textContent = 'Eliminar foto';

		const input = document.createElement('input');
		input.type = 'file';
		input.id = 'upload-avatar';
		input.classList.add('hidden');
		input.accept = '.png,.jpg,.jpeg,.webp';

		const container = document.createElement('div');
		container.classList.add('avatar-controls');

		container.appendChild(labelUpload);
		container.appendChild(labelRemove);
		container.appendChild(input);

		input.addEventListener('change', () => changeAvatar(input));
		labelRemove.addEventListener('click', () => removeAvatar());
		div.appendChild(container);
	}
};

export default userAvatar;
