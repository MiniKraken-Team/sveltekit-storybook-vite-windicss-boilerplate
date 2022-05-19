const preprocess = require('svelte-preprocess');
const WindiCSS = require('vite-plugin-windicss').default;

module.exports = {
	core: { builder: '@storybook/builder-vite' },
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.svelte'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-svelte-csf', '@storybook/addon-interactions'],
	framework: '@storybook/svelte',
	features: {
		// Optional, for fastest build
		storyStoreV7: false,
	},
	svelteOptions: {
		preprocess: preprocess(),
		configFile: ''
	},
	async viteFinal(config, {configType}) {
		config.plugins.push(WindiCSS());
		config.optimizeDeps = configType === 'PRODUCTION' ? config.optimizeDeps : {
			...(config.optimizeDeps || {}),
			include: [
				...(config?.optimizeDeps?.include || []),
				// Fix: `@storybook/addon-interactions` exports is not defined or `jest-mock` does not provide an export named 'fn'
				'jest-mock',
				// Optional, but prevents error flashing in the Storybook component preview iframe:
				// Fix: failed to fetch dynamically import module, avoid cache miss for dependencies on the first load
				'@storybook/components',
				'@storybook/store',
				// Add all addons that imported in the `preview.js` or `preview.ts` file and used in exported constants
				'@storybook/addon-links',
				'@storybook/theming',
			],
		}
		return config;
	}
};
