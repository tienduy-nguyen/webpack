# Setup Webpack with TypeScript

Serie Webpack zero from hero
We continue from the previous article [basic setup webpack](https://blog.adev42.com/basic-setup-webpack). In this article, we will discover how to setup a webpack project with TypeScript and using plugin in Webpack.


- [Setup Webpack with TypeScript](#setup-webpack-with-typescript)
  - [Install webpack and loader](#install-webpack-and-loader)
  - [Configuration](#configuration)

## Install webpack and loader

- Create new prject and install packages dependencies
  ```bash
  $ mkdir webpack-typescript
  $ cd webpack-typescript
  $ npm init -y
  $ yarn add webpack webpack-cli webpack-dev-server style-loader css-loader sass sass-loader file-loader -D
  ```

  To understand each dependencies means, checkout my previous article [basic setup webpack](https://blog.adev42.com/basic-setup-webpack)

- Install HTMLWebpackPlugin
  
  ```bash
  $ yarn add html-webpack-plugin -D
  ```

  Follow this article to understand why use this dev dependency.
- Install TypeScript
  [TypeScript](https://www.typescriptlang.org/) extends JavaScript by adding types. By understanding JavaScript, TypeScript saves you time catching errors, debug adn providing fixes before you run code. Any browser, any OS, anywhere JavaScript runs.

  We can use TypeScript to compile to the compatible JavaScript version, so we don't need use `babel` in this case.

  ```bash
  $ yarn add typescript ts-loader -D
  ```
  - **typescript**: install TypeScript language for your project. You can also install TypeScript on your machine as `Nodejs`, `Python` and the other programming languages with command: `yarn add global typescript`.
  - **ts-loader**: allow integrate TypeScript to webpack

## Configuration

We will create a simple project to understand each config for webpack project using TypeScript. This project will be the same the [previous project](https://github.com/tienduy-nguyen/webpack/tree/master/webpack-basic). But we will code in TypeScript.


- `public/index.html` file

  ```html
  <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Webpack</title>
    </head>

    <body>
      <div id="root">
        <h1>Webpack with TypeScript</h1>
      </div>

    </body>
  </html>
  ```
  Notice: you can see, we don't import any `js` file. The reason will be explained below.