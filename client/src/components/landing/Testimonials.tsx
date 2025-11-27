import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Makes my morning routine automatic. I wake up to a warm house, lights on, and coffee brewing.",
    author: "Sarah Chen",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
  },
  {
    quote: "The Away mode saved my energy bill by 30%. It knows when I leave and adjusts everything automatically.",
    author: "Michael Torres",
    role: "Tech Enthusiast",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  },
  {
    quote: "So easy to use and visually clean. Even my parents figured it out without any help.",
    author: "Emily Rodriguez",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 lg:py-20 bg-muted/30" data-testid="section-testimonials">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[120px]">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-testimonials-title">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg" data-testid="text-testimonials-subtitle">
            Real experiences from real people
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 bg-card border border-card-border hover-elevate transition-all duration-200"
              data-testid={`card-testimonial-${index}`}
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground mb-6 text-sm lg:text-base leading-relaxed" data-testid={`text-testimonial-quote-${index}`}>
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/10">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                    data-testid={`img-testimonial-${index}`}
                  />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm lg:text-base" data-testid={`text-testimonial-author-${index}`}>
                    {testimonial.author}
                  </div>
                  <div className="text-muted-foreground text-xs lg:text-sm" data-testid={`text-testimonial-role-${index}`}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
