import './Access.css';
const $ = (el) => document.querySelector(el);

import Events from '../Events/Events.js';
import makeRequest from '../../components/makeRequest.js';
import * as formCheck from '../../components/formCheck';

const template = () => {
	$('#link_events').classList.remove('active');
	return `
        <section id="access">
            <div id="register">
                <h1>REGISTRO</h1>
                <form id="register-form" novalidate>
                    <input type="reset" value="Borrar"/>
                    <div class="input-usuario">
                        <label for="register-usuario">Usuario</label>
                        <input type="text" id="register-usuario" />
                    </div>
                    <div class="input-email">
                        <label for="register-email">Correo electrónico <span class="optional">(opcional)</span></label>
                        <input type="email" id="register-email" />
                    </div>
                    <div class="input-password">
                        <label for="register-password">Contraseña</label>
                        <input type="password" id="register-password" />
                        <label for="verify-password">Repite la contraseña</label>
                        <input type="password" id="verify-password" />
                    </div>
                    <button type="submit" id="register-submit">Registrarse</button>
                </form>
            </div>
            <div id="login" class="active">
                <h1>ENTRAR</h1>
                <form id="login-form" novalidate>
                    <div class="input-usuario">
                        <label for="usuario">Usuario</label>
                        <input type="text" id="usuario" />
                    </div>
                    <div class="input-password">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" />
                    </div>
                    <button type="submit" id="login-submit">Entrar</button>
                </form>
            </div>
        </section>
    `;
};

const Access = () => {
	document.querySelector('main').innerHTML = template();
	const loginTitle = $('#login h1');
	const registerTitle = $('#register h1');

	loginTitle.addEventListener('click', () => {
		$('#login').classList.toggle('active');
	});

	registerTitle.addEventListener('click', () => {
		$('#login').classList.toggle('active');
	});

	const registerButton = $('#register-submit');
	const loginButton = $('#login-submit');

	registerButton.addEventListener('click', async () => reqRegister());
	loginButton.addEventListener('click', async () => reqLogin());

	//No recargar la página al entrar o registrarse para manejar
	//la navegación manualmente a mi conveniencia.
	$('#register-form').addEventListener('submit', (event) => {
		event.preventDefault();
	});
	$('#login-form').addEventListener('submit', (event) => {
		event.preventDefault();
	});
};

const reqRegister = async () => {
	let check;
	const usuario = $('#register-usuario').value;
	const password = $('#register-password').value;
	const repeatPassword = $('#verify-password').value;
	const email = $('#register-email').value;

	check = formCheck.checkTextInput(usuario, 'Usuario', 6);
	if (!check) return;

	check = formCheck.checkPassInput(password, repeatPassword, 'Contraseña', 8);
	if (!check) return;

	const reqBody = {
		usuario: usuario,
		password: password,
		email: email,
	};

	const url = 'http://localhost:3000/api/users/register';

	const options = {
		method: 'POST',
		body: JSON.stringify(reqBody),
		headers: {
			'Content-type': 'application/json',
		},
	};

	const response = await makeRequest(url, options);

	if (response.success) {
		await reqLogin(usuario, password);
	}
};

//Parámetros opcionales que vienen cuando se registra un usuario para un log-in automático.
const reqLogin = async (regUsuario, regPassword) => {
	const usuario = regUsuario || $('#usuario').value;
	const password = regPassword || $('#password').value;
	let check;

	check = formCheck.checkTextInput(usuario, 'Usuario');
	if (!check) return;

	check = formCheck.checkPassInput(password, password, 'Contraseña');
	if (!check) return;

	const reqBody = {
		usuario: usuario,
		password: password,
	};

	const url = 'http://localhost:3000/api/users/login';

	const options = {
		method: 'POST',
		body: JSON.stringify(reqBody),
		headers: {
			'Content-type': 'application/json',
		},
	};

	const response = await makeRequest(url, options);

	if (response.success) {
		//Usaría cookies para guardar esta info pero no tengo ni idea de cómo usarlas
		localStorage.setItem('user', JSON.stringify(response.json.user));
		localStorage.setItem('jwt', JSON.stringify(response.json.token));
		Events();
		$('#link_access').classList.add('hidden');
		$('#link_profile').classList.remove('hidden');
	}
};

export default Access;
