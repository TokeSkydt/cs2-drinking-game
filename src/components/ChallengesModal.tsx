"use client";

import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { Challenge } from "@/types/game";

interface ChallengesModalProps {
  open: boolean;
  onClose: () => void;
  challenges: Challenge[];
  onChange: (challenges: Challenge[]) => void;
}

export default function ChallengesModal({ open, onClose, challenges, onChange }: ChallengesModalProps) {
  const [newText, setNewText] = useState("");

  const toggle = (i: number) => {
    const updated = [...challenges];
    updated[i] = { ...updated[i], active: !updated[i].active };
    onChange(updated);
  };

  const deleteChallenge = (i: number) => {
    onChange(challenges.filter((_, idx) => idx !== i));
  };

  const addChallenge = () => {
    const text = newText.trim();
    if (!text) return;
    onChange([...challenges, { text, active: true, custom: true }]);
    setNewText("");
  };

  const activeCount = challenges.filter((c) => c.active).length;

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-[580px]">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-display text-[28px] text-cs-text">🎲 SECRET CHALLENGES</h2>
        <button
          onClick={onClose}
          className="bg-transparent border border-cs-border rounded text-cs-text-muted w-8 h-8 flex items-center justify-center hover:border-cs-red hover:text-cs-red transition-colors"
        >
          ×
        </button>
      </div>

      <p className="text-[13px] text-cs-text-muted mb-3 leading-relaxed">
        Toggle challenges on/off or add your own.{" "}
        <span className="text-cs-green">Green = active</span>, greyed out = removed.
      </p>

      <div className="flex flex-col gap-[6px] my-3 max-h-[360px] overflow-y-auto pr-1">
        {challenges.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-2 bg-cs-surface border border-cs-border rounded-md hover:border-cs-muted transition-colors"
          >
            <button
              onClick={() => toggle(i)}
              className="bg-transparent border-none cursor-pointer text-base p-[2px] flex-shrink-0 transition-opacity"
              title={c.active ? "Remove" : "Add back"}
            >
              {c.active ? (
                <span className="text-cs-green">✓</span>
              ) : (
                <span className="text-cs-muted">✗</span>
              )}
            </button>
            <span
              className={[
                "flex-1 text-[13px] leading-[1.4]",
                c.active ? "text-cs-text" : "line-through text-cs-muted",
              ].join(" ")}
            >
              {c.text}
            </span>
            {c.custom && (
              <button
                onClick={() => deleteChallenge(i)}
                className="bg-transparent border border-cs-border rounded text-cs-text-muted w-7 h-7 flex items-center justify-center text-sm hover:border-cs-red hover:text-cs-red transition-colors flex-shrink-0"
                title="Delete"
              >
                🗑
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addChallenge()}
          placeholder="Add your own challenge..."
          maxLength={80}
          className="flex-1 bg-cs-surface border border-cs-border rounded px-3 py-2 text-cs-text text-[14px] outline-none focus:border-cs-red focus:shadow-[0_0_0_2px_rgba(255,59,48,0.1)] placeholder:text-cs-muted transition-all"
        />
        <Button variant="green" size="xs" onClick={addChallenge}>+ ADD</Button>
      </div>

      <div className="mt-2 text-right font-mono text-[10px] text-cs-text-muted tracking-widest">
        {activeCount} / {challenges.length} ACTIVE
      </div>

      <div className="mt-3">
        <Button variant="ghost" fullWidth size="sm" onClick={onClose}>DONE</Button>
      </div>
    </Modal>
  );
}
