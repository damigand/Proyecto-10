const template = () => {
	return `
        <div id="profile">
            PROFILE
        </div>
    `;
};

const getProfile = async () => {};

const Profile = () => {
	document.querySelector('main').innerHTML = template();

	getProfile();
};

export default Profile;
