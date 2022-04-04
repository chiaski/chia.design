const path = require('path');
var webpack = require('webpack');
var ImageminPlugin = require('imagemin-webpack-plugin').default

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


//const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
  // Tells Webpack which built-in optimizations to use
  // In 'production' mode, Webpack will minify and uglify our JS code
  // If you leave this out, Webpack will default to 'production'
  mode: 'development',
  // Webpack needs to know where to start the bundling process,
  // so we define the main JS and Sass files, both under
  // the './src' directory
  entry: {
    'main': './src/styles/main.scss',
    'default': './src/styles/default.scss'
  },

  // ['./src/scripts/main.js', './src/styles/main.scss', './src/styles/portfolio.scss'],
  // This is where we define the path where Webpack will place
  // the bundled JS file
  output: {
    path: path.resolve(__dirname, 'public'),
    // Specify the base path for all the assets within your
    // application. This is relative to the output path, so in
    // our case it will be ./public/assets
    publicPath: '/assets',
    // The name of the output bundle. Path is also relative
    // to the output path
    filename: 'assets/scripts/[name].js'
  },
  module: {
    // Array of rules that tells Webpack how the modules (output)
    // will be created
    rules: [
      {
        // Look for JavaScript files and apply the babel-loader
        // excluding the './node_modules' directory. It uses the
        // configuration in `.babelrc`
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        // Look for Sass files and process them according to the
        // rules specified in the different loaders
        test: /\.(sa|sc)ss$/,
        // Use the following loaders from right-to-left, so it will
        // use sass-loader first and ending with MiniCssExtractPlugin
        use: [
          {
            // Extracts the CSS into a separate file and uses the
            // defined configurations in the 'plugins' section
            loader: MiniCssExtractPlugin.loader
          },
          {
            // Interprets CSS
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            // Use PostCSS to minify and autoprefix. This loader
            // uses the configuration in `postcss.config.js`
            loader: 'postcss-loader'
          },
          {
            // Adds support for Sass files, if using Less, then
            // use the less-loader
            loader: 'sass-loader'
          }
        ]
      },
      {
        // Adds support to load images in your CSS rules. It looks
        // for .png, .jpg, .jpeg and .gif
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
              //              publicPath: '../images',
              //              emitFile: true
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '../fonts',
              outputPath: '../fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [

        new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].css',
      chunkFilename: "[name].css"
    }),
    new ImageminPlugin({
      test: '**'
    }),
    new ImageminPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', {
            interlaced: true
          }],
          ['jpegtran', {
            progressive: true
          }],
          ['optipng', {
            optimizationLevel: 5
          }],
          [
            'svgo',
            {
              plugins: [
              ],
            },
          ],
        ],
      },
    }),
  ]
};
