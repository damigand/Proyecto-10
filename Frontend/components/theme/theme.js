import './theme.css';
const $ = (el) => document.querySelector(el);

const changeTheme = () => {
	loadTheme();
	const theme = $('#theme');
	const i = $('.theme-icon');
	const text = $('.theme-text');

	theme.addEventListener('click', () => {
		i.classList.toggle('active');

		if (i.classList.contains('active')) {
			document.documentElement.style.colorScheme = 'dark';
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.style.colorScheme = 'light';
			localStorage.setItem('theme', 'light');
		}

		setTimeout(() => {
			i.classList.toggle('bxs-sun');
			i.classList.toggle('bxs-moon');
			text.textContent = i.classList.contains('active') ? 'Dark' : 'Light';
		}, 100);
	});
};

const loadTheme = () => {
	const theme = localStorage.getItem('theme');
	if (!theme) localStorage.setItem('theme', 'light');

	const i = $('.theme-icon');
	const text = $('.theme-text');

	document.documentElement.style.colorScheme = theme;
	if (theme == 'dark') {
		i.classList.remove('bxs-sun');
		i.classList.add('bxs-moon');
		i.classList.add('active');
		text.textContent = 'Dark';
	}
};

export default changeTheme;
