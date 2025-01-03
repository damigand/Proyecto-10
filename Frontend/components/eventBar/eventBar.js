import createEvent from "@m/_eventForm/_eventForm.js";
import "./eventBar.css";
import filters from "@m/_filters/_filters";

const $ = (el) => document.querySelector(el);

const eventBarHTML = () => {
    return `
        <div class="event-bar-container">
            <div class="toggle-container">
                <i id="toggle-bar" class="bx bx-chevron-up"></i>
            </div>
            <div id="event-bar">
                <button id="filter-button">Filtros</button>
                <button id="create-button">Crear evento</button>
            </div>
        </div>
    `;
};

const eventBar = (container) => {
    const barHTML = eventBarHTML();
    container.insertAdjacentHTML("afterbegin", barHTML);

    const toggleBar = $("#toggle-bar");
    const eventBar = $("#event-bar");
    const filterButton = $("#filter-button");
    const createButton = $("#create-button");

    toggleBar.addEventListener("click", () => {
        eventBar.classList.toggle("hide");
        toggleBar.classList.toggle("bx-chevron-down");
        toggleBar.classList.toggle("bx-chevron-up");
    });

    filterButton.addEventListener("click", () => {
        filters();
    });

    createButton.addEventListener("click", () => {
        createEvent();
    });

    window.addEventListener("scroll", () => {
        //Compruebo si la barra está escondida.
        const isHidden = eventBar.classList.contains("hide");

        //Si la barra está escondida pero llego al "top" de la página,
        //Abro los filtros para que ocupen su espacio. Sin embargo,
        //Si no está escondida y hago scroll, la escondo para que no
        //tape información de los eventos.
        if ((window.scrollY == 0 && isHidden) || !isHidden) {
            toggleBar.click();
        }
    });
};

export default eventBar;
