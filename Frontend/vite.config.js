import { defineConfig } from 'vite';

export default defineConfig({
	resolve: {
		alias: {
			'@c': '/components/',
			'@m': '/pages/_Modals/',
			'@p': '/pages/',
		},
	},
});
