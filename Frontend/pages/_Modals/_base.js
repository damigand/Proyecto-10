import "./_base.css";

const $ = (el) => document.querySelector(el);
let modal;

const template = () => {
    return `
        <div id="modal" class="hidden">
        </div>
    `;
};

export const showModal = (content) => {
    if (!modal) return;
    modal.classList.toggle("hidden");
    modal.appendChild(content);
};

export const closeModal = () => {
    if (!modal) return;
    modal.innerHTML = "";
    modal.classList.toggle("hidden");
};

export const baseModal = () => {
    $("body").insertAdjacentHTML("afterbegin", template());
    modal = $("#modal");
};
