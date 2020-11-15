# webpack

Webpack fundamentals for fast learning and step by step to setup a project with webpack.

- [webpack](#webpack)
  - [Webpack basic](#webpack-basic)
    - [Setup a webpack project](#setup-a-webpack-project)
    - [Setup Babel](#setup-babel)


## Webpack basic

`Webpack` is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging ...

Understand more for webpack on [website official](https://webpack.js.org/)

### Setup a webpack project
- Create project and init `package.json` file
  ```bash
  $ mkdir webpack-basic
  $ cd webpack-basic
  $ npm init -y
  $ npm install webpack webpack-cli webpack-dev-server -D
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

For more detail of babel [babeljs.io](https://babeljs.io/)

- Installation
  ```bash
  $ yarn add @babel/core @babel/preset-env babel-loader
  # Or using npm
  $ npm i -D @babel/core @babel/preset-env babel-loader
  ```

  - `@babel/core`: Core of babel contains algorithms of its
  - @babel/preset-env: 