import { showModal } from "@m/_base";
import "./_filters.css";

const template = () => {
    return `
        <h2> Filtros </h3>
        <div id="quick-filters">
            <button class="assistant-filter" type="button">
                Participantes <i></i>
            </button>
            <button class="date-filter" type="button">
                Fecha <i></i>
            </button>
        </div>
    `;
};

const filters = () => {
    const div = document.createElement("div");
    div.innerHTML = template();

    showModal(div);
};

export default filters;
