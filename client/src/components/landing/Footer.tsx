import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Mail } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to our newsletter",
        });
        setEmail("");
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast({
          title: "Subscription failed",
          description: errorData.error || "Please try again later",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Unable to subscribe. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0F1724] text-white py-12 lg:py-16" data-testid="footer">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 mb-10 lg:mb-12">
          <div>
            <Link href="/">
              <span className="text-xl lg:text-2xl font-bold text-primary cursor-pointer" data-testid="text-footer-logo">
                SmartStay
              </span>
            </Link>
            <p className="text-gray-400 mt-4 text-sm lg:text-base" data-testid="text-footer-tagline">
              Intelligent home automation for modern living. Control every aspect of your home from anywhere.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-base lg:text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base"
                  data-testid="link-footer-home"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base"
                  data-testid="link-footer-features"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base"
                  data-testid="link-footer-testimonials"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <Link href="/dashboard">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm lg:text-base" data-testid="link-footer-dashboard">
                    Dashboard
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-base lg:text-lg">Stay Updated</h4>
            <p className="text-gray-400 mb-4 text-sm lg:text-base" data-testid="text-newsletter-description">
              Subscribe to our newsletter for tips and updates
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 rounded-lg bg-[#1a2332] border-[#2a3442] text-white placeholder:text-gray-500 focus:border-primary"
                  data-testid="input-newsletter-email"
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-newsletter-subscribe"
              >
                {isSubmitting ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-[#2a3442] text-center text-gray-400 text-xs lg:text-sm" data-testid="text-footer-copyright">
          <p>© 2025 SmartStay. All rights reserved. Privacy Policy • Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
