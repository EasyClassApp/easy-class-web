import merge from 'webpack-merge';
import commonConfig from './webpack.common.babel';
import * as parts from './webpack.parts.babel';

export default (env) => {
  const SERVER_URL = env.NODE_ENV === 'production' ? 'https://easy-class-api.herokuapp.com' : 'https://easy-class-api-staging.herokuapp.com';

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
    parts.setFreeVariablePlugin('SERVER_URL', SERVER_URL),
  ]);

  console.log('THIS APP WILL CONSUME THE API AT', SERVER_URL);
  return productionConfig;
};
