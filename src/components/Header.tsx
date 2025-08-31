import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield, Globe, Phone, Settings } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="h-10 w-10 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">
                Coastal Hazard Monitor
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">
                  Government of India • INCOIS
                </span>
                <Badge variant="outline" className="text-xs px-1 py-0">
                  LIVE
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Globe className="h-4 w-4" />
            <select className="bg-transparent border-none text-sm focus:outline-none">
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
              <option value="ml">മലയാളം</option>
            </select>
          </div>
          
          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
            <Phone className="h-4 w-4 mr-2" />
            Emergency: 1077
          </Button>
          
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-6 mt-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                <Button variant="outline" size="sm" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency: 1077
                </Button>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Language</h3>
                <select className="w-full p-2 border rounded-md">
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="ta">தமிழ்</option>
                  <option value="te">తెలుగు</option>
                  <option value="ml">മলയാളം</option>
                </select>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;