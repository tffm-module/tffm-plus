import radar from "../assets/figures/radar.webp";
import { Figure, Section, TableShell, td, th } from "./ui";

type Cell = { v: string; best?: boolean };

interface Row {
  vessel: string;
  method: string;
  ours?: boolean;
  cells: Cell[];
}

/* Table 1: region-level metrics on Fundus-AVSeg (bold = better of the two) */
const REGION_HEAD = ["Dice (%) ↑", "HD95 ↓", "Precision (%) ↑", "Recall (%) ↑"];
const REGION_ROWS: Row[] = [
  {
    vessel: "Artery",
    method: "TFFM",
    cells: [{ v: "85.75" }, { v: "21.22", best: true }, { v: "83.97" }, { v: "87.74", best: true }],
  },
  {
    vessel: "",
    method: "TFFM+ (Ours)",
    ours: true,
    cells: [{ v: "86.09", best: true }, { v: "22.22" }, { v: "87.03", best: true }, { v: "85.33" }],
  },
  {
    vessel: "Vein",
    method: "TFFM",
    cells: [{ v: "87.63" }, { v: "14.59", best: true }, { v: "89.01" }, { v: "86.53", best: true }],
  },
  {
    vessel: "",
    method: "TFFM+ (Ours)",
    ours: true,
    cells: [{ v: "87.82", best: true }, { v: "16.82" }, { v: "91.89", best: true }, { v: "84.30" }],
  },
];

/* Table 2: connectivity and topology metrics */
const STRUCT_HEAD = ["Skel-F1 (%) ↑", "clDice (%) ↑", "Betti-0 Err ↓"];
const STRUCT_ROWS: Row[] = [
  {
    vessel: "Artery",
    method: "TFFM",
    cells: [{ v: "87.63", best: true }, { v: "79.07" }, { v: "21.10" }],
  },
  {
    vessel: "",
    method: "TFFM+ (Ours)",
    ours: true,
    cells: [{ v: "86.99" }, { v: "80.18", best: true }, { v: "19.90", best: true }],
  },
  {
    vessel: "Vein",
    method: "TFFM",
    cells: [{ v: "88.48", best: true }, { v: "81.46" }, { v: "24.00" }],
  },
  {
    vessel: "",
    method: "TFFM+ (Ours)",
    ours: true,
    cells: [{ v: "88.04" }, { v: "81.90", best: true }, { v: "19.20", best: true }],
  },
];

function ResultsTable({
  head,
  rows,
  caption,
}: {
  head: string[];
  rows: Row[];
  caption: string;
}) {
  return (
    <TableShell caption={caption}>
      <thead className="bg-neutral-800 text-white">
        <tr>
          <th className={`${th} text-left`}>Vessel</th>
          <th className={`${th} text-left`}>Method</th>
          {head.map((h) => (
            <th key={h} className={`${th} text-center`}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr
            key={i}
            className={`${r.ours ? "bg-green-50 border-b-2 border-neutral-300" : "bg-white border-b border-neutral-200"} last:border-0`}
          >
            <td className="px-4 py-3 font-semibold text-neutral-800">{r.vessel}</td>
            <td className="px-4 py-3 whitespace-nowrap text-neutral-800">{r.method}</td>
            {r.cells.map((c, j) => (
              <td key={j} className={`${td} ${c.best ? "font-bold" : ""}`}>
                {c.v}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

export default function ResultsSection() {
  return (
    <Section
      id="results"
      title="Results"
      subtitle="Fundus-AVSeg test set (100 images, same protocol as TFFM)"
      tinted
    >
      <div className="space-y-10">
        <ResultsTable
          head={REGION_HEAD}
          rows={REGION_ROWS}
          caption="Region-level metrics. Dice is essentially unchanged; TFFM+ shifts towards precision at the cost of recall and boundary distance."
        />
        <ResultsTable
          head={STRUCT_HEAD}
          rows={STRUCT_ROWS}
          caption="Connectivity and topology metrics. A small reduction in Skeleton-F1 is exchanged for lower fragmentation (Betti-0 error ↓ 20.0% vein, 5.7% artery) and higher clDice."
        />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <Figure
            src={radar}
            alt="Radar chart of skeleton recall, skeleton precision, junction recall and junction precision for artery and vein"
            caption="Skeleton and junction metrics for artery and vein (TFFM+)."
            className="md:col-span-3 max-w-md mx-auto w-full"
          />
          <p className="md:col-span-2 leading-relaxed text-neutral-700">
            Junction recall improves over TFFM by <strong>+11 pp for arteries</strong> (44% → 55%)
            and <strong>+8 pp for veins</strong> (52% → 60%). Branching measurements are computed
            at detected bifurcations, so junctions that are never detected cannot be measured at
            all.
          </p>
        </div>
      </div>
    </Section>
  );
}
