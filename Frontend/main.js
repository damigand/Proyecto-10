//Pages
import Events from "@p/Events/Events.js";

import changeTheme from "@c/theme/theme.js";
import header from "@c/header/header.js";
import { baseModal } from "@m/_base.js";

header();
changeTheme();
baseModal();

//Ya que la navegaciñon es simulada, desactivo
//la posibilidad de que el usuario pueda ir hacia atrás mediante el navegador ya que
//saldría de la página directamente, teniendo que usar la navegación que he creado yo.
window.addEventListener("popstate", function () {
    history.pushState(null, null, document.URL);
});

//Llamo directamente a Events() para que cargue como primera página.
Events();
