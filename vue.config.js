const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    let optimization = {
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          monacoEditor: {
            chunks: "all",
            name: "chunk-monaco-editor",
            priority: 22,
            test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
            enforce: true,
            reuseExistingChunk: true,
          },
          arcoDesignUI: {
            chunks: "all",
            name: "chunk-arco-design",
            priority: 21,
            test: /[\\/]node_modules[\\/]@arco-design[\\/]/,
            enforce: true,
            reuseExistingChunk: true,
          },
        },
      },
    };
    Object.assign(config, {
      optimization,
    });
  },
  chainWebpack: (config) => {
    config.plugin("monaco").use(
      new MonacoWebpackPlugin({
        languages: ["javascript", "css", "html", "json", "java"],
        features: ["coreCommands", "find"],
      })
    );
    config.plugin("compressionPlugin").use(
      new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /.js$|.html$|.css$|.jpg$|.jpeg$|.png$|.svg/, // 需要压缩的文件类型
        threshold: 10240, // 对超过10k的数据压缩
        minRatio: 0.8, // 压缩比0.8
      })
    );
    /* 添加分析工具*/
    if (process.env.NODE_ENV === "production") {
      if (process.env.npm_config_report) {
        config
          .plugin("webpack-bundle-analyzer")
          .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
          .end();
        config.plugins.delete("prefetch");
      }
    }
  },
});
