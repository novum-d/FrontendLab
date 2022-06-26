import { memo, useCallback, useState } from "react";

const App = () => {
  const [cats, setCats] = useState(["Biscuit", "Jungle", "Outlaw"]);
  return (
    <>
      {cats.map((name, i) => (
        <PureCat
          key={i}
          name={name}
          // アロー関数は描画のたびにインスタンスが生成されるのでmemorizationが機能しない
          // useMemoやuseCallBackを使えば、オブジェクトや関数をmemorizationできる
          meow={(name) => console.log(`${name} has meowed`)}
        />
      ))}
      <button onClick={() => setCats([...cats, prompt("Name a cat") ?? ""])}>
        Add a Cat
      </button>
    </>
  );
};

type CatProps = {
  name: string;
  meow: (name: string) => void;
};

const Cat = ({ name, meow }: CatProps) => {
  console.log(`rendering ${name}`);
  return <p onClick={() => meow(name)}>{name}</p>;
};

const PureCat = memo(
  Cat,
  (prevProps, nextProps) => prevProps.name === nextProps.name
);

export default App;
