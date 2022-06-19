# webpack-dev-server を使った React + TypeScript の開発環境

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/dec3efbe-21a7-1f1a-31c2-50daf8e9c68c.png)

**本記事の対象**

以下のいずれかに該当する方に役立つかと思います。

- React + TypeScript の開発環境が必要
- webpack-dev-server v3 -> v4 に移行を考えている
- create-react-app で作ったアプリを webpack-dev-server で動かしたい
- React でホットリロード機能を使用したい

## はじめに

この記事では、導入することで格段に開発効率を上げることができる webpack-dev-server を使った React + TypeScript の開発環境の構築方法をご紹介します。

初めての React 環境構築なので、よりよい方法やバグ等ございましたら、アドバイスいただけると光栄です。

投稿時時点(2022/06/20)のバージョンは以下のようになっております。

```shell
$ node -v
v18.3.1

$ yarn -v
1.22.19

$ yarn list --depth=0 | grep webpack
├─ @pmmmwh/react-refresh-webpack-plugin@0.5.7
├─ @svgr/webpack@5.5.0
├─ @webpack-cli/configtest@1.2.0
├─ @webpack-cli/info@1.5.0
├─ @webpack-cli/serve@1.7.0
├─ case-sensitive-paths-webpack-plugin@2.4.0
├─ css-minimizer-webpack-plugin@3.4.1
├─ eslint-webpack-plugin@3.1.1
├─ fork-ts-checker-webpack-plugin@6.5.2
├─ html-webpack-plugin@5.5.0
├─ terser-webpack-plugin@5.3.3
├─ webpack-cli@4.10.0
├─ webpack-dev-middleware@5.3.3
├─ webpack-dev-server@4.9.2
├─ webpack-manifest-plugin@4.1.1
├─ webpack-merge@5.8.0
├─ webpack-sources@1.4.3
├─ webpack@5.73.0
├─ workbox-webpack-plugin@6.5.3
```

まず、webpack-dev-server について理解を深めていきたいと思います。

## 【webpack-dev-server とは?】

`webpack-dev-server` は、[webpack](https://webpack.js.org/) を用いた開発用のサーバーで Web サーバーの自動更新を行うライブリローディング(Live Reloading)機能をを提供します。

ソースコードを変更して保存すると、差分を検知してコンパイルされ、Web サーバーが自動的にリロードされます。変更と同時に自動的にビルドすることで更新作業を気にせず、開発に集中することができます。変更のたびに毎回、手動でビルドをしなくて済むのでとてもスムーズに開発することができるかと思います。

それでは、実際に webpack-dev-server を使った React+ TypeScript の環境構築を行っていきます。

## 1. React + TypeScript のプロジェクト作成

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

ESLint, Prettier はそれぞれ、JavaScript のリンター, フォーマッターのディファクトスタンダードです。

`ESLint` は、コードを静的解析をし、バグやスタイルガイドに準拠していない部分を検知するのに役立ちます。一方、`Prettier` は、コードスタイルを統一することを目的としています。コードスタイルを統一することでコードスタイルの違いによる議論を避けることができるため、非常に重要なツールとなってきます。

この 2 つのツールの概要を理解したところで、 VSCode と組み合わせて設定を行っていきます。

### [VSCode 拡張機能のインストール]

以下の 2 つの拡張機能をインストールします。

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### [VSCode の設定]

VSCode で Prettier を使用できるよう設定します。  
以下の２つを VSCode の設定画面を開いて変更します。

- 保存時にフォーマッターが実行されるようにする
  ![on_save.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/10f8e25e-475d-8ef8-4d6b-c6699457a8fd.png)

- Prettier をデフォルトのフォーマッターとして使用する
  ![formatter.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/ffe1d265-bf6d-68cc-6c67-a36e2f98c23f.png)

### [ESLint の設定]

eslint の設定を、次のコマンドを実行して対話形式で行います。

```shell
$ yarn create @eslint/config
```

以下のように質問に答えていきます。

1.  コードをチェックする範囲  
    シンタックスおよび問題をチェックし、スタイルの適用を支援する`To check syntax, find problems, and enforce code style`を選択します。
    ![1.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/02b8d4b9-1991-0f26-2b14-11edac0112ef.png)

2.  モジュール  
     ウェブブラウザがデフォルトで採用している `ES Modules` を選択します。
    ![2.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/5183e4b0-6fac-10af-0007-ba20d6bd35cf.png)

3.  UI フレームワーク  
    `React` を選択します。
    ![3.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/fffeda3c-886c-6f95-7a69-0baf67f83dda.png)

4.  TypeScript を使用するかどうか  
    `Yes` を選択します。
    ![4.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/104d7593-1401-277d-1f0d-a0c2e1f90228.png)

5.  コードの実行環境  
    プロジェクトがブラウザで実行されている場合（React, Angular, Vue, etc...）、は Browser, プロジェクトが Node ベースの場合は、Node を選択します。
    今回は、`Browser` のみを選択します。なお、この質問に対してはスペースで複数選択することが可能です。
    ![5.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/7716779f-7577-5e7c-0c8f-1a96ec174ed5.png)

6.  スタイルガイドの設定方法  
    有名なスタイルガイドを使用するため、`Use a popular style guide`を選択します。
    ![6.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/5642d372-cdb2-3ee4-7645-dab0460a8eee.png)

7.  スタイルガイドの種類  
    GitHub 上で最も人気のある Airbnb を使用します。`Airbnb: https://github.com/airbnb/javascript`を選択します。
    ![7.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/0769dfe8-fad7-717d-3c33-92a283821eea.png)

8.  ESLint の設定ファイルの形式  
    自分のお気に入りのファイル拡張子を選択します。ここでは、デフォルトの `JavaScript` 選択します。
    ![8.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/20469775-2981-e085-b091-393de6c24cd6.png)

9.  追加で必要な依存関係をインストールするか  
    `Yes` を選択します。
    ![9.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/bd7e2c76-6ffb-f0c5-6da7-473fbb6a1cfc.png)

10. `9` のインストールで使用するパッケージマネージャ  
    プロジェクトで使用している`yarn` を選択します。
    ![10.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/9fdba74a-0530-bd3e-2e94-3d943e471d21.png)

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

次に、webpack の設定ファイルである `webpack.config.js` をプロジェクト直下に作成し、編集します。

```shell
$ touch webpack.config.js
```

**webpack.config.js**

```js
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
  devServer: {
    open: true,
    hot: true,
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
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
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

| オプション名       | 説明                                                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode               | webpack の開発モード。production(製品), development(開発), none(デフォルト)の 3 つのモードに応じて読み込む webpack.config.js 分けることができます。 |
| devtool            | ソースマップを生成とその方法。このオプションを指定することでソースマップが生成されるようになります。                                                |
| entry              | アプリケーションのバンドルを開始するエントリー。主にメインスレッドとなるファイルを指定します。                                                      |
| module.rules       | モジュールの作成時のルール。モジュールにローダーを適用したり、パーサーを変更したりできます。                                                        |
| resolve.extensions | モジュールの拡張子の解決。配列の最初から順番にリストされている拡張子を持つファイルを解決し、残りをスキップします。                                  |
| devServer          | webpack-dev-server の設定。開発用 Web サーバーの様々な設定を行うことができます。                                                                    |
| plugins            | webpack のビルドプロセスをカスタマイズするためのプラグイン。                                                                                        |

ローダーとして指定した ts-loader ですが`noEmit` オプションが有効になっているとでエラーが出るので無効にします。

tsconfig.json の `compilerOptions.noEmit` を true から false に変更します。

**tsconfig.json**

```json
{
  "compilerOptions": {
    "noEmit": "false"
     ︙
  }
}
```

## 4. index.html の編集

静的ファイルのある「public」ディレクトリに合わせてファイルパスを変更します。  
`devServer.static` オプションはデフォルトで静的ファイルのディレクトリとして「public」ディレクトリを提供します。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="logo192.png" />
    <link rel="manifest" href="manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

## ５. react-create-app の実行

react-create-app で作成したアプリを実際に実行します。ついでに、ホットリロード機能が有効になっているかも確認します。

```sh
$ yarn webpack serve
```

**Demo**
![output.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1907077/60072aa7-81b1-9840-7068-097f86dd845a.gif)

ファイルに変更を加えてから保存すると、内容が即座に更新されているかと思います。

ホットリロード、気持ちよすぎだろ…

```
    ↓ me ↓
　　　*'``・*。
　　　 |　　　 `*。
　　,。∩　　　　*
+　 (´∀｀ ) *。+゜
`*。 ヽ、　つ *゜*
　 `・+。*・'⊃+゜
　 ☆　　∪~
```

## 最後に

以上となります。webpack-dev-server を使った React + TypeScript の開発環境の構築方法をご紹介いたしました。  
「ホットリロードといえば、 Flutter」みたいなイメージが強かったですが React にもあるんですね〜✨

最後まで記事をご購読いただきありがとうございました。
