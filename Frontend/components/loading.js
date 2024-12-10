const loading = (isLoading) => {
	if (isLoading) {
		document.querySelector('body').classList.add('loading');
	} else {
		document.querySelector('body').classList.remove('loading');
	}
};

export default loading;
