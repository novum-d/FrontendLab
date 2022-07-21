import React from "react";

const Agreements = ({ onAgree }: { onAgree: () => void }) => {
  return (
    <div>
      <p>Terms...</p>
      <p>These are the terms and stuff. Do you agree?</p>
      <button onClick={onAgree}>I agree</button>
    </div>
  );
};

export default Agreements;
