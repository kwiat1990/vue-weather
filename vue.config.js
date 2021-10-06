module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-weather/" : ".",

  chainWebpack: (config) => {
    // Ionic icons
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compilerOptions = {
          ...options.compilerOptions,
          isCustomElement: (tag) => tag.startsWith("ion-"),
        };
        return options;
      });
  },
};
