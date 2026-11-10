import type { ReactNode } from "react";
import { FaFilePdf, FaGithub, FaQuoteRight } from "react-icons/fa";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { SiArxiv } from "react-icons/si";
import { FiArrowUpRight } from "react-icons/fi";

type Author = {
  name: string;
  affiliation: number;
  profile?: string;
  mark?: string;
};

const TITLE =
  "TFFM+: Topology-Reliable Retinal Artery–Vein Segmentation via Spatially-Aware Differentiable Graph Pruning";

const VENUE = "BMVC 2026";
const VENUE_DETAIL = "British Machine Vision Conference · Lancaster, UK · Nov 23–26";

const AUTHORS: Author[] = [
  { name: "Iftekhar Ahmed", affiliation: 1, profile: "https://iftekhar.vercel.app/" },
  {
    name: "Aftar Ahmad Sami",
    affiliation: 2,
    mark: "†",
    profile: "https://www.linkedin.com/in/aftar-ahmad-sami/",
  },
  { name: "Shakib Absar", affiliation: 1, profile: "https://shakibabsar.vercel.app/" },
  {
    name: "Shadman Sakib",
    affiliation: 3,
    profile: "https://www.linkedin.com/in/shadman-sakib15/",
  },
  { name: "Rashedur Rahman", affiliation: 1 },
  { name: "Siam Tahsin Bhuiyan", affiliation: 1 },
  { name: "Ashraful Islam", affiliation: 1 },
  { name: "Saadia Binte Alam", affiliation: 1 },
];

const AFFILIATIONS = [
  "Center for Computational & Data Sciences (CCDS), Independent University, Bangladesh",
  "University of Houston",
  "University of Maryland, Baltimore County",
];

/*
 * Fill these in when they are available. Buttons with an empty URL are hidden.
 */
const LINKS = {
  paper: "",
  arxiv: "",
  code: "",
  presentation: "",
};

const TFFM_SITE = "https://tffm-module.github.io/";

function PillLink({
  href,
  icon,
  label,
  external = true,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-900"
    >
      {icon} {label}
    </a>
  );
}

export default function HeadingSection() {
  const hasMissingLinks = Object.values(LINKS).some((url) => !url);

  return (
    <header className="pt-16 md:pt-20 pb-12 bg-neutral-100 border-b border-neutral-200">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h1 className="mb-4 text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-neutral-900">
          {TITLE}
        </h1>

        <p className="mt-4 text-xl font-medium text-neutral-700">{VENUE}</p>
        <p className="mt-1 text-sm text-neutral-500">{VENUE_DETAIL}</p>

        {/* Authors */}
        <div className="mt-6 mb-3 text-base text-blue-600">
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            {AUTHORS.map((author, idx) => (
              <span key={author.name} className="whitespace-nowrap">
                {author.profile ? (
                  <a
                    href={author.profile}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {author.name}
                  </a>
                ) : (
                  <span className="text-neutral-800">{author.name}</span>
                )}
                <sup className="ml-0.5 text-xs text-neutral-600">
                  {author.affiliation}
                  {author.mark}
                </sup>
                {idx < AUTHORS.length - 1 && ","}
              </span>
            ))}
          </div>
        </div>

        {/* Affiliations */}
        <div className="mb-2 text-sm text-neutral-600 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {AFFILIATIONS.map((aff, idx) => (
            <span key={aff}>
              <sup>{idx + 1}</sup> {aff}
            </span>
          ))}
        </div>
        <p className="mb-8 text-xs text-neutral-500">
          † This work is unrelated to the author's position at the University of Houston.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {LINKS.paper && <PillLink href={LINKS.paper} icon={<FaFilePdf />} label="Paper" />}
          {LINKS.arxiv && <PillLink href={LINKS.arxiv} icon={<SiArxiv />} label="arXiv" />}
          <PillLink href="#citation" icon={<FaQuoteRight />} label="BibTeX" external={false} />
          {LINKS.code && <PillLink href={LINKS.code} icon={<FaGithub />} label="Code" />}
          {LINKS.presentation && (
            <PillLink
              href={LINKS.presentation}
              icon={<HiOutlinePresentationChartLine />}
              label="Presentation"
            />
          )}
          <a
            href={TFFM_SITE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-800 px-5 py-2 text-sm font-medium text-neutral-800 hover:bg-white"
          >
            Original TFFM (WACV-W 2026) <FiArrowUpRight />
          </a>
        </div>

        {hasMissingLinks && (
          <p className="mt-5 text-sm italic text-rose-700">
            Paper, code and presentation links will be added soon.
          </p>
        )}
      </div>
    </header>
  );
}
