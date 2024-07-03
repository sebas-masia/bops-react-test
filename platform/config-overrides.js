/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@Components': 'src/Components',
    '@Models': 'src/Models',
    '@Pages': 'src/Pages',
    '@Store': 'src/Store',
    '@Themes': 'src/Themes',
  })(config);

  return config;
};
