import eventDetails from "@p/EventDetails/eventDetails.js";
import Access from "@p/Access/Access.js";
import "./Events.css";
import createMessage from "@c/createMessage/createMessage.js";
import makeRequest from "@c/makeRequest/makeRequest.js";
import actionBar from "@c/actionsBar/actionsBar";

const $ = (el) => document.querySelector(el);
const $$ = (els) => document.querySelectorAll(els);

const template = () => {
    $("#link_events").classList.add("active");
    $("#link_profile").classList.remove("active");
    return `
        <section id="events">
            <div id="event-container">  
            </div>
        </section>
    `;
};

const getEvents = async (params) => {
    const url = `http://localhost:3000/api/events${params ? "/" + params : ""}`;
    const options = {
        method: "GET",
    };

    const response = await makeRequest(url, options);
    if (response.success) {
        const container = $("#event-container");
        const events = response.json;

        for (const event of events) {
            const element = eventElement(event);
            container.appendChild(element);
        }
    }
};

const eventElement = (event) => {
    const div = document.createElement("div");
    div.classList.add("event");

    const title = document.createElement("h1");
    title.classList.add("title");
    title.innerText = event.titulo;

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    const dateText = document.createElement("span");
    const dateIcon = document.createElement("i");
    const dateObject = new Date(event.fecha);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    dateText.innerText = dateObject.toLocaleDateString("es-ES", options);
    dateIcon.classList.add("bx");
    dateIcon.classList.add("bxs-calendar");

    dateDiv.appendChild(dateIcon);
    dateDiv.appendChild(dateText);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const detailsButton = document.createElement("button");
    detailsButton.classList.add("details");
    detailsButton.addEventListener("click", () => eventDetails(event._id));

    const detailsIcon = document.createElement("i");
    detailsIcon.classList.add("bx");
    detailsIcon.classList.add("bx-info-circle");
    detailsButton.insertAdjacentElement("afterbegin", detailsIcon);

    //Variables usadas para controlar el aspecto de los botones al cargar.
    const user = localStorage.getItem("user");
    const usuario = JSON.parse(user)?.usuario;
    const attending = event.asistentes.some((e) => e.usuario == usuario);

    const assistants = document.createElement("span");
    assistants.classList.add("event-assistants");
    assistants.textContent = `${event.asistentes?.length} asistentes`;

    const attendButton = document.createElement("button");
    if (attending) attendButton.classList.add("attending");
    attendButton.classList.add("attend");
    attendButton.addEventListener("click", () => {
        attendEvent(event, attendButton, assistants);
    });

    const attendIcon = document.createElement("i");
    attendIcon.classList.add("bx");
    attendIcon.classList.add(attending ? "bx-user-minus" : "bx-user-plus");
    attendButton.insertAdjacentElement("afterbegin", attendIcon);

    actionsDiv.appendChild(detailsButton);
    actionsDiv.appendChild(attendButton);

    div.appendChild(title);
    div.appendChild(dateDiv);
    div.appendChild(actionsDiv);
    div.appendChild(assistants);
    return div;
};

const attendEvent = async (event, button, assistants) => {
    const token = JSON.parse(localStorage.getItem("jwt"));
    if (!token) {
        Access();
        createMessage("red", "Necesitas acceso para atender un evento.");
    }

    const url = `http://localhost:3000/api/events/attend/${event._id}`;

    const options = {
        method: "POST",
        headers: {
            Authorization: token,
        },
    };

    const response = await makeRequest(url, options);
    if (response.success) {
        const json = response.json;

        //Si el usuario atiende, cambiamos todos
        //los aspectos visuales y mostramos mensaje.
        if (json.attending) {
            const color = "green";
            const message = json.message;
            createMessage(color, message);

            button.classList.add("attending");
            const i = button.querySelector("i");
            i.classList.add("bx-user-minus");
            i.classList.remove("bx-user-plus");
        } else {
            const color = "yellow";
            const message = json.message;
            createMessage(color, message);
            button.classList.remove("attending");
            const i = button.querySelector("i");
            i.classList.remove("bx-user-minus");
            i.classList.add("bx-user-plus");
        }

        assistants.textContent = `${json.count} asistentes`;
    }
};

const Events = (params) => {
    $("main").innerHTML = template();

    getEvents(params);

    actionBar();
};

export default Events;
