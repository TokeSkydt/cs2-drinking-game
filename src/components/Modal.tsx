"use client";

import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({ open, onClose, children, maxWidth = "max-w-[560px]" }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/[0.88] backdrop-blur-md z-[1000] flex items-start justify-center p-5 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={[
          "bg-cs-card border border-cs-border rounded-xl p-7 w-full animate-bounceIn relative my-auto",
          maxWidth,
        ].join(" ")}
      >
        {/* red top bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cs-red via-[#FF6B63] to-cs-red rounded-t-xl" />
        {children}
      </div>
    </div>
  );
}
