const { defineConfig } = require("@vue/cli-service");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const Components = require("unplugin-vue-components/webpack");
const AutoImport = require("unplugin-auto-import/webpack");
const { ArcoResolver } = require("unplugin-vue-components/resolvers");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      filename: "[name].[contenthash:8].js",
      chunkFilename: "chunk_[name]_[contenthash:8].js",
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          bytemd: {
            chunks: "all",
            name: "chunk-bytemd",
            priority: 22,
            test: /[\\/]node_modules[\\/]@bytemd[\\/]/,
            enforce: true,
            reuseExistingChunk: true,
          },
          "@bytemd": {
            chunks: "all",
            name: "chunk-@bytemd",
            priority: 21,
            test: /[\\/]node_modules[\\/]bytemd[\\/]/,
            enforce: true,
            reuseExistingChunk: true,
          },
          codemirror: {
            chunks: "all",
            name: "chunk-codemirror",
            priority: 20,
            test: /[\\/]node_modules[\\/]codemirror-ssr[\\/]/,
            enforce: true,
            reuseExistingChunk: true,
          },
          arcoDesignUI: {
            chunks: "all",
            name: "chunk-arco-design",
            priority: 19,
            test: /[\\/]node_modules[\\/]@arco-design[\\/]/,
            enforce: true,
            reuseExistingChunk: true,
          },
          dayjs: {
            chunks: "all",
            name: "chunk-dayjs",
            priority: 18,
            test: /[\\/]node_modules[\\/]dayjs[\\/]/,
            enforce: true,
            reuseExistingChunk: true,
          },
        },
      },
    },
    externals: {
      "highlight.js": "hljs",
    },
    plugins: [
      Components({
        resolvers: [
          ArcoResolver({
            resolveIcons: true,
            sideEffect: true,
          }),
        ],
      }),
      AutoImport({
        resolvers: [ArcoResolver()],
      }),
      // 生产环境移除 控制台输出
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  chainWebpack: (config) => {
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
