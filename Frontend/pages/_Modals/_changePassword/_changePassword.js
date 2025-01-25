import { showModal, closeModal } from "@m/_base";
import "./_changePassword.css";
import { checkPassInput } from "@c/formCheck/formCheck";
import makeRequest from "@c/makeRequest/makeRequest";
import createMessage from "@c/createMessage/createMessage";

const $ = (el) => document.querySelector(el);

const template = () => {
    return `
        <div id="change-password">
            <h1>Cambiar contraseña</h1>
            <form id="change-password-form">
                <div>
                    <label for="actual-pass">Contraseña actual</label>
                    <input type="password" id="actual-pass"/>
                </div>
                <div>
                    <label for="new-pass">Nueva contraseña</label>
                    <input type="password" id="new-pass"/>
                </div>
                <div>
                    <label for="repeat-new-pass">Repite la contraseña</label>
                    <input type="password" id="repeat-new-pass"/>
                </div>
            </form>
            <div class="change-password-actions">
                <button id="save-password">Cambiar contraseña</button>
                <button id="cancel-password">Cancelar</button>
            </div>
        </div>
    `;
};

const checkOldPassword = async (password) => {
    const username = JSON.parse(localStorage.getItem("user")).usuario;

    const body = {
        usuario: username,
        password: password,
    };

    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json",
        },
    };

    const url = "http://localhost:3000/api/users/login";

    const response = await makeRequest(url, options);
    return response.success;
};

const savePassword = async () => {
    const oldPassword = $("#actual-pass").value;
    const newPassword = $("#new-pass").value;
    const repeatNewPassword = $("#repeat-new-pass").value;

    //Comprobar con un login si la contraseña actual es correcta.
    let check = await checkOldPassword(oldPassword);
    if (!check) return;

    //Comprobar ambas contraseñas nuevas.
    check = checkPassInput(newPassword, repeatNewPassword, "Nueva contraseña", 8);

    if (!check) return;

    const url = "http://localhost:3000/api/users/password";
    const token = "Bearer " + JSON.parse(localStorage.getItem("jwt"));
    const body = {
        password: newPassword,
    };
    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json",
            Authorization: token,
        },
    };

    const response = await makeRequest(url, options);
    if (response.success) {
        const message = response.json;
        const color = "green";
        createMessage(color, message);
        closeModal();
    }
};

const changePassword = () => {
    const content = document.createElement("div");
    content.innerHTML = template();

    showModal(content);

    $("#change-password-form").addEventListener("submit", (event) => {
        event.preventDefault();
    });

    const savePasswordButton = $("#save-password");
    const cancelButton = $("#cancel-password");

    savePasswordButton.addEventListener("click", () => savePassword());
    cancelButton.addEventListener("click", () => closeModal());
};

export default changePassword;
