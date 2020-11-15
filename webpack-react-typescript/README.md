# Webpack React Typescript

Setup webpack with React.

With [create-react-app](https://github.com/facebook/create-react-app), it only takes a fex clicks to create a complete React project, requires not in-depth knowledge of webpack or babel. But if you are still not satisfied with the features that `create-react-app` brings. For example, CSS does not show source-map when dev, or may be you simply configure more deeply. If in this case, It's the time to configure manually `webpack`.


If you do not have any knowledge about webpack, you can refer my two previous articles:
- [Setup basic webpack](https://blog.adev42.com/basic-setup-webpack)
- [Webpack & TypeScript](https://blog.adev42.com/setup-webpack-with-typescript)


- [Webpack React Typescript](#webpack-react-typescript)
  - [Init project](#init-project)


## Init project
- Install dependencies packages
  ```bash
  $ yarn init -y
  $ yarn add -D react react-dom redux react-redux react-router-dom typescript
  $ yarn add -D webpack webpack-cli webpack-dev-server style-loader css-loader sass sass-loader typescript ts-loader
  ```
- Install plugin for webpack
  ```bash
  $ yarn add -D clean-webpack-plugin compression-webpack-plugin copy-webpack-plugin dotenv-webpack html-webpack-plugin mini-css-extract-plugin webpack-bundle-analyzer
  ```

  - **clean-webpack-plugin**: A webpack plugin to remove/clean your build folder(s). Check [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)
  - **compression-webpack-plugin**: Compress asset file (css, js, html ...) to **gzip** Check more [compression-webpack-plugin](https://webpack.js.org/plugins/compression-webpack-plugin/)
  - **copy-webpack-plugin**: Copies individual files or entire directories, which already exist, to the build directory. For example: you have files such as favicon.ico, robots.txt at the same level as index.html, when the build is complete, these files will also be present in the build. If you do not have this plugin, you have to copy them manually. Check [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/).
  - **dotenv-webpack**: Using `.env` file in your app. Check [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack)
  - **html-webpack-plugin**: Clone `public/index.html` file to build folder. Check how it works in my previous post [Webpack & Typescript](https://blog.adev42.com/setup-webpack-with-typescript)
  - **mini-css-extract-plugin**: Normally, the `css` will be in the js file after build. When running the app, `js` will add that `css` to <style></style> tag. Now, if we want the `css` to be in a separate file with `js` and when app running, `js` will automatically import it with the <link></link> tag. That is the function of this plugin.  
  Check more information for [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)
  - **webpack-bundle-analyzer**: It will create an interactive treemap visualization of the contents of all your bundles. Check [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
  
- Install `ESLint` & `Prettier`
  ```bash
  $ yarn add -D eslint eslint-config-react-app eslint-loader eslint-plugin-flowtype eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier eslint-plugin-prettier eslint-config-prettier
  ```
  Except `prettier`, `eslint-config-prettier` and `eslint-plugin-prettier` the rest are plugins used by `create-react-app`.