//Pages
import Events from './pages/Events/Events.js';

import changeTheme from './components/theme/theme.js';
import header from './components/header/header.js';
import { baseModal } from './pages/_Modals/_base.js';

header();
changeTheme();
baseModal();

//Ya que la navegaciñon es simulada, desactivo
//la posibilidad de que el usuario pueda ir hacia atrás mediante el navegador ya que
//saldría de la página directamente, teniendo que usar la navegación que he creado yo.
window.addEventListener('popstate', function () {
	history.pushState(null, null, document.URL);
});

//Llamo directamente a Events() para que cargue como primera página.
Events();
