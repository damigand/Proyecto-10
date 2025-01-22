import "./userAvatar.css";

const userAvatar = (isSmall, user) => {
    if (!user.avatar) {
        return `
			<div class="${isSmall ? "small-" : ""}no-avatar user-avatar">${user.usuario[0]}
			</div>
		`;
    } else {
        return `
            <div class="${isSmall ? "small-" : ""}avatar user-avatar">
                <img src="${user.avatar}" />
			</div>
        `;
    }
};

export default userAvatar;
