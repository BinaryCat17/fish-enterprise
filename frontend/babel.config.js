module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
      'react-native-web',
      ["module-resolver", {
        "alias": {
          "^react-native$": "react-native-web"
        }
      }]
    ],
  };
};
