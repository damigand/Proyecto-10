import './userAvatar.css';

const userAvatar = (isSmall, user) => {
	if (!user.avatar) {
		return `
			<div class="${isSmall ? 'small-' : ''}no-avatar">${user.usuario[0]}</div>
		`;
	} else {
		// Añadir avatar en un futuro
	}
};

export default userAvatar;
