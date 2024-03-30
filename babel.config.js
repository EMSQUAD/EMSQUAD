module.exports = function(api) {
  api.cache(true);

  const presets = [
    'babel-preset-expo'
  ];

  const plugins = [
    // Explicitly set the "loose" option for these plugins to silence the warning
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ];

  return {
    presets,
    plugins
  };
};
