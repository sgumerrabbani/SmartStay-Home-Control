import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Menu, Settings, Home, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface DashboardHeaderProps {
  onSettingsClick?: () => void;
}

export default function DashboardHeader({ onSettingsClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border" data-testid="dashboard-header">
      <div className="max-w-[980px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" data-testid="button-menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="text-primary">SmartStay</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 space-y-2">
                <Link href="/">
                  <Button variant="ghost" className="w-full justify-start gap-3" data-testid="link-menu-home">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="ghost" className="w-full justify-start gap-3 bg-primary/5" data-testid="link-menu-dashboard">
                    <Home className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link href="/" data-testid="link-dashboard-logo">
            <span className="text-xl font-bold text-primary cursor-pointer">SmartStay</span>
          </Link>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Open settings"
          onClick={onSettingsClick}
          data-testid="button-settings"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
