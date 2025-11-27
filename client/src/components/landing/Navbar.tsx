import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    setLocation("/dashboard");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full h-20 bg-white dark:bg-card border-b border-border sticky top-0 z-50" data-testid="navbar">
      <div className="max-w-[1440px] mx-auto h-full px-4 md:px-8 lg:px-[120px] flex items-center justify-between gap-4">
        <Link href="/" data-testid="link-home-logo">
          <span className="text-xl md:text-2xl font-bold text-primary cursor-pointer">
            SmartStay
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-foreground hover:text-primary transition-colors text-sm lg:text-base"
            data-testid="link-nav-home"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            className="text-foreground hover:text-primary transition-colors text-sm lg:text-base"
            data-testid="link-nav-features"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')} 
            className="text-foreground hover:text-primary transition-colors text-sm lg:text-base"
            data-testid="link-nav-testimonials"
          >
            Testimonials
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-foreground hover:text-primary transition-colors text-sm lg:text-base"
            data-testid="link-nav-contact"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={handleGetStarted}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            data-testid="button-get-started"
          >
            Get Started
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-card border-b border-border shadow-lg z-40">
          <div className="flex flex-col p-4 gap-3">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-left py-2 text-foreground hover:text-primary transition-colors"
              data-testid="link-mobile-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-left py-2 text-foreground hover:text-primary transition-colors"
              data-testid="link-mobile-features"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-left py-2 text-foreground hover:text-primary transition-colors"
              data-testid="link-mobile-testimonials"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-left py-2 text-foreground hover:text-primary transition-colors"
              data-testid="link-mobile-contact"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
