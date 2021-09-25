// eslint-disable-next-line import/no-extraneous-dependencies
import { ViteSSGContext } from 'vite-ssg';

export type UserModule = (context: ViteSSGContext) => void;
