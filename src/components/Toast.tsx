"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "";
  onDone: () => void;
}

export default function Toast({ message, type = "", onDone }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 300); }, 2500);
    return () => clearTimeout(t);
  }, [message, onDone]);

  return (
    <div className={[
      "fixed bottom-5 left-1/2 -translate-x-1/2 bg-cs-card border rounded-lg px-6 py-3 font-mono text-[13px] text-cs-text z-[9000] whitespace-nowrap transition-transform duration-300",
      visible ? "translate-y-0" : "translate-y-[100px]",
      type === "error" ? "border-cs-red text-cs-red" : type === "success" ? "border-cs-green text-cs-green" : "border-cs-border",
    ].join(" ")}>
      {message}
    </div>
  );
}
