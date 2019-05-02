module.exports = function(api) {
  const config = {
    presets: ["@babel/preset-typescript"],
    plugins: ["@babel/plugin-proposal-class-properties"]
  };

  if (api.env("test")) {
    config.plugins.push("@babel/plugin-transform-modules-commonjs");
  }

  return config;
};
