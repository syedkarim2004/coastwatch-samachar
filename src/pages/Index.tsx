import Header from "@/components/Header";
import CoastalMap from "@/components/CoastalMap";
import LiveDashboard from "@/components/LiveDashboard";
import RecentReports from "@/components/RecentReports";
import EmergencyTicker from "@/components/EmergencyTicker";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, MapPin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <EmergencyTicker />
      
      <main>
        {/* Full-width Coastal Map at top */}
        <section className="w-full">
          <CoastalMap height="500px" />
        </section>

        {/* Live Dashboard */}
        <LiveDashboard />

        {/* Recent Reports */}
        <RecentReports />

        {/* Trust Badges */}
        <section className="py-8 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-muted-foreground">Powered by</h3>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <Badge variant="outline" className="flex items-center space-x-2 px-4 py-2">
                <Shield className="h-4 w-4" />
                <span>INCOIS - Indian National Centre for Ocean Information Services</span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-2 px-4 py-2">
                <Users className="h-4 w-4" />
                <span>Citizen Reports Network</span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-2 px-4 py-2">
                <MapPin className="h-4 w-4" />
                <span>Partner Agencies</span>
              </Badge>
            </div>
          </div>
        </section>

        {/* Advisory Ticker */}
        <section className="py-4 bg-blue-50 border-t border-b">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-sm text-blue-800 font-medium">
                🌊 ADVISORY: High tide expected today at 14:30 IST. Coastal areas may experience minor flooding. Stay vigilant and avoid low-lying areas.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/live-map" className="hover:text-primary">Live Map</a></li>
                <li><a href="/report-hazard" className="hover:text-primary">Report Hazard</a></li>
                <li><a href="/incidents" className="hover:text-primary">Incidents</a></li>
                <li><a href="/analytics" className="hover:text-primary">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/hazards" className="hover:text-primary">Hazard Information</a></li>
                <li><a href="/datasets" className="hover:text-primary">Data Catalog</a></li>
                <li><a href="/safety-guides" className="hover:text-primary">Safety Guides</a></li>
                <li><a href="/api-docs" className="hover:text-primary">API Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Emergency: 1070</li>
                <li>Coast Guard: 1554</li>
                <li>Email: support@coastalmonitor.gov.in</li>
                <li><a href="/contact" className="hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="/accessibility" className="hover:text-primary">Accessibility</a></li>
                <li><a href="/disclaimer" className="hover:text-primary">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Government of India - Coastal Hazard Monitor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
