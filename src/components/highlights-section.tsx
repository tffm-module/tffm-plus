import qualitative from "../assets/figures/qualitative.webp";
import { Figure } from "./ui";

export default function HighlightsSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Figure
          src={qualitative}
          alt="TFFM vs TFFM+ vessel predictions on a fundus image. Vein crops on the left, artery crops on the right."
          caption="TFFM+ reconnects broken vein branches (left) and recovers continuous artery segments where TFFM fragments (right)."
        />
      </div>
    </section>
  );
}
