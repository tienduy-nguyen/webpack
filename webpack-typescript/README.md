# Setup Webpack with TypeScript

Serie Webpack zero from hero
We continue from the previous article [basic setup webpack](https://blog.adev42.com/basic-setup-webpack). In this article, we will discover how to setup a webpack project with TypeScript and using plugin in Webpack.


- [Setup Webpack with TypeScript](#setup-webpack-with-typescript)
  - [Install webpack and loader](#install-webpack-and-loader)
  - [Configuration](#configuration)
  - [Explanation](#explanation)

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

- `src/add.ts`
  ```ts
  export const add = (a = 1, b = 2): number => a + b;
  export const treeShaking = (): void => {
    console.log('This phrase will not appear on build file');
  };

  ```

- `src/app.d.ts`

Why this file? TypeScript is a strong type, it will not consider files as images, videos as modules, and we can't import them. So we need declare the type for each file type.

  ```ts
  declare module  '*.png'{
    const src: string;
    export default src
  }
  declare module  '*.jpg'{
    const src: string;
    export default src
  }
  declare module  '*.jpeg'{
    const src: string;
    export default src
  }
  ```
- `src/index.scss`
  ```scss
  $color: #ddd;
  #root {
    text-align: center;
    background-color: $color;
    padding: 100px;
  }
  ```
- `src/loadImage.ts`
  ```ts
  import logo from './logo.png';
  const component = (): HTMLElement => {
    const element: HTMLDivElement = document.createElement('div');
    const webpackLogo: HTMLImageElement = new Image();
    webpackLogo.src = logo;
    webpackLogo.width = 200;
    element.appendChild(webpackLogo);
    return element;
  };
  document.getElementById('root')?.appendChild(component());
  ```
- `src/subtract.ts`
  ```ts
  export const subtract = (a: number, b: number): number => a - b;
  ```
- `src/index.ts`
   ```ts
  import { subtract } from './subtract';
  import { add } from './add';
  import './loadImage';
  import './index.scss';
  console.log(`1 + 2 = ${add(1, 2)}`);
  console.log(`8 - 2 = ${subtract(8, 2)}`);

   ```
- Create compileOption for TypeScript: `tsc --init` or create directly `tsconfig.json` in the root folder and paste the following code. This file contains de configuration to compile the TypeScript code to Js code.
  
  ```json
  {
    "compilerOptions": {
      "target": "ES6",
      "allowJs": true,
      "strict": true,
      "module": "ESNext",
      "moduleResolution": "node",
      "noImplicitAny": false,
      "sourceMap": true,
      "outDir": "./dist/",
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"],
        "@@/*": ["./*"]
      },
      "allowSyntheticDefaultImports": true,
      "esModuleInterop": true
    },
    "include": ["src/**/*"]
  }
  ```

  For more information about [tsconfig](https://www.typescriptlang.org/tsconfig)

## Explanation
- `tsconfig.json`

  First of all, we will understand how `tsconfig.json` file works?

  - **target**: Version javascript that we want to build from TypeScript. Here is `ES6`
  - **allowJs**: Allow use using `js` file in TypeScript project
  - **strict**: `Strict mode` for Typescript
  - **module**: After compiling the js, the codes will be written as ESNext module. There are many option here, but we do not recommend use the option `commonJS` because il will lose the [Tree-shaking](https://webpack.js.org/guides/tree-shaking/) feature of webpack. See this feature in [my previous post](https://blog.adev42.com/basic-setup-webpack#tree-shaking-in-webpack)
  - **noImplicitAny**: Do not allow any implicit understanding
  - **sourceMap**: easier to debug in dev enviroment. We need use it in both `tsconfig` and `webpack.config`
  - **baseUrl**: The base path, usually "./". If you use the `path` option below, you must specify baseUrl
  - **paths**: Create alias to facilitate import. For example, instead of using `../../../` now you can shorten it to `@/`. Configuring the alias in `tsconfig.json` just helps the editor to understand it, it doesn't work with webpack. So you have to configure with alias with the webpack below as well.
  - **include**: Specifies the files to be used in the project.

- `webpack.config.js`