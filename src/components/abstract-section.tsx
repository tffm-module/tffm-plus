import { Section } from "./ui";

const ABSTRACT = [
  `Retinal vascular measurements depend on the shape and connectivity of segmented artery and vein networks. Yet a segmentation can achieve high pixel-level overlap while missing thin vessels or breaking important branches. Such breaks can affect measurements of tortuosity, vessel width, and vascular branching geometry.`,
  `We present TFFM+, an extension of the Topological Feature Fusion Module (TFFM) designed to improve structural consistency in retinal artery–vein segmentation. TFFM+ replaces fixed-degree nearest-neighbour connections with a learnable, softly weighted graph, uses spatial coordinates when constructing connections, moves graph reasoning to the network bottleneck, and adds graph features through gated residual fusion.`,
  `On Fundus-AVSeg, TFFM+ achieves Dice scores of 86.09% for arteries and 87.82% for veins, comparable to TFFM. Its Betti-0 error decreases by 5.7% for arteries and 20.0% for veins, indicating better agreement in connected-component counts. These gains come with lower recall and higher HD95, so they do not represent improvement across all metrics. In zero-shot tests on five external datasets, mean Betti-0 error falls from 36.76 to 24.94. The results suggest that TFFM+ can improve some aspects of vessel connectivity under dataset shift, while highlighting the need to assess structural accuracy alongside Dice when segmentation masks are used to study retinal vascular biomarkers.`,
];

export default function AbstractSection() {
  return (
    <Section id="abstract" title="Abstract" tinted>
      <div className="mx-auto lg:w-4/5 space-y-6">
        {ABSTRACT.map((paragraph, index) => (
          <p
            key={index}
            className={`leading-relaxed md:text-justify ${
              index === 2
                ? "italic bg-green-50 p-6 rounded-md border-l-4 border-green-500"
                : ""
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
