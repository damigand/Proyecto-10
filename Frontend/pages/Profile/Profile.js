import "./Profile.css";
import advancedProfile from "@c/advancedProfile/advancedProfile.js";
import makeRequest from "@c/makeRequest/makeRequest.js";
import { backButton } from "@c/backButton/backButton.js";
import userAvatar from "@c/userAvatar/userAvatar.js";
import getUserEvents from "@c/profileEvents/profileEvents";

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
    const textDiv = $(".profile-text");

    textDiv.innerHTML = `
		<div class="profile-usuario">
			<i class="bx bx-at"></i>
			<span>${user.usuario}</span>
		</div>
		<div class="profile-email">
			<i class="bx bx-envelope"></i>
			<span>${user.email || "-"}</span>
		</div>
	`;
};

const Profile = async (id, backNav, unload) => {
    document.querySelector("main").innerHTML = template();
    if (backNav) {
        const back = backButton(backNav, unload);
        $(".profile-container").insertAdjacentElement("afterbegin", back);
    }

    let user = JSON.parse(localStorage.getItem("user"));

    //Si hay ID, carga los datos del usuario con ese ID, independientemente
    //De si es el usuario local o no.
    const url = `/users/${id}`;
    const options = {
        method: "GET"
    };

    const response = await makeRequest(url, options);
    if (!response.success) return;

    //Variable para saber si el usuario puede editar la foto del perfil.
    let allowEdit = false;

    //Cargamos los datos.
    const visitedUser = response.json;
    getProfile(visitedUser);

    //Si el usuario cargado es el usuario local, muestro los controles
    //De editar, cerrar sesión, etcétera.
    if (user?._id == visitedUser._id) {
        allowEdit = true;
        user = visitedUser;
        localStorage.setItem("user", JSON.stringify(user));
        const mobileHTML = `
			<div class="mobile-avatar-controls hidden">
			</div>
		`;
        $(".profile-avatar").insertAdjacentHTML("afterend", mobileHTML);
        advancedProfile(user);
    }

    userAvatar(false, visitedUser, allowEdit);
    getUserEvents(visitedUser);
};

export default Profile;
