# webpack

Webpack fundamentals for fast learning and step by step to setup a project with webpack.

- [webpack](#webpack)
  - [Webpack basic](#webpack-basic)
    - [Setup a webpack project](#setup-a-webpack-project)
    - [Setup Babel](#setup-babel)
    - [Install Style-loader & File loader](#install-style-loader--file-loader)
  - [Setup Webpack](#setup-webpack)
    - [Demo code](#demo-code)
    - [Explanation](#explanation)


## Webpack basic

`Webpack` is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging ...

Understand more for webpack on [Webpack website](https://webpack.js.org/)

### Setup a webpack project
- Create project and init `package.json` file
  ```bash
  $ mkdir webpack-basic
  $ cd webpack-basic
  $ npm init -y
  ```
- In the root project create `public` folder and `index.html file`
  ```html
  <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>

    <body>
      <div id="root">
        <h1>Webpack basic</h1>
      </div>
      <script src="../dist/bundle.js"></script>
    </body>

  </html>
  ```
### Setup Babel

Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

See the website [babeljs.io](https://babeljs.io/) for more information.

- Installation
  ```bash
  $ yarn add @babel/core @babel/preset-env babel-loader
  # Or using npm
  $ npm i -D @babel/core @babel/preset-env babel-loader
  ```

  - `@babel/core`: Core of babel contains algorithms of its
  - `@babel/preset-env`: is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!. Check official website of [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env#:~:text=%40babel%2Fpreset%2Denv%20is,Install) for more details.
  - `babel-loader`: This package allows transpiling JavaScript files using Babel and webpack. Check [babel-loader github](https://github.com/babel/babel-loader).

### Install Style-loader & File loader
```bash
$ yarn add css-loader file-loader sass sass-loader style-loader -D
```
- `style-loader`, `css-loader`: help you to import `css` into `js` file
- `sass`, `sass-loader` help you compile `scss` to `css`
- `file-loader`: help you import file as `image`, `video` to `js` file
  
## Setup Webpack
- Installation
  ```bash
  $ npm install webpack webpack-cli webpack-dev-server -D
  ```
  - `webpack`: core of webpack
  - `webpack-cli`: allow us to use command of webpack on the terminal
  - `webpack-dev-server`: can be use to create a `local server` for dev environment

- Configuration
  
  Create `webpack.config.js` file in the root project and paste the following code.

  [See explanation in the last of article]

  ```js
  const path = require('path')
  module.exports = (env, agrv) => {
    const isDev = agrv.mode === 'development'
    return {
      entry: './src/index.js',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.(s[ac]ss|css)$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { sourceMap: isDev ? true : false }
              },
              {
                loader: 'sass-loader',
                options: { sourceMap: isDev ? true : false }
              }
            ]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]'
                }
              }
            ]
          }
        ]
      },
      resolve: { extensions: ['.js', '.jsx'] },
      output: {
        path: path.resolve('dist'),
        publicPath: '../dist/',
        filename: 'bundle.js',
        environment: {
          arrowFunction: false,
          bigIntLiteral: false,
          const: false,
          destructuring: false,
          dynamicImport: false,
          forOf: false,
          module: false
        }
      },
      devtool: isDev ? 'source-map' : false,
      devServer: {
        contentBase: 'public',
        port: 3000,
        hot: true,
        publicPath: '/dist/',
        watchContentBase: true
      }
    }
  }
  ```
- Script to run server
  Edit script in `package.json` file to run and build server.

  ```json
  "scripts": {
      "start": "webpack serve --mode development",
      "build": "webpack --mode production"
    },
  ```
### Demo code
To understand better how webpack works, we will create some simple demo code

- Create `src` folder in the root of project and a `src/add.js` file
  ```js
  //src/add.js
  export const add = (a = 1, b=2) => a+ b;
  export const treeShaking = () =>{
    console.log('This phrase will be not in the build file')
  }
  ```
- Create more filter helper
  ```js
  // src/substract.js
  export const substract = (a, b)=> a-b;

  ```

  ```js
  // src/loadImage.js
  import logo from './logo.png'

  const component = () =>{
    const element = document.createElement('div');
    const webpackLogo  = new Image();
    webpackLogo.src = logo;
    webpackLogo.width = 200;
    element.appendChild(webpackLogo);
    return element;
  }

  document.getElementById('root').appendChild(component())
  ```

  ```js
  // src/index.js
  import {substract} from './substract';
  import {add} from './add';
  import './loadImage';
  import '.index.scss';

  console.log(`1 + 2 = ${add(1,2}`)
  console.log(`8 - 2 = ${substract(8,2)`)
  ```
  And we have a tree folder: 
  
  ```tree
  # webpack-basic project
  .
  ├── node_modules
  ├── package.json
  ├── package-lock.json
  ├── public
  │   └── index.html
  ├── src
  │   ├── add.js
  │   ├── index.js
  │   ├── index.scss
  │   ├── loadImage.js
  │   ├── logo.png
  │   └── substract.js
  ├── webpack.config.js
  └── yarn.lock
  ```
- Run server to see the result
  ```bash
  $ npm run start
  # or
  $ yarn start
  ```
### Explanation
- `webpack.config.js`
  - This is the main configuration webpack file. Webpack configs allow you to configure and extend Webpack's basic functionality. A Webpack config is a JavaScript object that configures one of Webpack's options. 

  - When we run `webpack` command in the `package.json` file, webpack will be take automatically the configuration in this file.

  For more information of configuration of webpack [webpack configuration](https://webpack.js.org/configuration/)

  - In the `config` file, we can export an **object**, a **function**, an **array** or a **promise**. In this article, we will see how to export a function, because it allows us to use the arguments passed from outside. Check [Webpack configuration type](https://webpack.js.org/configuration/configuration-types/).