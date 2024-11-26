import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
}
