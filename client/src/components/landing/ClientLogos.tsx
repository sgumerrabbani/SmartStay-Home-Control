import { Building2, Leaf, Sun, Cpu } from "lucide-react";

const clients = [
  { name: "HomeTech", icon: Building2 },
  { name: "GreenSwitch", icon: Leaf },
  { name: "BrightNest", icon: Sun },
  { name: "Smartify", icon: Cpu }
];

export default function ClientLogos() {
  return (
    <section className="py-8 lg:py-10 bg-muted/50" data-testid="section-client-logos">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[120px] w-full">
        <p className="text-center text-sm text-muted-foreground mb-6">
          Trusted by leading smart home brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {clients.map((client, index) => {
            const Icon = client.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground opacity-70 hover:opacity-100 transition-opacity"
                data-testid={`logo-client-${index}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm lg:text-base">{client.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
