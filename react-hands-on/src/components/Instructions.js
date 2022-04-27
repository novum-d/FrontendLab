import React from "react";
//　より小さな、単一の機能にのみフォーカスしたコンポーネントに分割すべき(関数型プログラミングの原則)

// Instructionsは説明書の機能にフォーカスしたもので作業名と作業手順を含む
export default function Instructions({title, steps}) {
    return (
        <section className="instructions">
            <h2>{title}</h2>
            {steps.map((s, i) => (
                <p key={i}>{s}</p>
            ))}
        </section>
    );
}