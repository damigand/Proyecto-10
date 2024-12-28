import "./advancedEvent.css";

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

const advancedEvent = (event) => {
    $(".event-info").insertAdjacentHTML("beforeend", template());

    const editEventButton = $(".edit-event");
    const deleteEventButton = $(".delete-event");

    editEventButton.addEventListener("click", () => {
        eventForm(event);
    });
};

export default advancedEvent;
