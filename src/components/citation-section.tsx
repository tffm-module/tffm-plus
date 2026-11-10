import { useState } from "react";
import { FaClipboard, FaCheck } from "react-icons/fa";
import { Section } from "./ui";

/* Update booktitle / pages once the BMVC 2026 proceedings entry is available. */
const BIBTEX = `@InProceedings{Ahmed_2026_BMVC,
    author    = {Ahmed, Iftekhar and Sami, Aftar Ahmad and Absar, Shakib and Sakib, Shadman and Rahman, Rashedur and Bhuiyan, Siam Tahsin and Islam, Ashraful and Alam, Saadia Binte},
    title     = {TFFM+: Topology-Reliable Retinal Artery--Vein Segmentation via Spatially-Aware Differentiable Graph Pruning},
    booktitle = {British Machine Vision Conference (BMVC)},
    month     = {November},
    year      = {2026}
}`;

function BibBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-neutral-700">{label}</div>
      <div className="relative bg-neutral-50 border border-neutral-200 rounded-lg p-6 font-mono">
        <button
          onClick={handleCopy}
          className={`absolute -top-3 -right-3 flex items-center justify-center p-2 rounded-lg transition-all duration-200 text-white shadow-md hover:shadow-lg border border-neutral-300 z-10 ${
            copied ? "bg-green-500" : "bg-blue-600 hover:cursor-pointer"
          }`}
          title="Copy BibTeX to clipboard"
          aria-label={`Copy ${label} BibTeX citation`}
        >
          {copied ? <FaCheck className="w-5 h-5" /> : <FaClipboard className="w-5 h-5" />}
        </button>
        <pre className="text-xs md:text-sm text-neutral-800 overflow-x-auto pt-1 pr-2">
          {text}
        </pre>
      </div>
    </div>
  );
}

export default function CitationSection() {
  return (
    <Section id="citation" title="Citation" tinted>
      <div className="mx-auto lg:w-4/5">
        <BibBlock label="TFFM+ (BMVC 2026)" text={BIBTEX} />
      </div>
    </Section>
  );
}
