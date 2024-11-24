import FeatureCard from "../FeatureCard";
import { CheckCircle, List, TrendingUp } from "lucide-react";

function FeatureSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Tracker App?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<List className="w-12 h-12 mb-4 text-primary" />}
            title="Easy Task Management"
            description="Create, organize, and prioritize your tasks with ease."
          />
          <FeatureCard
            icon={<CheckCircle className="w-12 h-12 mb-4 text-primary" />}
            title="Track Daily Activities"
            description="Monitor your progress and build consistent habits."
          />
          <FeatureCard
            icon={<TrendingUp className="w-12 h-12 mb-4 text-primary" />}
            title="Visualize Your Progress"
            description="See your achievements and growth over time."
          />
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
