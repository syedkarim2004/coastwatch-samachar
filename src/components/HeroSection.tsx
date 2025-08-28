import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Shield, Users, Zap } from "lucide-react";

const HeroSection = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: "Real-time Alerts",
      description: "Instant notifications for coastal hazards and emergency situations"
    },
    {
      icon: Shield,
      title: "Community Safety",
      description: "Collaborative monitoring to protect coastal communities"
    },
    {
      icon: Users,
      title: "Citizen Reports",
      description: "Empower citizens to report hazards and share critical information"
    },
    {
      icon: Zap,
      title: "Quick Response",
      description: "Rapid data processing and emergency response coordination"
    }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-background via-blue-50/30 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(210_90%_35%/0.15)_1px,_transparent_0)] [background-size:50px_50px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Content */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Government of India Initiative
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Protecting India's
              <span className="bg-gradient-ocean bg-clip-text text-transparent"> Coastal Communities</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Advanced hazard monitoring and citizen reporting system for tsunamis, cyclones, and marine emergencies across India's 7,500 km coastline.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="ocean" className="text-lg">
                Report Hazard Now
              </Button>
              <Button size="xl" variant="outline" className="text-lg">
                View Live Map
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center border-0 shadow-card-custom hover:shadow-ocean transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-alert text-white py-3 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium">
            <span className="animate-pulse">🚨</span> Emergency Hotline: 1070 | Coast Guard: 1554 | NDRF: 9711077372
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;