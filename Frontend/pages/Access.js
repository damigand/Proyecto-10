import './Access.css';
const $ = (el) => document.querySelector(el);
const $$ = (els) => document.querySelectorAll(els);

const template = () => {
	return `
        <div id="messages"></div>
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
                        <label for="register-email">Correo electrónico (opcional)</label>
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
            <div id="login">
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

const reqRegister = () => {
	const messageDiv = $('#messages');
	const usuario = $('#register-usuario').value;
	const password = $('#register-password').value;
	const repeatPassword = $('#verify-password').value;
	const email = $('#register-email').value;

	if (!usuario) {
		const color = 'red';
		const text = 'Necesitas un nombre de usuario.';
		const message = createMessage(color, text);

		messageDiv.insertBefore(message, messageDiv.firstChild);
		return;
	}

	if (!password) {
		const color = 'red';
		const text = 'Introduce una contraseña.';
		const message = createMessage(color, text);

		messageDiv.insertBefore(message, messageDiv.firstChild);
		return;
	}

	if (!repeatPassword) {
		const color = 'red';
		const text = 'Repite la contraseña.';
		const message = createMessage(color, text);

		messageDiv.insertBefore(message, messageDiv.firstChild);
		return;
	}

	if (password !== repeatPassword) {
		const color = 'red';
		const text = 'Las contraseñas no coinciden.';
		const message = createMessage(color, text);

		messageDiv.insertBefore(message, messageDiv.firstChild);
		return;
	}

	const body = {
		usuario: usuario,
		password: password,
		email: email,
	};
};

const reqLogin = () => {};

const createMessage = (color, text) => {
	const div = document.createElement('div');
	div.classList.add('message');
	div.classList.add(color);

	const i = document.createElement('i');
	i.classList.add('bx');
	i.classList.add('bx-x');

	const span = document.createElement('span');
	span.innerText = text;

	div.appendChild(span);
	div.appendChild(i);

	i.addEventListener('click', () => div.parentElement.removeChild(div));

	removeTimer(div);
	return div;
};

const removeTimer = (element) => {
	setTimeout(function () {
		element.classList.add('hiding');
	}, 2000);

	setTimeout(function () {
		element.parentElement.removeChild(element);
	}, 4000);
};

export default Access;
