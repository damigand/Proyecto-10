const removeTimer = (element) => {
	setTimeout(function () {
		element.classList.add('hiding');
	}, 2000);

	setTimeout(function () {
		element.parentElement?.removeChild(element);
	}, 4000);
};

export default removeTimer;
