import eventForm from "@m/_eventForm/_eventForm";
import "./actionsBar.css";
import makeRequest from "@c/makeRequest/makeRequest";
import Events from "@p/Events/Events";
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
                            <input type="number" id="less-assistants"/>
                        </div>
                        <div>
                            <label for="more-assistants">Más de</label>
                            <input type="number" id="more-assistants"/>
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

let localParams;

const setUpFilters = () => {
    changeQuickFilter(assistIndex, $(".assistants-order"), false, true);
    changeQuickFilter(dateIndex, $(".date-order"), true, true);
    $("#less-assistants").value = localParams?.get("assistLower");
    $("#more-assistants").value = localParams?.get("assistHigher");
    $("#before-date").value = localParams?.get("beforeDate");
    $("#after-date").value = localParams?.get("afterDate");

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

const getOrderValues = () => {
    let assistOrder, dateOrder;
    switch (assistIndex) {
        case 1:
            assistOrder = "asc";
            break;
        case 2:
            assistOrder = "desc";
            break;
        case 3:
            assistOrder = "";
            break;
    }

    switch (dateIndex) {
        case 1:
            dateOrder = "desc";
            break;
        case 2:
            dateOrder = "asc";
            break;
        case 3:
            dateOrder = "";
            break;
    }

    return { assistOrder, dateOrder };
};

const filterEvents = async () => {
    //Objeto "params" que se irá construyendo para ir metiendo los filtros
    //Y ordenes determinados por el usuario.
    const params = new URLSearchParams();

    //Obtengo los valores de cada filtro de "ordenar por".
    const { assistOrder, dateOrder } = getOrderValues();

    if (dateOrder) params.append("dateOrder", dateOrder);
    if (assistOrder) params.append("assistOrder", assistOrder);

    //obtengo los valores de cada filtro de "filtros".
    const assistLower = $("#less-assistants").value;
    const assistHigher = $("#more-assistants").value;

    if (assistLower) params.append("assistLower", assistLower);
    if (assistHigher) params.append("assistHigher", assistHigher);

    const beforeDate = $("#before-date").value;
    const afterDate = $("#after-date").value;

    if (beforeDate) params.append("beforeDate", beforeDate);
    if (afterDate) params.append("afterDate", afterDate);

    //Guarda los filtros para que se re-apliquen si el usuario entra
    // a un evento filtrado y después vuelve hacia atrás.
    localParams = params;

    Events(params);
};

const resetFilters = () => {
    $("#filter-events-form").reset();
    assistIndex = 0;
    dateIndex = 0;

    const assistButton = $(".assistants-order");
    const dateButton = $(".date-order");

    updateButton(assistIndex, assistButton, false);
    updateButton(dateIndex, dateButton, true);
};

const updateButton = (index, button, isDate) => {
    const icon = button.querySelector("i");
    const text = button.querySelector("span");
    switch (index) {
        case 0:
            button.classList.remove("least");
            button.classList.remove("most");
            icon.classList.add("bx-up-arrow");
            icon.classList.remove("bxs-up-arrow");
            icon.classList.remove("reverse");
            text.textContent = "( - )";
            break;
        case 1:
            button.classList.add("most");
            icon.classList.toggle("bx-up-arrow");
            icon.classList.toggle("bxs-up-arrow");
            text.textContent = isDate ? "(Más cerano)" : "(Mayor a menor)";
            break;
        case 2:
            button.classList.remove("most");
            button.classList.add("least");
            icon.classList.toggle("reverse");
            text.textContent = isDate ? "(Más lejano)" : "(Menor a mayor)";
            break;
    }
};

//Cambia aspectos visuales de los botones y su valor
//Para ir rotando.
const changeQuickFilter = (index, button, isDate, loading) => {
    switch (index) {
        case 0:
            if (!loading) index = 1;
            updateButton(index, button, isDate);
            break;
        case 1:
            if (!loading) index = 2;
            updateButton(index, button, isDate);
            break;
        case 2:
            if (!loading) index = 0;
            updateButton(index, button, isDate);
            break;
    }

    return index;
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

export default actionBar;
