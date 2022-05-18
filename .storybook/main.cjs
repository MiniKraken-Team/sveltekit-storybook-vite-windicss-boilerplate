const preprocess = require('svelte-preprocess')
const WindiCSS = require('vite-plugin-windicss').default

module.exports = {
  core: { builder: '@storybook/builder-vite' },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.svelte'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-svelte-csf'],
  framework: '@storybook/svelte',
  svelteOptions: {
    preprocess: preprocess()
  },
  async viteFinal(config) {
    config.plugins.push(WindiCSS())
    return config
  }
}
