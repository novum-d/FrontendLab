import { useState } from "react";

const SearchForm = ({ setLogin }: { setLogin: (login: string) => void }) => {
  const [text, setText] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLogin(text);
  };
  return (
    <>
      <form onSubmit={submit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Github User..."
        />
        <button>検索</button>
      </form>
    </>
  );
};

export default SearchForm;
