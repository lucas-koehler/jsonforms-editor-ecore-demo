var webpack = require('webpack');
var path = require("path");
var copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/index.ts'
  ],
  output: {
    path: path.resolve("./", "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {
    contentBase: ['./src','./icons'],
    port: 8080
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new copyWebpackPlugin([
      {from: './lib/native-shim.js', to: 'assets/native-shim.js' },
      // {from: '../examples/example.css', to: 'assets/jsonforms-example.css'},
      // {from: './jsoneditor.css', to: 'assets/jsoneditor.css' },
      {from: './jsoneditor.materialize.css', to: 'assets/jsoneditor.materialize.css' }
    ])
  ],
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'source-map-loader' },
      { test: /\.tsx?$/, exclude: /node_modules/, loader: 'awesome-typescript-loader' }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
  },
  node: {
    fs: 'empty'
  }
};
