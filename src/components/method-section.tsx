import architecture from "../assets/figures/architecture.webp";
import { Figure, Section, TableShell, th } from "./ui";

const CHANGES = [
  {
    aspect: "Adjacency",
    tffm: "Fixed-degree top-k nearest neighbours",
    plus: "Learnable threshold + soft adjacency, applied as a log-space bias in graph attention",
  },
  {
    aspect: "Graph construction",
    tffm: "Feature similarity only (geometry-blind)",
    plus: "Features + weighted 2D coordinates",
  },
  {
    aspect: "Where it runs",
    tffm: "Every decoder level (pools high-res maps)",
    plus: "Bottleneck only (level 4)",
  },
  {
    aspect: "Fusion",
    tffm: "Multiplicative / convex blend",
    plus: "Additive gated residual",
  },
];

export default function MethodSection() {
  return (
    <Section id="method" title="Method">
      <p className="mx-auto lg:w-4/5 leading-relaxed md:text-justify">
        TFFM+ sits at the bottleneck of a U-Net++ decoder with an EfficientNet-B0 encoder (7.55M
        parameters in total). Bottleneck features are mapped to a spatially aware latent graph,
        refined by differentiable pruning and two graph attention layers, and returned to the
        convolutional stream through additive gated residual fusion. Training uses a Tversky +
        soft clDice loss.
      </p>

      <Figure
        src={architecture}
        alt="TFFM+ block diagram: channel compression, dual pooling, topological reasoning with spatial-aware embedding, graph build, dynamic differentiable pruning and two GAT layers, multi-scale fusion, dual attention, and additive gated residual fusion"
        caption="Overview of TFFM+."
        className="mt-8"
      />

      <div className="mt-12">
        <h3 className="text-xl md:text-2xl font-bold text-neutral-800 mb-4 text-center">
          What changes from{" "}
          <a
            href="https://tffm-module.github.io/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            TFFM
          </a>
        </h3>
        <TableShell>
          <thead className="bg-neutral-800 text-white">
            <tr>
              <th className={`${th} text-left`}>Aspect</th>
              <th className={`${th} text-left`}>TFFM (WACV-W 2026)</th>
              <th className={`${th} text-left`}>TFFM+ (this work)</th>
            </tr>
          </thead>
          <tbody>
            {CHANGES.map((r) => (
              <tr key={r.aspect} className="border-b border-neutral-200 last:border-0 bg-white">
                <td className="px-4 py-3 font-semibold text-neutral-800 whitespace-nowrap">
                  {r.aspect}
                </td>
                <td className="px-4 py-3 text-neutral-600">{r.tffm}</td>
                <td className="px-4 py-3 text-neutral-800 bg-green-50">{r.plus}</td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </div>
    </Section>
  );
}
