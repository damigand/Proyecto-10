const removeTimer = (element) => {
	setTimeout(function () {
		element.classList.add('hiding');
	}, 2500);

	setTimeout(function () {
		element.parentElement?.removeChild(element);
	}, 4500);
};

export default removeTimer;
