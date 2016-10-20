module.exports = {
  entry: './app/melodyscript.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.node$/,
        loader: 'node-loader'
      },
      {
        test: /.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: { presets: ['es2015'] }
      }
    ]
  },
  devtool: 'source-maps'
};
