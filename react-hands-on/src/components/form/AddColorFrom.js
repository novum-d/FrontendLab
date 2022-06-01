import React, { useRef, useState } from "react";
import { useInput } from "../../hooks";

// イミュータブルでもなければ宣言型でもない(DOMノードを直接書き換えている)Reactコンポーネントを「uncontrolled component」という。
// React以外のライブラリとデータをやり取りする場合には、直接アクセスする必要がある。

// uncontrolled component
function AntiAddColorForm({ onNewColor = (f) => f }) {
  // ref: DOMノードに直接アクセスする方法
  const txtTitle = useRef();
  const hexColor = useRef();
  const submit = (e) => {
    // デフォルト動作を抑制
    e.preventDefault();

    // 親コンポーネントに通知
    const title = txtTitle.current.value;
    const color = hexColor.current.value;
    onNewColor(title, color); // onNewColor(色のタイトル, RGB値)

    // DOM要素のvalue属性をリセット(入力値をクリア)
    txtTitle.current.value = "";
    hexColor.current.value = "";
  };
  return (
    // onSubmitはデフォルトで指定されたURLに対してPOSTリクエストを送信する
    <form onSubmit={submit}>
      <input ref={txtTitle} type="text" placeholder="color title..." required />
      <input ref={hexColor} type="color" required />
      <button>ADD</button>
    </form>
  );
}

// react component
function CollectAddColorForm({ onNewColor = (f) => f }) {
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("#000000");

  const submit = (event) => {
    event.preventDefault();
    onNewColor(titleProps.value, colorProps.value);
    resetTitle();
    resetColor();
  };

  return (
    <form onSubmit={submit}>
      <input
        {...titleProps}
        type="text"
        placeholder="color title..."
        required
      />
      <input {...colorProps} type="color" required />
      <button>ADD</button>
    </form>
  );
}

// custom hooks
export default function AddColorForm({ onNewColor = (f) => f }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#ffffff");

  const submit = (e) => {
    e.preventDefault();
    onNewColor(title, color);
    setTitle("");
    setColor("");
  };

  return (
    <form onSubmit={submit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        type="text"
        placeholder="color title..."
        required
      />
      <input
        value={color}
        // eventオブジェクトのtargetフィールドはDOMへの参照なので
        onChange={(event) => setColor(event.target.value)}
        type="color"
        required
      />
      <button>ADD</button>
    </form>
  );
}
