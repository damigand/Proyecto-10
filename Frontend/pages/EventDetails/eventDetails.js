import makeRequest from "../../components/makeRequest/makeRequest.js";
import backButton from "../../components/backButton/backButton.js";
import userAvatar from "../../components/userAvatar/userAvatar.js";
import Profile from "../Profile/Profile.js";
import "./eventDetails.css";

const $ = (el) => document.querySelector(el);
const $$ = (els) => document.querySelector(els);

const template = () => {
    return `
        <div id="event-details">
            
            
        </div>
    `;
};

const getDetails = (event) => {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event-info");

    var attendants = document.createElement("div");
    attendants.classList.add("attendants");

    eventDiv.innerHTML = eventHTML(event);
    attendants = attendantsHTML(attendants, event.asistentes, event._id);

    $("#event-details").appendChild(eventDiv);
    $("#event-details").appendChild(attendants);

    const creador = $(".creador-usuario");
    creador.addEventListener("click", () => {
        Profile(event.creador._id, { url: "Event", id: event._id });
    });
};

const eventHTML = (event) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const date = new Date(event.fecha).toLocaleDateString("es-ES", options);
    return `
        <h1>${event.titulo}</h1>
        <div class="creador">Creado por <span class="creador-usuario">${
            event.creador.usuario
        }</span></div>
        <p>${
            event.descripcion ? event.descripcion : "Este evento no tiene ninguna descripción."
        }</p>
        <div class="date">
            <i class="bx bxs-calendar"></i>
            <span>${date}</span>
        </div>
        <div class="location">
            <i class="bx bxs-map"></i>
            <span>${event.ubicacion}</span>
        </div>
    `;
};

const attendantsHTML = (attendantsDiv, attendants, eventId) => {
    const avatarsDiv = document.createElement("div");
    avatarsDiv.classList.add("users");

    //Ponemos un maximo de 5 asistentes
    //que se verán en el div pequeño.
    const max = 5;

    //Por cada asistente creamos su div.
    for (const user of attendants) {
        const div = document.createElement("div");
        div.classList.add("attendant");
        div.innerHTML = userAvatar(true, user);

        const usuario = document.createElement("span");
        usuario.innerText = user.usuario;

        const backButton = { url: "Event", id: eventId };
        usuario.addEventListener("click", () => Profile(user._id, backButton));

        div.appendChild(usuario);
        avatarsDiv.appendChild(div);
    }

    //Botón de "ver más" para ver todos los participantes
    //Mediante CSS se verán solo 5 participantes hasta
    //que se presione este botón y se muestren todos.
    const seeMoreDiv = document.createElement("div");
    seeMoreDiv.classList.add("more");

    const more = attendants.length - max;

    const span = document.createElement("span");
    const text = `${more} más...`;
    span.textContent = more > 0 ? text : "Ver detalles";

    seeMoreDiv.appendChild(span);

    //Alternamos aspectos visuales al dar click en el botón
    //De ver participantes o ver menos.
    seeMoreDiv.addEventListener("click", () => {
        attendantsDiv.classList.toggle("active");
        if (attendantsDiv.classList.contains("active")) {
            span.textContent = "Cerrar";
        } else {
            span.textContent = more > 0 ? text : "Ver detalles";
        }

        //Animamos el aspecto del botón.
        span.animate({ opacity: 0 }, { duration: 1000, direction: "reverse" });
    });

    //Retornamos todo montado.
    attendantsDiv.appendChild(avatarsDiv);
    attendantsDiv.appendChild(seeMoreDiv);
    return attendantsDiv;
};

const eventDetails = async (eventId, backNav) => {
    $("main").innerHTML = template();
    const back = backButton(backNav);
    $("#event-details").insertAdjacentElement("afterbegin", back);

    const url = `http://localhost:3000/api/events/${eventId}`;
    const options = {
        method: "GET",
    };

    const response = await makeRequest(url, options);
    if (response.success) {
        const event = response.json;
        getDetails(event);
    }
};

export default eventDetails;
