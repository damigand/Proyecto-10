import "./advancedEvent.css";

import confirm from "@m/_confirm/_confirm";
import createMessage from "@c/createMessage/createMessage";
import makeRequest from "@c/makeRequest/makeRequest";
import Events from "@p/Events/Events";
import eventForm from "@m/_eventForm/_eventForm";

const $ = (el) => document.querySelector(el);

const template = () => {
    return `
        <div id="advanced-event-actions">
            <div class="edit-event">
                <i class="bx bxs-edit"></i>
                <span>Editar evento</span>
            </div>
            <div class="delete-event">
                <i class="bx bxs-trash"></i>
                <span>Borrar evento</span>
            </div>
        </div>
    `;
};

const deleteEvent = async (event) => {
    const question = "¿Seguro que quieres borrar el evento?";
    const check = await confirm(question, "Borrar", "Cancelar");

    if (!check) return;

    const url = `http://localhost:3000/api/events/delete/${event._id}`;
    const token = JSON.parse(localStorage.getItem("jwt"));

    const options = {
        method: "DELETE",
        headers: {
            Authorization: token,
        },
    };

    const response = await makeRequest(url, options);
    if (response.success) {
        Events();
        const color = "green";
        const message = "Evento borrado con éxito.";
        createMessage(color, message);
    }
};

const advancedEvent = (event) => {
    $(".event-info").insertAdjacentHTML("afterbegin", template());

    const editEventButton = $(".edit-event");
    const deleteEventButton = $(".delete-event");

    editEventButton.addEventListener("click", () => {
        eventForm(event);
    });

    deleteEventButton.addEventListener("click", () => deleteEvent(event));
};

export default advancedEvent;
