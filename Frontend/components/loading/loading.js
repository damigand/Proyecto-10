import './loading.css';

const loading = (isLoading) => {
	if (isLoading) {
		document.querySelector('body').classList.add('loading');
	} else {
		setTimeout(() => {
			document.querySelector('body').classList.remove('loading');
		}, 100);
	}
};

export default loading;
