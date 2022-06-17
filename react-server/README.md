# React + TypeScript の開発環境に webpack-dev-server を追加する

**本記事の対象**

以下のいずれかに該当する方に役立つかと思います。

- webpack-dev-server に興味がある
- create-react-app で作ったアプリを webpack-dev-server で実行したい
- React でホットリロード機能を使用したい

この記事では、導入することで格段に開発効率を上げることができる webpack-dev-server を使った React + TypeScript の開発環境の構築方法をご紹介します。

初めての React 環境構築なので、よりよい方法やバグ等ございましたら、アドバイスいただけると光栄です。

投稿時時点のバージョンは以下のようになっております。

```shell
$ node -v
v16.15.1

$ yarn -v
1.22.19

$ yarn list --depth=0 | grep webpack-dev-server
├─ webpack-dev-server@4.9.2
```

まず、webpackpack-dev-server について理解を深めていきたいと思います。

## 【webpack-dev-server とは?】

`webpack-dev-server` は、webpack を用いた開発用のサーバーで Web サーバーの自動更新を行うライブリローディング(Live Reloading)機能をを提供します。

ソースコードを変更して保存すると、差分を検知してコンパイルされ、Web サーバーが自動的にリロードされます。変更と同時に自動的にビルドすることで更新作業を気にせず、開発に集中することができます。

変更のたびに毎回、手動でビルドをしなくて済むのでとてもスムーズに開発することができるかと思います。

それでは、実際に webpack-dev-server を使った React+ TypeScript の環境構築を行っていきます。

## 1. React + TypeScript のプロジェクトを作成する

プロジェクトのひな形を [create-react-app](https://create-react-app.dev/) を使用して作成します。

`create-react-app` は、Facebook 社製の React プロジェクト作成を自動化するコマンドラインツールです。v2.1.0 で TypeScript をサポートするようになりました。以下の例では、`react-server` というプロジェクト名で作成しています。

- インストール方法

  ```shell
  $ yarn global add create-react-app
  ```

- 使用方法
  ```shell
  $ yarn create react-app react-server --template typescript
  ```

## 2. eslint, prettier の設定

React および TypeScript のスタイルガイドに準拠させ、一貫した自動フォーマットを行うために `ESLint`, `Prettier` に関する設定を行います。

### ESLint と Prettier

ESLint, Prettier はそれぞれ、JavaScript の Linter, Formatter のディファクトスタンダードです。

`ESLint` は、コードを静的解析をし、バグやスタイルガイドに準拠していない部分を検知するのに役立ちます。一方、`Prettier` は、コードスタイルを統一することを目的としています。コードスタイルを統一することでコードスタイルの違いによる議論を避けることができるため、非常に重要なツールとなってきます。

この 2 つのツールの概要を理解したところで、 VSCode と組み合わせて設定を行っていきます。

### [VSCode 拡張機能のインストール]

以下の 2 つの拡張機能をインストールします。

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### [VSCode の設定]

### [ESLint の設定]

eslint の設定は、次のコマンドを実行して対話形式で行います。

```shell
$ yarn create @eslint/config
```

以下のように質問に答えていきます。

1.  コードをチェックする範囲  
    シンタックスおよび問題をチェックし、スタイルの適用を支援する`To check synatx, find problems, and enforce code style`を選択します。
    ![](images/1.png)
2.  モジュール  
     ウェブブラウザがデフォルトで採用している `ES Modules` を選択します。
    ![](images/2.png)
3.  UI フレームワーク  
    `React` を選択します。
    ![](images/3.png)
4.  TypeScript を使用するかどうか  
    `Yes` を選択します。
    ![](images/4.png)
5.  コードの実行環境  
    プロジェクトがブラウザで実行されている場合（React, Angular, Vue, etc...）、は Browser, プロジェクトが Node ベースの場合は、Node を選択します。
    今回は、`Browser` のみを選択します。(この質問に対してはスペースで複数選択が可能です。)
    ![](images/5.png)
6.  スタイルガイドの設定方法  
    有名なスタイルガイドを使用するため、`Use a popular style guide`を選択します。
    ![](images/6.png)
7.  スタイルガイドの種類  
    GitHub 上で最も人気のある Airbnb を使用します。`Airbnb: https://github.com/airbnb/javascript`を選択します。
    ![](images/7.png)
8.  ESLint の設定ファイルの形式  
    自分のお気に入りのファイル拡張子を選択してください。ここでは、デフォルトの `JavaScript` 選択します。
    ![](images/8.png)
9.  追加で必要な依存関係をインストールするか  
    `Yes` を選択します。
    ![](images/9.png)
10. `9` のインストールで使用するパッケージマネージャ  
    プロジェクトで使用している`yarn` を選択します。
    ![](images/10.png)

すべての質問に答えると ESLint の設定ファイルである`.eslintrc.js`がプロジェクト直下に作成されます。

次に ESLint と Prettier の連携を行います。プラグインとして Prettier を使用するためには ESLint に指示する必要があります。

.eslintrc.js の`plugins`に "prettier" を追加します。

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {},
};
```

### [Prettier の設定]

プロジェクト直下に Prettier の設定ファイル `.prettierrc.json`を作成します。

デフォルト設定を使用します。お気に入りの設定がある場合は、変更できます。

```shell
$ echo {} > .prettierrc.json
```

### [ESLint, Prettier の競合阻止]

ESLint, Prettier を同時に動作させている場合、一部のルールが競合する可能性があります。この問題を回避するには、不要なルールや Prettier と競合する可能性のあるすべてのルールをオフにする必要があります。

次の eslint-config-prettier をインストールすることで、この問題を解決することができます。

```shell
$ yarn add -D eslint-config-prettier
```

これで、プロジェクトで ESLint と Prettier が完全に同時に機能するようになりました。

## 3. webpack-dev-server の設定

webpack を CLI から呼び出すことができる `webpack-cli`、TypeScript を JavaScript にトランスパイル可能な webpack 用の loader`ts-loader`をそれぞれインストールします。

```shell
$ yarn add -D webpack-cli ts-loader
```

webpack.config.js

```js
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: "./src/index.tsx",
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
    hotOnly: true,
    host: "0.0.0.0",
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
    new WebpackManifestPlugin(),
  ],
};
```

## 4. の設定

```sh
$ yarn -D add eslint-config-prettier
```
