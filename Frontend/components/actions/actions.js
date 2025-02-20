import "./actions.css";
import eventForm from "../../pages/_Modals/_eventForm/_eventForm";
const $ = (el) => document.querySelector(el);

const template = () => {
    return `
        <div id="actions">
            <div class="action-create-event">
                <i class="bx bx-plus"></i>
            </div>
            <div class="action-show-filters">
                <i class="bx bx-filter"></i>
            </div>
        </div>
    `;
};

const actions = () => {
    $("main").insertAdjacentHTML("beforeend", template());

    const createEvent = $(".action-create-event");
    const showFilters = $(".action-show-filters");

    createEvent.addEventListener("click", () => {
        eventForm();
    });

    showFilters.addEventListener("click", () => {
        $("#action-bar").classList.toggle("showing");
    });
};

export default actions;
