import "./_eventForm.css";
import { showModal, closeModal } from "@m/_base.js";
import * as formCheck from "@c/formCheck/formCheck.js";
import makeRequest from "@c/makeRequest/makeRequest";
import eventDetails from "@p/EventDetails/eventDetails";
import createMessage from "@c/createMessage/createMessage";
const $ = (el) => document.querySelector(el);

const maxTitle = 50;
const maxDesc = 200;
const maxUbicacion = 50;
let isImageRemoved = false;

const template = (isEditing) => {
    return `
        <div id="create-event">
            <h1>Crear nuevo evento</h1>
            <form id="create-event-form">
                <div class="form-title">
                    <label for="event-title">Título</label>
                    <input type="text" id="event-title" />
                    <p class="input-length">
                        <span class="current-length">0</span>
                        /
                        <span class="max-length">${maxTitle}</span>
                    </p>
                </div>
                <div class="form-description">
                    <label for="event-desc">
                        Descripción
                        <span class="optional">(Opcional)</span>
                    </label>
                    <textarea id="event-desc" rows="4"></textarea>
                    <p class="input-length">
                        <span class="current-length">0</span>
                        /
                        <span class="max-length">${maxDesc}</span>
                    </p>
                </div>
                <div class="form-datetime">
                    <div class="form-date">
                        <label for="event-date">Fecha</label>
                        <input type="date" id="event-date">
                    </div>
                    <div class="form-time">
                        <label for="event-time">Hora</label>
                        <input type="time" id="event-time" />   
                    </div>
                </div>
                <div class="form-ubicacion">
                    <label for="event-ubicacion">Ubicación</label>
                    <input type="text" id="event-ubicacion" />
                    <p class="input-length">
                        <span class="current-length">0</span>
                        /
                        <span class="max-length">${maxUbicacion}</span>
                    </p>
                </div>
                <div class="form-attend">
                    <input type="checkbox" id="event-attend" />
                    <label for="event-attend">Atenderé al evento.</label>
                </div>
				<div class="form-image">
					<span>Imagen del evento
						<span class="optional">(Opcional)</span>
					</span>
					<div>
						<label class="select-image" for="event-image-input">Seleccionar</label>
						<span class="image-name"></span>
					</div>
					<input type="file" id="event-image-input" class="hidden" name="image"/>
                    <span class="hidden remove-image">Borrar foto</span>
					<img src="" id="event-image" class="hidden"/>
				</div>
            </form>
            <div class="create-event-actions">
                <button type="button" id="submit-event">
				${isEditing ? "Guardar cambios" : "Crear evento"} 
				</button>
                <button type="button" id="cancel-event">Cancelar</button>
            </div>
        </div>
    `;
};

const inputCounters = () => {
    const titleInput = $("#event-title");
    const descInput = $("#event-desc");
    const ubicacionInput = $("#event-ubicacion");

    titleInput.addEventListener("keyup", () => {
        $(".form-title .current-length").textContent = titleInput.value?.length || 0;
        if (titleInput.value?.length > maxTitle) {
            titleInput.classList.add("error");
        } else {
            titleInput.classList.remove("error");
        }
    });

    descInput.addEventListener("keyup", () => {
        $(".form-description .current-length").textContent = descInput.value?.length || 0;
        if (descInput.value?.length > maxDesc) {
            descInput.classList.add("error");
        } else {
            descInput.classList.remove("error");
        }
    });

    ubicacionInput.addEventListener("keyup", () => {
        $(".form-ubicacion .current-length").textContent = ubicacionInput.value?.length || 0;
        if (ubicacionInput.value?.length > maxUbicacion) {
            ubicacionInput.classList.add("error");
        } else {
            ubicacionInput.classList.remove("error");
        }
    });
};

const submitEvent = async (isEditing, id) => {
    const title = $("#event-title").value;
    const desc = $("#event-desc").value;
    const date = $("#event-date").value;
    const time = $("#event-time").value;
    const location = $("#event-ubicacion").value;
    const attending = $("#event-attend").checked;
    const image = $("#event-image-input")?.files[0];

    let check;

    check = formCheck;
    check = formCheck.checkTextInput(title, "Título", 0, maxTitle);
    if (!check) return;

    check = formCheck.checkTextInput(desc, "Descripción", 0, maxDesc, true);
    if (!check) return;

    check = formCheck.checkTextInput(location, "Ubicación", 0, maxUbicacion);
    if (!check) return;

    const finalDate = formCheck.checkDatetimeInput(date, time);
    if (!finalDate) return;

    let url;

    if (isEditing) {
        url = `/events/edit/${id}`;
    } else {
        url = "/events/create";
    }

    const token = JSON.parse(localStorage.getItem("jwt"));

    const formData = new FormData();
    formData.append("titulo", title);
    formData.append("descripcion", desc);
    formData.append("fecha", finalDate);
    formData.append("ubicacion", location);
    formData.append("attending", attending);
    formData.append("image", image);
    formData.append("removeImage", isImageRemoved);

    const options = {
        method: isEditing ? "PUT" : "POST",
        body: formData,
        headers: {
            Authorization: token
        }
    };

    const response = await makeRequest(url, options);
    if (response.success) {
        eventDetails(response.json._id);
        const color = "green";
        const message = `Evento ${isEditing ? "editado" : "creado"} con éxito.`;
        createMessage(color, message);
        closeModal();
    }
};

const fillEditEvent = (event) => {
    $("#event-title").value = event.titulo;
    $("#event-desc").textContent = event?.descripcion;
    $("#event-date").value = event.fecha.split("T")[0];
    $("#event-time").value = event.fecha.split("T")[1].split(".")[0];
    $("#event-ubicacion").value = event.ubicacion;

    const attending = event.asistentes.find((a) => a._id == event.creador._id);

    $("#event-attend").checked = attending ? true : false;

    if (event.imagen) {
        $("#event-image").src = event.imagen;
        $("#event-image").classList.remove("hidden");
        $(".remove-image").classList.remove("hidden");
    }
};

const showImage = (input) => {
    const image = input.files[0];
    const imgElement = $("#event-image");
    const imgName = $(".image-name");
    if (!image) {
        imgElement.classList.add("hidden");
        imgElement.src = "";
        input.value = "";
        imgName.textContent = "";
        return;
    }

    const split = image.name.split(".");
    const extension = split[split.length - 1];

    const supported = ["jpg", "png", "jpeg", "webp"];
    if (!supported.includes(extension)) {
        createMessage("red", "solo se admiten imágenes ('jpg', 'png', 'jpeg' o 'webp')");
        input.value = "";
        imgName.textContent = "";
        imgElement.src = "";
        return;
    }

    try {
        const reader = new FileReader();
        reader.onload = function (e) {
            imgElement.src = e.target.result;
        };

        reader.readAsDataURL(image);
    } catch (error) {
        createMessage("red", "Ha habido un error cargando la imagen.");
        input.value = "";
        imgName.textContent = "";
        imgElement.src = "";
        return;
    }

    imgElement.classList.remove("hidden");
    imgName.textContent = image.name;
    $(".remove-image").classList.remove("hidden");

    isImageRemoved = false;
};

const removeImage = () => {
    $("#event-image").src = "";
    $("#event-image").classList.add("hidden");
    $(".image-name").textContent = "";
    $(".remove-image").classList.add("hidden");

    isImageRemoved = true;
};

const eventForm = (event) => {
    const isEditing = event ? true : false;

    const div = document.createElement("div");
    div.id = "create-modal";
    div.innerHTML = template(isEditing);

    showModal(div);

    const submitEventButton = $("#submit-event");
    const cancelEventButton = $("#cancel-event");

    if (isEditing) fillEditEvent(event);

    submitEventButton.addEventListener("click", () => submitEvent(isEditing, event?._id));

    cancelEventButton.addEventListener("click", () => closeModal());

    const imageInput = $("#event-image-input");
    imageInput.addEventListener("change", () => showImage(imageInput));

    const removeImageInput = $(".remove-image");
    removeImageInput.addEventListener("click", () => removeImage());

    //Linea que formatea la fecha actual a yyyy-mm-dd y la usa como
    //"min" para que el usuario solo pueda crear eventos en futuras fechas
    $("#event-date").min = new Date().toLocaleDateString("fr-ca");
    inputCounters();
};

export default eventForm;
