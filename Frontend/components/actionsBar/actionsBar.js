import eventForm from "@m/_eventForm/_eventForm";
import "./actionsBar.css";
const $ = (el) => document.querySelector(el);

const template = () => {
    return `
        <div id="action-bar">
            <button id="create-event-button">Crear evento</button>
            <div class="filter-events-container">
                <h3>Ordenar por</h3>
                <div class="quick-filters">
                    <button class="assistants-order">
                        <div>
                            Asistentes
                            <i class="bx bx-up-arrow"></i>
                        </div>
                        <span>( - )</span>
                    </button>
                    <button class="date-order">
                        <div>
                            Fecha
                            <i class="bx bx-up-arrow"></i>
                        </div>
                        <span>( - )</span>
                    </button>
                </div>
                <h3>Filtros</h3>
                <form id="filter-events-form">
                    
                    <div id="filter-assistants">
                        <h4>Asistentes</h4>
                        <div>
                            <label for="less-assistants">Menos de</label>
                            <input type="number" id="less-assistants" />
                        </div>
                        <div>
                            <label for="more-assistants">Más de</label>
                            <input type="number" id="more-assistants" />
                        </div>
                    </div>
                    <div id="filter-date">
                        <h4>Fecha</h4>
                        <div>
                            <label for="before-date">Antes del</label>
                            <input type="date" id="before-date" />
                        </div>
                        <div>
                            <label for="after-date">Después del</label>
                            <input type="date" id="after-date" />
                        </div>
                    </div>
                    <div id="filter-actions">
                        <button type="button" id="filter-submit">
                            <i class='bx bx-filter-alt' ></i>
                            Buscar
                        </button>
                        <button type="button" id="filter-clear">
                            <i class='bx bx-x'></i>
                            Limpiar
                        </button>
                    </div>
                </form>
            </div>
			<span class="show-action-bar">Filtros</span>
        </div>
    `;
};

let assistIndex = 0;
let dateIndex = 0;

const setUpFilters = () => {
    const assistFilterButton = $(".assistants-order");
    assistFilterButton.addEventListener("click", () => {
        assistIndex = changeQuickFilter(assistIndex, assistFilterButton, false);
    });

    const dateFilterButton = $(".date-order");
    dateFilterButton.addEventListener("click", () => {
        dateIndex = changeQuickFilter(dateIndex, dateFilterButton, true);
    });

    const filterButton = $("#filter-submit");
    const clearButton = $("#filter-clear");

    filterButton.addEventListener("click", () => filterEvents());
    clearButton.addEventListener("click", () => resetFilters());
};

const filterEvents = () => {
    console.log("filtrando");
};

const resetFilters = () => {
    console.log("reseteando");
};

const actionBar = () => {
    $("main").insertAdjacentHTML("afterbegin", template());
    $("#create-event-button").addEventListener("click", () => {
        eventForm();
        $("#action-bar").classList.remove("active-bar");
        $(".show-action-bar").textContent = "Filtros";
    });

    setUpFilters();

    const showActionBar = $(".show-action-bar");
    showActionBar.addEventListener("click", () => {
        $("#action-bar").classList.toggle("active-bar");
        if ($("#action-bar").classList.contains("active-bar")) {
            showActionBar.innerHTML = `
				<i class='bx bx-x'></i>
			`;
        } else {
            showActionBar.innerHTML = "Filtros";
        }
    });
};

//Cambia aspectos visuales de los botones y su valor
//Para ir rotando.
const changeQuickFilter = (index, button, isDate) => {
    const icon = button.querySelector("i");
    const text = button.querySelector("span");
    switch (index) {
        case 0:
            index = 1;
            button.classList.add("most");
            icon.classList.toggle("bx-up-arrow");
            icon.classList.toggle("bxs-up-arrow");
            text.textContent = isDate ? "(Más reciente)" : "(Mayor a menor)";
            break;
        case 1:
            index = 2;
            button.classList.remove("most");
            button.classList.add("least");
            icon.classList.toggle("reverse");
            text.textContent = isDate ? "(Más antiguo)" : "(Menor a mayor)";
            break;
        case 2:
            index = 0;
            button.classList.remove("least");
            icon.classList.toggle("bx-up-arrow");
            icon.classList.toggle("bxs-up-arrow");
            icon.classList.remove("reverse");
            text.textContent = "( - )";
            break;
    }

    return index;
};

export default actionBar;
