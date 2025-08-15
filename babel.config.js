// babel.config.js (raiz)
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // já inclui o preset do router no SDK 50
    plugins: [
      // Se quiser alias @/..., deixe este plugin. Se suspeitar dele, remova-o temporariamente.
      ['module-resolver', { root: ['./'], alias: { '@': './', '@src': './src' } }],
    ],
  };
};
