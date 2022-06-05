# React & TypeScript メモ

- ## ts でスプレット構文を書くには、Down leveling が必要

  ```tsx
  <AddColorForm
    onNewColor={(title: string, color: string) => {
      const newColor: SetStateAction<Color[]> = [
        ...colors,
        {
          id: v4(),
          rating: 0,
          title,
          color,
          kkkkkkkkkk,
        },
      ];
      setColors(newColor);
    }}
  />
  ```

  > ### Down leveling（ダウンレベリング）とは
  >
  > Down leveling（ダウンレベリング）というのは、古いバージョンの JS コードにコンパイルするという意味の TypeScript 用語です。
  > target が ES3 または ES5 の際に、ジェネレータの yield\*や for..of 構文などの ES6 から追加されたイテレーション系の記法を、より正確なコードにコンパイルしたい場合に true にします。

- React + TypeScript でカスタムフックの返す返す方にタプル型を指定したところ、互換性エラーで怒られてしまいました。そのときのメモです。

  まず、useState フックのおさらいから入ります。すでに、理解している人はスルーしてください。

  ## 【useState フックとは?】

  ### useState フック

  useState フックは、「初期値の型に応じた値」と「その値を変更する関数」の２つの要素を用意したタプルを返します。タプル(配列)として返すことで、デストラクチャリングにより自分で変数の名前を設定することができます。

  > **タプル(tuple)** - 複数のタイプの値を扱うことのできる不変(Immutable)な配列

  カスタムフック作成して明示的にタプル型を指定しなかった場合、カスタムフックの使用先で以下のようなエラーが現れました。

  ### カスタムフック

  ```tsx
  export const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value);
    return [
      {
        value: value,
        onChange: handleChange,
      },
      () => setValue(initialValue),
    ];
  };
  ```

  ### カスタムフックの使用先

  ```tsx
  const AddColorForm: React.FC<Props> = ({ onNewColor = () => undefined }) => {
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("#000000");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onNewColor(titleProps.value, colorProps.value); // Property 'value' does not exist on type '(() => void) ...
    resetTitle();
    resetColor();
  };

  return (
    <form onSubmit={submit}>
    ...
    );
  };
  ```

  ```
  Property 'value' does not exist on type '(() => void) | { value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; }'.
  Property 'value' does not exist on type '() => void'.
  ```

  `Property 'value' does not exist on type '() => void'.`2 行目のエラーで互換性がないと言われている型に注目してください。本来の value の型は、string 型ですが、ts に推測された型は、() => void をとなっています。

  **通常の配列ではなく、タプルを推測する場合、 TypeScript に通知する必要があります**。

  このエラーは以下の解決策は、2 つあります。

  ## 【解決策】

  ### 1. タプルの型を明示的に指定する

  ```tsx
  type Input = readonly [
    {
      readonly value: string;
      readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    },
    () => void
  ];

  export const useInput = (initialValue: string): Input => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value);
    return [
      {
        value: value,
        onChange: handleChange,
      },
      () => setValue(initialValue),
    ];
  };
  ```

  type キーワードを使って型を作成して前述の通り、明示的に定義します。

  ### 2. `as const` キーワードを使用する

  ```tsx
  export const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value);
    return [
      {
        value: value,
        onChange: handleChange,
      },
      () => setValue(initialValue),
    ] as const;
  };
  ```

  `as const` キーワードは配列やオブジェクトを内部の要素を含め readonly(読み取り専用)にします。as const キワードを付け加えることにより、返す型を不変なタプルに変更することができました。

  以上、カスタムフックにタプル型を指定する方法でした。
  タプル型の指定には、推論が効かないのでお気をつけください!
