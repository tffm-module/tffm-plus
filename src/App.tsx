import HeadingSection from "./components/heading-section";
import HighlightsSection from "./components/highlights-section";
import AbstractSection from "./components/abstract-section";
import MethodSection from "./components/method-section";
import ResultsSection from "./components/results-section";
import GeneralizationSection from "./components/generalization-section";
import CitationSection from "./components/citation-section";
import Footer from "./components/footer";

export default function App() {
  return (
    <div className="font-lb text-neutral-800">
      <HeadingSection />
      <main>
        <HighlightsSection />
        <AbstractSection />
        <MethodSection />
        <ResultsSection />
        <GeneralizationSection />
        <CitationSection />
      </main>
      <Footer />
    </div>
  );
}
