// config-overrides.js

module.exports = function override(config, env) {
  // Here you can add your customizations. For example, adding path polyfill:
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: require.resolve('path-browserify'),
  };
  return config;
};
