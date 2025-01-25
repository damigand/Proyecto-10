import "./Profile.css";
import advancedProfile from "@c/advancedProfile/advancedProfile.js";
import makeRequest from "@c/makeRequest/makeRequest.js";
import { backButton } from "@c/backButton/backButton.js";
import userAvatar from "@c/userAvatar/userAvatar.js";
import eventDetails from "@p/EventDetails/eventDetails";

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

const eventElement = (event, userId) => {
    const back = {
        url: "Profile",
        id: userId,
    };

    const div = document.createElement("div");
    div.classList.add("profile-event");

    const title = document.createElement("h3");
    title.textContent = event.titulo;

    div.appendChild(title);

    div.addEventListener("click", () => eventDetails(event._id, back));
    return div;
};

const getUserEvents = async (user) => {
    const url = `http://localhost:3000/api/events/user/${user._id}`;
    const options = {
        method: "GET",
    };

    const response = await makeRequest(url, options);
    if (!response.success) return;

    const container = $("#profile");

    const events = document.createElement("div");
    events.classList.add("profile-events");

    const h2created = document.createElement("h2");
    const h2attending = document.createElement("h2");
    h2created.textContent = `Eventos creados por ${user.usuario}`;
    h2attending.textContent = `Eventos a los que ${user.usuario} atenderá`;

    const createdDiv = document.createElement("div");
    const attendingDiv = document.createElement("div");
    createdDiv.classList.add(".created-events");
    attendingDiv.classList.add(".attending-events");

    const json = response.json;
    const createdEvents = json.createdEvents;
    const attendingEvents = json.attendingEvents;

    for (const event of createdEvents) {
        createdDiv.appendChild(eventElement(event, user._id));
    }

    for (const event of attendingEvents) {
        attendingDiv.appendChild(eventElement(event, user._id));
    }

    events.appendChild(h2created);
    events.appendChild(createdDiv);
    events.appendChild(h2attending);
    events.appendChild(attendingDiv);

    container.appendChild(events);
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
    const url = `http://localhost:3000/api/users/${id}`;
    const options = {
        method: "GET",
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
        advancedProfile(user);
    }

    userAvatar(false, visitedUser, allowEdit);
    getUserEvents(visitedUser);
};

export default Profile;
