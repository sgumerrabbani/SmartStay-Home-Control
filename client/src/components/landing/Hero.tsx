import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useLocation } from "wouter";

export default function Hero() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    setLocation("/dashboard");
  };

  const handleTryDemo = () => {
    setLocation("/dashboard");
  };

  return (
    <section 
      id="home"
      className="min-h-[500px] lg:min-h-[640px] relative overflow-hidden py-12 lg:py-0"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)'
      }}
      data-testid="section-hero"
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 50%, hsl(var(--primary) / 0.08) 0%, transparent 50%)',
          mixBlendMode: 'overlay'
        }}
      />
      
      <div className="max-w-[1440px] mx-auto h-full px-4 md:px-8 lg:px-[120px] relative">
        <div className="h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-6 lg:min-h-[640px]">
          <div className="flex-1 lg:pr-12 text-center lg:text-left pt-8 lg:pt-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 lg:mb-6 leading-tight" data-testid="text-hero-title">
              Control Your Home. Effortlessly.
            </h1>
            <p className="mb-6 lg:mb-8 text-muted-foreground max-w-[480px] mx-auto lg:mx-0 text-base lg:text-lg" data-testid="text-hero-description">
              Transform your living space into an intelligent environment. Manage lighting, temperature, security, and more—all from a single, intuitive dashboard that adapts to your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button 
                onClick={handleGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2"
                data-testid="button-hero-get-started"
              >
                Get Started
              </Button>
              <Button 
                variant="outline"
                onClick={handleTryDemo}
                className="px-6 py-2"
                data-testid="button-hero-try-demo"
              >
                Try Demo
              </Button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
                alt="Smart home dashboard interface"
                className="w-full h-auto rounded-2xl shadow-2xl"
                data-testid="img-hero"
              />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 lg:w-24 lg:h-24 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 lg:w-20 lg:h-20 bg-primary/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
