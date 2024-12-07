const template = () => {
	const user = localStorage.getItem('user');
	return `
        <section id="events">
            <div id="event-container">  
                EVENTS
            </div>
        </section>
    `;
};

const getEvents = async () => {};

const Events = () => {
	console.log('Eventos');
	document.querySelector('main').innerHTML = template();

	getEvents();
};

export default Events;
