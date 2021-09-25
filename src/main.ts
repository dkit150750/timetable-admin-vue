// register vue composition api globally
// eslint-disable-next-line import/no-extraneous-dependencies
import { ViteSSG } from 'vite-ssg';
import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';
import App from './App.vue';

import '~/assets/styles/main.css';
import '~/assets/styles/qui-main.css';

const routes = setupLayouts(generatedRoutes);

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, { routes }, (context) => {
	// install all modules under `modules/`
	Object.values(import.meta.globEager('./modules/*.ts')).map((index) => index.install?.(context));
});
