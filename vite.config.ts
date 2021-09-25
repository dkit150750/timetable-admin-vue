/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { VitePWA } from 'vite-plugin-pwa';
import Eslint from 'vite-plugin-eslint';
import Stylelint from '@amatlash/vite-plugin-stylelint';

export default defineConfig({
	resolve: {
		alias: [
			{
				find: '~/',
				replacement: `${path.resolve(__dirname, 'src')}/`,
			},
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src/assets/images'),
			},
		],
	},
	plugins: [
		Vue({
			include: [/\.vue$/, /\.md$/],
		}),

		// https://github.com/hannoeru/vite-plugin-pages
		Pages({
			extensions: ['vue', 'md'],
		}),

		// https://github.com/JohnCampionJr/vite-plugin-vue-layouts
		Layouts(),

		// https://github.com/antfu/unplugin-auto-import
		AutoImport({
			imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core'],
			dts: true,
		}),

		// https://github.com/antfu/unplugin-vue-components
		Components({
			// allow auto load markdown components under `./src/components/`
			extensions: ['vue'],

			dts: true,

			// allow auto import and register components used in markdown
			include: [/\.vue$/, /\.vue\?vue/],

			// custom resolvers
			resolvers: [
				// auto import icons
				// https://github.com/antfu/unplugin-icons
				IconsResolver({
					componentPrefix: '',
					// enabledCollections: ['carbon']
				}),
			],
		}),

		// https://github.com/antfu/unplugin-icons
		Icons(),

		// https://github.com/antfu/vite-plugin-pwa
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
			manifest: {
				name: 'Vitesse',
				short_name: 'Vitesse',
				theme_color: '#ffffff',
				icons: [
					{
						src: '/pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: '/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),

		// https://github.com/gxmari007/vite-plugin-eslint
		Eslint({
			fix: true,
		}),

		// https://github.com/AMatlash/vite-plugin-stylelint
		Stylelint({
			include: [path.resolve(__dirname, 'src/**')],
		}),
	],

	server: {
		fs: {
			strict: true,
		},
	},

	// https://github.com/antfu/vite-ssg
	ssgOptions: {
		script: 'async',
		formatting: 'minify',
	},

	optimizeDeps: {
		include: ['vue', 'vue-router', '@vueuse/core'],
		exclude: ['vue-demi'],
	},
});
