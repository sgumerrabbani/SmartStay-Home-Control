import { Home, Zap, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Home,
    title: "Room-based Control",
    description: "Manage lights, climate, and appliances in every room with precision. Individual settings for each space ensure perfect comfort throughout your home."
  },
  {
    icon: Zap,
    title: "Smart Scenes",
    description: "One tap activates your perfect environment. Choose Home, Away, or Night mode to instantly adjust all connected devices to match your routine."
  },
  {
    icon: Calendar,
    title: "Energy Friendly Scheduling",
    description: "Automate your daily routine and reduce energy costs. Set schedules that adapt to your lifestyle while maximizing efficiency and savings."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 lg:py-20 bg-background" data-testid="section-features">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[120px]">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-features-title">
            Everything You Need, Simplified
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto text-base lg:text-lg" data-testid="text-features-subtitle">
            Experience seamless control with features designed for real life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-card border border-card-border hover-elevate transition-all duration-200"
                style={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}
                data-testid={`card-feature-${index}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-3" data-testid={`text-feature-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm lg:text-base" data-testid={`text-feature-description-${index}`}>
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
