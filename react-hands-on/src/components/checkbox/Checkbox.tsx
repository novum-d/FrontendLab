import React, { useEffect, useState } from "react";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    console.log(checked ? "Yes, checked" : "No, not checked");
  });
  return (
    <>
      <input
        type="checkbox"
        value={checked.toString()}
        onChange={() => setChecked((checked) => !checked)}
      />
      {checked ? "checked" : "not checked"}
    </>
  );
};

export default Checkbox;
