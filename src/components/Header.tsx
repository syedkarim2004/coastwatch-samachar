import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MapPin, AlertTriangle, Users, BarChart3 } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-ocean flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-white/20 border-2 border-white/60"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Coastal Hazard Monitor</h1>
              <p className="text-xs text-muted-foreground">Government of India Initiative</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Button key={item.name} variant="ghost" className="gap-2">
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button variant="government" size="sm">
              Register
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Button key={item.name} variant="ghost" className="justify-start gap-3" onClick={() => setIsOpen(false)}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Button>
                ))}
                <div className="border-t pt-4 mt-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                  <Button variant="government" className="w-full">
                    Register
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;