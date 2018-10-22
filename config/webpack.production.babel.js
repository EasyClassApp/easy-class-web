import merge from 'webpack-merge';
import commonConfig from './webpack.common.babel';
import * as parts from './webpack.parts.babel';

const productionConfig = merge([
  commonConfig,
  parts.imagesLoader({
    options: {
      limit: 8192,
      name: './assets/[name].[ext]',
    },
  }),
  parts.minificationPlugin(),
  parts.setFreeVariablePlugin('process.env.NODE_ENV', 'production'),
  parts.setFreeVariablePlugin('SERVER_URL', 'https://easy-class-api-production.herokuapp.com'),
]);

export default productionConfig;
