import Qui from '@qvant/qui-max';
import { UserModule } from '~/types';

// Setup Qui
// https://qvant-lab.github.io/qui-max/?path=/story/intro--page
export const install: UserModule = ({ app }) => {
	app.use(Qui);
};
