# Webpack

A setup of project webpack very basics.

## Installation Webpack
- Init project with `npm`
  ```bash
  $ npm init 
  # or
  $ npm init -y #auto default
  ```
- Install webpack
  ```bash
  $ npm i webpack webpack-cli
  ```
- `webpack.config.js`
  ```js
  // Webpack utilise ce module pour travailler avec les dossiers.
  const path = require("path");

  // Ceci est la configuration principale de ton projet
  // Ici, tu peux écrire les différentes options que tu souhaites et dire à Webpack que faire.
  module.exports = {
    // Ceci est le chemin de ton point d'entrée. C'est depuis ce fichier que Webpack commencera à travailler.
    entry: "./src/js/index.js",

    // Ceci sera le chemin et le nom du fichier qui résultera de ton bundle
    // Webpack va compresser tout ton Javascript dans un seul fichier
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },

    // Par défaut, le mode de Webpack est "production". En fonction de ce qui est écrit ici, tu pourras appliquer différentes méthodes dans ton bundle final.
    // Pour le moment, nous avons besoin de paramètres de développement. Nous n'avons, par exemple, pas besoin de minifier notre code, nous allons donc le mettre en "développement"
    mode: "development",
  };
  ```
- Execute webpack
  ```bash
  $ npm run build
  #or
  $ yarn run build
  ```
## Babel loaders
- Install babel
  ```bash
  $ npm i -D babel-loader @babel/core @babel/preset-env
  $ yarn add babel-loader @babel/core @babel/preset-env --dev
  ```
- Add `babel-loader` to `webpack.config.js`
  ```js
  const path = require('path');

  module.exports = {
    entry: './src/js/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };

  ```
- SASS
  - Create `src/sass/styles.scss`
  - Import `.scss` file to `js/index.js`
    ```js
    import ('../sass/styles.scss')
    ```
  - Install scss dependencies
    ```bash
    $ npm i --save-dev sass sass-loader postcss-loader css-loader
    # or
    $ yarn add sass sass-loader postcss-loader css-loader --dev
    ```
  - Add rules for `sass` in `webpack.config.js`
    ```js
    const path = require('path');

    module.exports = {
      entry: './src/js/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
      },
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              {
                loader: 'css-loader',
              },
              { loader: 'postcss-loader' },
              {
                loader: 'sass-loader',
                options: {
                  implementation: require('sass'),
                },
              },
            ],
          },
        ],
      },
    };
    ```
  - Create `postcss.config.js`
    ```js
    if (process.env.NODE_ENV === 'production') {
      module.exports = {
        plugins: [require('autoprefixer'), require('cssnano')],
      };
    }

    ```
## Plugins
- MiniCSSExtra
  ```bash
  $ npm i --save-dev mini-css-extract-plugin
  # or
  $ yarn add mini-css-extract-plugin --dev
  ```

  `web.config.js` file
  ```bash
  module: {
  rules: [
    /* ... */
  ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    })
  ]
  ```
## Loaders
- file-loader
  - Installation
    ```bash
    $ npm i --save-dev file-loader
    # or
    $ yarn add file-loader --dev
    ```
  - Rules for webpack.config.js
    ```js
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            outputPath: 'images'
          }
        }
      ]
    }
    ```
- url-loader

## Final config for webpack


```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const ASSET_PATH = process.env.ASSET_PATH || '';
const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ASSET_PATH,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        exclude: /images/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    new HtmlWebPackPlugin(),
  ],
};

``