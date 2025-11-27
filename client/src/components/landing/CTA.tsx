import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const [, setLocation] = useLocation();

  const handleStartNow = () => {
    setLocation("/dashboard");
  };

  return (
    <section 
      id="contact"
      className="py-16 lg:py-20 flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(207 77% 40%) 100%)'
      }}
      data-testid="section-cta"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[120px] w-full text-center relative z-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6" data-testid="text-cta-title">
          Take Control of Your Home Today
        </h2>
        <p className="text-white/80 mb-6 lg:mb-8 max-w-md mx-auto text-base lg:text-lg" data-testid="text-cta-subtitle">
          Join thousands of homeowners who have simplified their lives with SmartStay
        </p>
        <Button 
          onClick={handleStartNow}
          className="bg-white text-primary hover:bg-white/90 px-6 py-2 gap-2"
          data-testid="button-cta-start-now"
        >
          Start Now
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
