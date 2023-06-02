const webpack=require('webpack');
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
      config.resolve.symlinks(true);
  },
  devServer: {
    open:true
  },
  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "windows.jQuery": "jquery"
        })
    ]
}
  // chainWebpack: config => {
  //   // 修复HMR
  //   config.resolve.symlinks(true);

  //  },

}

