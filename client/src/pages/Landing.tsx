import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import ClientLogos from "@/components/landing/ClientLogos";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-landing">
      <Navbar />
      <Hero />
      <Features />
      <ClientLogos />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
