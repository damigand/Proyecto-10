import eventDetails from "@p/EventDetails/eventDetails";
import Events from "@p/Events/Events";
import Profile from "@p/Profile/Profile";

import "./backButton.css";

//Stack creado desde cero por damigand, si hay algo raro es porque
//Es mi primer stack de navegación en toda mi vida, pero lo he intentado.
let navStack = [];

const handleNavigation = (nav) => {
    const lastNav = navStack[navStack.length - 1];
    const nextNav = navStack[navStack.length - 2];
    switch (nav?.url) {
        case "Event":
            eventDetails(lastNav?.id, nextNav, true);
            navStack.pop();
            break;
        case "Profile":
            Profile(lastNav?.id, nextNav, true);
            navStack.pop();
            break;
        default:
            Events();
            break;
    }
};

export const emptyNavStack = () => {
    navStack = [];
};

export const backButton = (nav, unload) => {
    if (nav && !unload) navStack.push(nav);
    const div = document.createElement("div");
    div.id = "backButton";

    const i = document.createElement("i");
    i.classList.add("bx", "bx-arrow-back");

    const span = document.createElement("span");
    span.textContent = "Volver";

    div.appendChild(i);
    div.appendChild(span);

    div.addEventListener("click", () => handleNavigation(nav));

    return div;
};

export default { backButton, emptyNavStack };
