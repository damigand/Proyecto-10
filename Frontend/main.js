//Pages
import Events from './pages/Events/Events.js';
import Access from './pages/Access/Access.js';
import Profile from './pages//Profile/Profile.js';

const linkEvents = document.querySelector('#link_events');
const linkProfile = document.querySelector('#link_profile');
const linkAccess = document.querySelector('#link_access');

const jwt = localStorage.getItem('jwt');
if (jwt) {
	linkProfile.classList.remove('hidden');
} else {
	linkAccess.classList.remove('hidden');
}

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

linkAccess.addEventListener('click', () => {
	Access();
});

Events();
