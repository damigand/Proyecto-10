//Pages
import Events from './pages/Events.js';
import Access from './pages/Access.js';
import Profile from './pages/Profile.js';

const linkEvents = document.querySelector('#link_events');
const linkProfile = document.querySelector('#link_profile');
const linkLogin = document.querySelector('#link_login');

linkEvents.addEventListener('click', () => {
	Events();
	linkProfile.classList.remove('active');
	linkEvents.classList.add('active');
});

linkProfile.addEventListener('click', () => {
	Profile();
	linkProfile.classList.add('active');
	linkEvents.classList.remove('active');
});

linkLogin.addEventListener('click', () => {
	Access();
	linkProfile.classList.remove('active');
	linkEvents.classList.remove('active');
});

linkLogin.click();
