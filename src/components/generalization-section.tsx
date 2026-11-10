import { useMemo, useState } from "react";
import bettiFigure from "../assets/figures/betti-zeroshot.webp";
import { Figure, Section, TableShell, td, th } from "./ui";

interface Row {
  name: string;
  dice: number;
  skelF1: number;
  clDice: number;
  betti: number;
  bettiTffm: number;
}

type SortKey = keyof Row;
type SortDirection = "asc" | "desc";

/* Table 3 (TFFM+) and Figure 4 (baseline TFFM Betti-0 error) */
const ZERO_SHOT: Row[] = [
  { name: "CHASEDB1", dice: 81.8, skelF1: 86.37, clDice: 70.73, betti: 27.82, bettiTffm: 50.5 },
  { name: "DRIVE", dice: 80.86, skelF1: 86.72, clDice: 68.93, betti: 20.05, bettiTffm: 24.2 },
  { name: "HRF", dice: 80.37, skelF1: 82.97, clDice: 73.78, betti: 26.42, bettiTffm: 33.0 },
  { name: "RETA", dice: 82.29, skelF1: 84.25, clDice: 73.72, betti: 23.06, bettiTffm: 34.57 },
  { name: "STARE", dice: 82.1, skelF1: 86.81, clDice: 72.54, betti: 27.35, bettiTffm: 41.55 },
];

const HEADERS: { key: SortKey; label: string; numeric: boolean }[] = [
  { key: "name", label: "Dataset", numeric: false },
  { key: "dice", label: "Dice (%)", numeric: true },
  { key: "skelF1", label: "Skel-F1 (%)", numeric: true },
  { key: "clDice", label: "clDice (%)", numeric: true },
  { key: "betti", label: "Betti-0 Err (TFFM+)", numeric: true },
  { key: "bettiTffm", label: "Betti-0 Err (TFFM)", numeric: true },
];

const fmt = (n: number) => n.toFixed(2);

export default function GeneralizationSection() {
  const [sort, setSort] = useState<{ key: SortKey | null; dir: SortDirection }>({
    key: null,
    dir: "asc",
  });

  const rows = useMemo(() => {
    if (!sort.key) return ZERO_SHOT;
    const key = sort.key;
    return [...ZERO_SHOT].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [sort]);

  const handleSort = (key: SortKey) =>
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));

  return (
    <Section
      id="generalization"
      title="Cross-Dataset Generalisation"
      subtitle="Trained on Fundus-AVSeg, applied to five external datasets without fine-tuning."
    >
      <TableShell caption="Zero-shot generalisation of TFFM+ across five external retinal datasets, with the baseline TFFM Betti-0 error for the same datasets. Click a column header to sort.">
        <thead className="bg-neutral-800 text-white">
          <tr>
            {HEADERS.map((h) => (
              <th
                key={h.key}
                onClick={() => handleSort(h.key)}
                className={`${th} ${h.numeric ? "text-center" : "text-left"} cursor-pointer select-none hover:bg-neutral-900 transition`}
                aria-sort={
                  sort.key === h.key
                    ? sort.dir === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                {h.label}
                {sort.key === h.key && (
                  <span className="ml-1">{sort.dir === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-neutral-200 bg-white hover:bg-neutral-50">
              <td className="px-4 py-3 font-medium text-neutral-800">{r.name}</td>
              <td className={td}>{fmt(r.dice)}</td>
              <td className={td}>{fmt(r.skelF1)}</td>
              <td className={td}>{fmt(r.clDice)}</td>
              <td className={`${td} font-bold bg-green-50`}>{fmt(r.betti)}</td>
              <td className={`${td} text-neutral-500`}>{fmt(r.bettiTffm)}</td>
            </tr>
          ))}
          <tr className="bg-neutral-100 font-semibold">
            <td className="px-4 py-3 text-neutral-800">Mean</td>
            <td className={td} colSpan={3}></td>
            <td className={`${td} bg-green-100`}>24.94</td>
            <td className={`${td} text-neutral-600`}>36.76</td>
          </tr>
        </tbody>
      </TableShell>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        <Figure
          src={bettiFigure}
          alt="Bar chart of Betti-0 error for TFFM and TFFM+ on CHASEDB1, DRIVE, HRF, RETA and STARE"
          caption="Zero-shot Betti-0 error across external datasets (lower is better)."
          className="lg:col-span-3"
        />
        <p className="lg:col-span-2 leading-relaxed text-neutral-700">
          Dice stays above 80% and Skel-F1 above 82% on every benchmark. Mean Betti-0 error drops
          from <strong>36.76 to 24.94</strong>, with the largest margins on CHASEDB1 and STARE:
          the structural prior transfers across cameras and sites even when appearance does not.
        </p>
      </div>
    </Section>
  );
}
