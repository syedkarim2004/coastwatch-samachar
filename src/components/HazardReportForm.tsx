import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, AlertTriangle, Phone, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Map from "./Map";

const HazardReportForm = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null);

  const hazardTypes = [
    { value: "tsunami", label: "Tsunami Warning", severity: "high" },
    { value: "cyclone", label: "Cyclone/Storm", severity: "high" },
    { value: "flooding", label: "Coastal Flooding", severity: "medium" },
    { value: "erosion", label: "Beach Erosion", severity: "low" },
    { value: "pollution", label: "Marine Pollution", severity: "medium" },
    { value: "debris", label: "Debris/Obstruction", severity: "low" },
    { value: "other", label: "Other Hazard", severity: "medium" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-accent text-accent-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          toast({
            title: "Location captured",
            description: "Your current location has been added to the report.",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Report submitted successfully",
      description: "Your hazard report has been received and will be reviewed by officials.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <section id="report" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Report a Hazard</h2>
            <p className="text-muted-foreground">
              Help protect your community by reporting coastal hazards and emergency situations
            </p>
          </div>

          <Card className="shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Hazard Report Form
              </CardTitle>
              <CardDescription>
                All fields marked with * are required. Reports are reviewed by trained officials.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Reporter Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="Enter your full name" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                    </div>
                  </div>
                </div>

                {/* Hazard Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Hazard Details</h3>
                  
                  <div>
                    <Label htmlFor="hazard-type">Hazard Type *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hazard type" />
                      </SelectTrigger>
                      <SelectContent>
                        {hazardTypes.map((hazard) => (
                          <SelectItem key={hazard.value} value={hazard.value}>
                            <div className="flex items-center gap-2">
                              {hazard.label}
                              <Badge className={getSeverityColor(hazard.severity)}>
                                {hazard.severity}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe the hazard situation in detail..."
                      className="min-h-[100px]"
                      required 
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                          id="latitude"
                          type="number"
                          step="any"
                          placeholder="e.g., 13.0827"
                          className="mt-1"
                          value={selectedLocation?.lat || ''}
                          readOnly
                        />
                      </div>
                      <div>
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                          id="longitude"
                          type="number"
                          step="any"
                          placeholder="e.g., 80.2707"
                          className="mt-1"
                          value={selectedLocation?.lng || ''}
                          readOnly
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Select Location on Map</Label>
                      <div className="mt-2">
                        <Map 
                          onLocationSelect={setSelectedLocation}
                          height="300px"
                        />
                      </div>
                      {selectedLocation && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Location selected: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Nearest Landmark/Address *</Label>
                    <Input id="address" placeholder="e.g., Marine Drive, Mumbai" required />
                  </div>
                </div>

                {/* Media Upload */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Evidence (Optional)
                  </h3>
                  
                  <div>
                    <Label htmlFor="media">Upload Photos/Videos</Label>
                    <Input id="media" type="file" multiple accept="image/*,video/*" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum 5 files, 10MB each. Supported: JPG, PNG, MP4
                    </p>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-destructive mb-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-semibold">Emergency Contacts</span>
                  </div>
                  <p className="text-sm text-destructive/80">
                    For immediate emergencies: Emergency: 112 | Coast Guard: 1554 | NDRF: 9711077372
                  </p>
                </div>

                <Button 
                  type="submit" 
                  variant="government" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting Report..." : "Submit Hazard Report"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HazardReportForm;