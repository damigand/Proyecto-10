import eventDetails from "@p/EventDetails/eventDetails";
import makeRequest from "@c/makeRequest/makeRequest";
import "./profileEvents.css";

const $ = (el) => document.querySelector(el);

const eventElement = (event, userId) => {
    const back = {
        url: "Profile",
        id: userId
    };

    const div = document.createElement("div");
    div.classList.add("profile-event");

    const title = document.createElement("h3");
    title.textContent = event.titulo;

    const button = document.createElement("span");
    button.classList.add("visit-event");
    button.classList.add("hidden");

    const icon = document.createElement("i");
    icon.classList.add("bx");
    icon.classList.add("bx-right-arrow-alt");

    button.appendChild(icon);

    div.addEventListener("click", () => eventDetails(event._id, back));

    div.appendChild(title);
    div.appendChild(button);

    return div;
};

const getUserEvents = async (user) => {
    const url = `/events/user/${user._id}`;
    const options = {
        method: "GET"
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
    createdDiv.classList.add("created-events");
    attendingDiv.classList.add("attending-events");

    const json = response.json;
    const createdEvents = json.createdEvents;
    const attendingEvents = json.attendingEvents;

    if (createdEvents.length > 0) {
        for (const event of createdEvents) {
            createdDiv.appendChild(eventElement(event, user._id));
        }
    } else {
        const span = document.createElement("span");
        span.classList.add("empty-message");
        span.textContent = `${user.usuario} no ha creado ningún evento.`;
        createdDiv.appendChild(span);
    }

    if (attendingEvents.length > 0) {
        for (const event of attendingEvents) {
            attendingDiv.appendChild(eventElement(event, user._id));
        }
    } else {
        const span = document.createElement("span");
        span.classList.add("empty-message");
        span.textContent = `${user.usuario} no asistirá a ningún evento.`;
        attendingDiv.appendChild(span);
    }
    events.appendChild(h2created);
    events.appendChild(createdDiv);
    events.appendChild(h2attending);
    events.appendChild(attendingDiv);

    container.appendChild(events);
};

export default getUserEvents;
