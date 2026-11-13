"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// O confete é puramente decorativo: carregamos a lib em um chunk separado,
// só no cliente, para não pesar no bundle inicial nem atrasar a hidratação.
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Confetti() {
  const [size, setSize] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Respeita quem pediu menos animação (e economiza CPU/bateria).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Depois que o confete termina (recycle={false}), desmonta o canvas e
  // remove o listener de resize em vez de deixá-los vivos para sempre.
  if (done || !size) return null;

  return (
    <ReactConfetti
      width={size.width}
      height={size.height}
      recycle={false}
      numberOfPieces={400}
      onConfettiComplete={() => setDone(true)}
    />
  );
}
