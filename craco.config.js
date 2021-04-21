/* craco.config.js */
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#aba180' },
            // modifyVars: { '@primary-color': '#d4b106' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};  