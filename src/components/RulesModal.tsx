// Server component — pure static content, no interactivity needed here.
// The parent (Modal) is already "use client" and handles open/close.
import Modal from "./Modal";
import Button from "./Button";

interface RulesModalProps {
  open: boolean;
  onClose: () => void;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="font-display text-[20px] text-cs-red mb-2 pb-[6px] border-b border-cs-border">{title}</h3>
      {children}
    </div>
  );
}

function Rule({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-[10px] py-2 border-b border-white/[0.04] last:border-0">
      <span className="text-cs-red text-base mt-[1px] flex-shrink-0">•</span>
      <p className="text-[13px] text-cs-text-muted leading-[1.5]">{children}</p>
    </div>
  );
}

export default function RulesModal({ open, onClose }: RulesModalProps) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-[600px]">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-display text-[28px] text-cs-text">📋 DRINKING RULES</h2>
        <button
          onClick={onClose}
          className="bg-transparent border border-cs-border rounded text-cs-text-muted w-8 h-8 flex items-center justify-center hover:border-cs-red hover:text-cs-red transition-colors"
        >
          ×
        </button>
      </div>

      <Section title="🔁 BASE RULES">
        <Rule><strong className="text-cs-text">You die</strong> → 1 sip</Rule>
        <Rule><strong className="text-cs-text">You die to a knife</strong> → Finish your entire drink</Rule>
        <Rule><strong className="text-cs-text">You die to a Zeus</strong> → 5 extra sips</Rule>
        <Rule><strong className="text-cs-text">Your team loses a round</strong> → 1 sip</Rule>
        <Rule><strong className="text-cs-text">Your team loses the match</strong> → 1 shot</Rule>
      </Section>

      <Section title="🔪 KNIFE RULES">
        <Rule><strong className="text-cs-text">You get a knife kill</strong> → Everyone must <strong className="text-cs-text">finish their entire drink</strong> before moving again</Rule>
        <Rule><strong className="text-cs-text">If they die while drinking</strong> → They take 1 shot</Rule>
      </Section>

      <Section title="⚡ ZEUS RULE">
        <Rule><strong className="text-cs-text">Zeus kill</strong> → Everyone must <strong className="text-cs-text">finish their entire drink</strong> before moving again</Rule>
      </Section>

      <Section title="🔥 KILL REWARD RULES">
        <Rule><strong className="text-cs-text">3 kills in one round</strong> → Give out 4 sips</Rule>
        <Rule><strong className="text-cs-text">4 kills in one round</strong> → Give out 6 sips</Rule>
        <Rule><strong className="text-cs-text">Ace (5 kills in one round)</strong> → Everyone else takes 1 shot</Rule>
      </Section>

      <Section title="🚨 RULE BREAKING PUNISHMENT">
        <Rule>If someone breaks a rule → they take what they owe <strong className="text-cs-text">+ 1 extra shot</strong></Rule>
        <div className="bg-[rgba(255,59,48,0.08)] border border-[rgba(255,59,48,0.2)] rounded-md px-[14px] py-[10px] my-2 text-[13px] text-cs-text-muted leading-relaxed">
          <strong className="text-cs-red">Example:</strong> If they owed 4 sips → They take 4 sips + 1 shot
        </div>
      </Section>

      <Section title="😈 EXTRA EVIL RULES">
        <Rule><strong className="text-cs-text">Die first in 3 rounds in a row</strong> → Take 1 shot</Rule>
        <Rule><strong className="text-cs-text">Bottom fragger at halftime</strong> → Take 1 shot</Rule>
        <Rule><strong className="text-cs-text">Halftime top fragger</strong> → Can give out 5 sips</Rule>
        <Rule><strong className="text-cs-text">Team kill</strong> → 1 shot</Rule>
        <Rule><strong className="text-cs-text">Die to a pistol while using a better gun</strong> → 5 sips</Rule>
      </Section>

      <Button variant="ghost" fullWidth size="sm" onClick={onClose}>CLOSE</Button>
    </Modal>
  );
}
