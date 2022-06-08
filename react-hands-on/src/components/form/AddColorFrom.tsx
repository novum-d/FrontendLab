import React, { useRef, useState } from "react";
import { useInput } from "../../hooks";
import { useColors } from "../color/ColorProvider";

type AddColorFormProps = {
  onNewColor: (title: string, color: string) => void;
};

// イミュータブルでもなければ宣言型でもない(DOMノードを直接書き換えている)Reactコンポーネントを「uncontrolled component」という。
// React以外のライブラリとデータをやり取りする場合には、直接アクセスする必要がある。

// uncontrolled component
const AntiAddColorForm = ({
  onNewColor = () => undefined,
}: AddColorFormProps) => {
  // ref: DOMノードに直接アクセスする方法
  const txtTitle = useRef<HTMLInputElement>(null);
  const hexColor = useRef<HTMLInputElement>(null);
  const submit = (e: React.FormEvent) => {
    // デフォルト動作を抑制
    e.preventDefault();

    // 親コンポーネントに通知
    const title = txtTitle.current?.value ?? "";
    const color = hexColor.current?.value ?? "";
    onNewColor(title, color); // onNewColor(色のタイトル, RGB値)

    // DOM要素のvalue属性をリセット(入力値をクリア)
    if (txtTitle.current !== null && hexColor.current !== null) {
      txtTitle.current.value = "";
      hexColor.current.value = "";
    }
  };
  return (
    // onSubmitはデフォルトで指定されたURLに対してPOSTリクエストを送信する
    <form onSubmit={submit}>
      <input ref={txtTitle} type="text" placeholder="color title..." required />
      <input ref={hexColor} type="color" required />
      <button>ADD</button>
    </form>
  );
};

// react component
const CollectAddColorForm = ({
  onNewColor = () => undefined,
}: AddColorFormProps) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#ffffff");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onNewColor(title, color);
    setTitle("");
    setColor("");
  };

  return (
    <form onSubmit={submit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="color title..."
        required
      />
      <input
        value={color}
        // eventオブジェクトのtargetフィールドはDOMへの参照
        onChange={(e) => setColor(e.target.value)}
        type="color"
        required
      />
      <button>ADD</button>
    </form>
  );
};

// custom hooks
const AddColorForm = () => {
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("#000000");

  const { addColor } = useColors();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addColor(titleProps.value, colorProps.value);
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
};

export default AddColorForm;
