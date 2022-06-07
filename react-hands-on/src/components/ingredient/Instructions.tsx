import React from "react";

type InstructionsProps = {
  title: string;
  steps: string[];
};

// より小さな、単一の機能にのみフォーカスしたコンポーネントに分割すべき(関数型プログラミングの原則)
// Instructionsは説明書の機能にフォーカスしたもので作業名と作業手順を含む
export const Instructions = ({ title, steps }: InstructionsProps) => {
  return (
    <section className="instructions">
      <h2>{title}</h2>
      {steps.map((s, i) => (
        <p key={i}>{s}</p>
      ))}
    </section>
  );
};
