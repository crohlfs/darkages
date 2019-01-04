module.exports = function(api) {
  api.cache(true);

  const config = {
    presets: ["@babel/preset-typescript"],
    plugins: ["@babel/plugin-proposal-class-properties"]
  };

  if (process.env.NODE_ENV === "test") {
    config.plugins.push("@babel/plugin-transform-modules-commonjs");
  }

  return config;
};
