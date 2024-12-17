//Pages
import Events from "./pages/Events/Events.js";
import Access from "./pages/Access/Access.js";
import Profile from "./pages//Profile/Profile.js";

import changeTheme from "./components/theme/theme.js";
changeTheme();

const linkEvents = document.querySelector("#link_events");
const linkProfile = document.querySelector("#link_profile");
const linkAccess = document.querySelector("#link_access");

//Si hay usuario, cargo el botón de "Perfil", si no, cargo
//El botón de "Acceso".
const jwt = localStorage.getItem("jwt");
if (jwt) {
    linkProfile.classList.remove("hidden");
} else {
    linkAccess.classList.remove("hidden");
}

//Cuando haga clic en algún elemento del header,
//Realiza la acción y cambia estilos del header.
linkEvents.addEventListener("click", () => {
    Events();
    linkProfile.classList.remove("active");
    linkEvents.classList.add("active");
});

linkProfile.addEventListener("click", () => {
    Profile();
    linkProfile.classList.add("active");
    linkEvents.classList.remove("active");
});

linkAccess.addEventListener("click", () => {
    Access();
});

//Llamo directamente a Events() para que cargue como primera página.
Events();
