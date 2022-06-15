# React + TypeScript の開発環境に webpack-dev-server を追加する

開発

この記事では、導入することで格段に開発効率を上げることができる webpack-dev-server を使った React + TypeScript の開発環境の構築方法をご紹介します。

```sh
$ node -v
v16.15.1

$ yarn -v
1.22.19
```

eslit の設定

```sh
yarn create @eslint/config
```

## 1. React + TypeScript のプロジェクトを作成する

プロジェクトのひな形を [create-react-app](https://create-react-app.dev/) を使用して作成します。

`create-react-app` は、Facebook 社製の React プロジェクト作成を自動化するコマンドラインツールです。v2.1.0 で TypeScript をサポートするようになりました。以下の例では、`react-server` というプロジェクト名で作成しています。

- インストール方法

  ```sh
  $ yarn global add create-react-app
  ```

- 使用方法
  ```sh
  $ yarn create react-app react-server --template typescript
  ```

## 2. eslint, prettier の設定

React および TypeScript のスタイルガイドに準拠させ、一貫した自動フォーマットを行うために eslint, pritter に関する設定を行います。

eslint, prittier はそれぞれ、JavaScript の Linter, Formatter のディファクトスタンダードです。

eslint は、コードを静的解析をし、バグやスタイルガイドに準拠していない部分を検知するのに役立ちます。一方、prettier は、コードスタイルを統一することを目的としています。コードスタイルを統一することで複数のコミッターが存在するチーム開発の場合、コードスタイルの違いによる議論を避けることができるため、非常に重要となってきます。

eslint, prettier は、create-react-app によりすでにインストールされているので早速、設定を行っていきます。

1.  How would you like to use ESLint? …
2.  What type of modules does your project use? …

3.  Which framework does your project use? …
4.  Does your project use TypeScript? ›

5.  Where does your code run? …

6.  What format do you want your config file to be in? …

7.  Would you like to install them now? …

## 3. webpack の導入

## 4. webpack-dev-server の設定

```sh
$ yarn -D add eslint-config-prettier
```

web-dev-server とは、

vscode の

追加する依存関係

- webpack-dev-server の設定ファイル
  https://webpack.js.org/configuration/dev-server/
