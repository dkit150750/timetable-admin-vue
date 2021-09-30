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
import Markdown from 'vite-plugin-md';
import Prism from 'markdown-it-prism';
import LinkAttributes from 'markdown-it-link-attributes';

const markdownWrapperClasses = 'prose prose-sm m-auto text-left';

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
			extensions: ['vue', 'md'],

			dts: true,

			// allow auto import and register components used in markdown
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

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
				name: 'Admin Panel',
				short_name: 'Admin Panel',
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

		// https://github.com/antfu/vite-plugin-md
		Markdown({
			wrapperClasses: markdownWrapperClasses,
			headEnabled: true,
			markdownItSetup(md) {
				// https://prismjs.com/
				md.use(Prism);
				md.use(LinkAttributes, {
					pattern: /^https?:\/\//,
					attrs: {
						target: '_blank',
						rel: 'noopener',
					},
				});
			},
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
