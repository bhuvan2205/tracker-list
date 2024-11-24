import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-foreground py-20 text-white">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Track Your Daily Progress</h1>
        <p className="text-xl mb-8">
          Stay organized, boost productivity, and achieve your goals.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-primary hover:bg-gray-100"
          variant={"default"}
        >
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </div>
    </section>
  );
}

export default Hero;
