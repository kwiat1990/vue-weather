const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: isProduction ? "/vue-weather/" : ".",

  // Proxy requests from localhost to a HTTPS server
  devServer: { proxy: process.env.VUE_APP_API_URL },

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
