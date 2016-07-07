# ⚛ futureRX

> 🚀 The futuristic stack to create universal React applications with MobX as state manager. With supporting async data fetching out of the box on server side rendering.

[![dependencies](https://david-dm.org/iam4x/futureRX.svg)](https://david-dm.org/iam4x/futureRX#info=dependencies&view=table)
[![devDependencies](https://david-dm.org/iam4x/futureRX/dev-status.svg)](https://david-dm.org/iam4x/futureRX#info=devDependencies&view=table)
[![CircleCI](https://img.shields.io/circleci/project/iam4x/futureRX.svg)](https://circleci.com/gh/iam4x/futureRX)
[![codecov](https://img.shields.io/codecov/c/github/iam4x/futureRX.svg)](https://codecov.io/gh/iam4x/futureRX)


WARNING: This is a proof of concept running on bleeding edge libraries, it has not been running in production yet. If you do [contact me](http://twitter.com/iam4x).

This project aim frontend applications which are using an external API to work with data. This boilerplate does not include an API with it to fetch/persist data.

## Libraries used

> **nodejs ^6.2** / **npm ^3.9**

  * #### react
    * [mobx](https://github.com/mobxjs/mobx)
    * [mobx-store](https://github.com/AriaFallah/mobx-store)
    * [react ^15](https://facebook.github.io/react/)
    * [react-router ^2.0.0](https://github.com/rackt/react-router)
    * [react-hot-loader ^3.0.0-beta](https://github.com/gaearon/react-hot-loader)
    * [why-did-you-update](https://github.com/garbles/why-did-you-update)

  * #### css styles
    * [css-modules](https://github.com/css-modules/css-modules) 🌟
    * [postcss ^5.0.21](https://github.com/postcss/postcss)
    * [postcss-import ^8.1.2](https://github.com/postcss/postcss-import)
    * [postcss-url ^5.1.2](https://github.com/postcss/postcss-url)
    * [autoprefixer ^6.3.6](https://github.com/postcss/autoprefixer)
    * [precss ^1.4.0](https://github.com/jonathantneal/precss)
    * [isomorphic-style-loader ^1.0.0](https://github.com/kriasoft/isomorphic-style-loader)
    * _Supports also global CSS for real world usage with:_
        * [extract-text-webpack-plugin ^1.0.1](https://github.com/webpack/extract-text-webpack-plugin)
        * [style-loader ^0.13](https://github.com/webpack/style-loader)

  * #### server side rendering
    * [koa ^2.0.0](http://koajs.com/)

  * #### testing tools
    * [ava ^0.15.2](https://github.com/sindresorhus/ava)
    * [jsdom ^9.4.0](https://github.com/tmpvar/jsdom)
    * [enzyme ^2.3.0](https://github.com/airbnb/enzyme)
    * [chai-enzyme ^0.5.0](https://github.com/producthunt/chai-enzyme)
    * [faux-jax ^5.0.1](https://github.com/algolia/faux-jax)
    * [sinon ^1.17.4](https://github.com/sinonjs/sinon)
    * [sinon-chai ^2.8.0](https://github.com/domenic/sinon-chai)
    * [nyc ^7.0.0-alpha.5](https://github.com/bcoe/nyc)

  * #### dev/building tools
    * [webpack ^2.1.0-beta.15](http://webpack.github.io/)
    * [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)
    * [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)
    * [babeljs ^6.9](https://babeljs.io/)
    * [flowtype (via babel-plugin-typecheck)](https://github.com/codemix/babel-plugin-typecheck)
    * [browser-sync](https://www.browsersync.io)

## Setup

* `$ git clone https://github.com/iam4x/futureRX.git [myApp]`
* `$ cd [myApp] && npm install`

## Run

  * ### dev
    * `$ npm run dev` OR
    * `$ PORT=xxxx npm run dev`
    * (Append `?debugRender` to your URL to enable `why-did-you-update`)

  * ### test
    * `$ npm test` OR
    * `$ npm test -- --watch`

  * ### build
    * `$ NODE_ENV=production npm run build`
    * `$ NODE_ENV=production node server`

### TODO

* [x] allow override of listening ports via config ([7e9ae4a](https://github.com/iam4x/futureRX/commit/7e9ae4ac73fdd562fed5d39dda9325b4541217af))
* [x] styles with css-modules and global styles ([#1](https://github.com/iam4x/futureRX/pull/1))
* [ ] test with ava and airbnb-enzyme
* [ ] webpack build config
* [ ] production server optimization
* [ ] refactor server code

### Learn more

* [Official ReactJS website](http://facebook.github.io/react/)
* [Official ReactJS wiki](https://github.com/facebook/react/wiki)
* [Learn ES6](https://babeljs.io/docs/learn-es6/)
* [ES6 Features](https://github.com/lukehoban/es6features#readme)
