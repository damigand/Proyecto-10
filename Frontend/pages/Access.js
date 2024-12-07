import './Access.css';
const $ = (el) => document.querySelector(el);
const $$ = (els) => document.querySelectorAll(els);

const template = () => {
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
                        <label for="email">Correo electrónico</label>
                        <input type="email" id="email" />
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
};

export default Access;
