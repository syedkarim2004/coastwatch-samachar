import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Map as MapIcon, 
  Satellite, 
  Layers, 
  Filter,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Eye
} from 'lucide-react';
import Map from './Map';

const MapDashboard = () => {
  const handleLocationSelect = (location: { lat: number; lng: number; address?: string }) => {
    console.log('Selected location:', location);
  };

  const mapStats = [
    {
      title: "Active Zones",
      value: "12",
      description: "High-risk coastal areas",
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      title: "Monitoring Points",
      value: "847",
      description: "Real-time sensors",
      icon: MapPin,
      color: "text-primary"
    },
    {
      title: "Coverage Area",
      value: "7,516 km",
      description: "Coastline monitored",
      icon: Eye,
      color: "text-accent"
    },
    {
      title: "Data Accuracy",
      value: "94.2%",
      description: "System reliability",
      icon: TrendingUp,
      color: "text-green-600"
    }
  ];

  return (
    <section id="map-dashboard" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Interactive Coastal Map</h2>
          <p className="text-muted-foreground">
            Real-time visualization of coastal hazards and monitoring stations across India
          </p>
        </div>

        {/* Map Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mapStats.map((stat, index) => (
            <Card key={index} className="shadow-card-custom hover:shadow-ocean transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-primary/10 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Map */}
          <Card className="lg:col-span-3 shadow-card-custom">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapIcon className="h-5 w-5 text-primary" />
                    Live Hazard Map
                  </CardTitle>
                  <CardDescription>
                    Interactive map showing real-time coastal hazards and monitoring stations
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Satellite className="h-4 w-4 mr-2" />
                    Satellite
                  </Button>
                  <Button variant="outline" size="sm">
                    <Layers className="h-4 w-4 mr-2" />
                    Layers
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Map 
                showHazardPoints={true}
                height="500px"
                onLocationSelect={handleLocationSelect}
              />
            </CardContent>
          </Card>

          {/* Map Controls & Info */}
          <div className="space-y-6">
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="text-lg">Map Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="layers" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="layers">Layers</TabsTrigger>
                    <TabsTrigger value="filters">Filters</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="layers" className="space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Hazard Points</label>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Weather Stations</label>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Evacuation Routes</label>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Population Density</label>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="filters" className="space-y-3 mt-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Severity Level</label>
                      <select className="w-full mt-1 p-2 border rounded-md text-sm">
                        <option>All Levels</option>
                        <option>High Priority</option>
                        <option>Medium Priority</option>
                        <option>Low Priority</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Time Range</label>
                      <select className="w-full mt-1 p-2 border rounded-md text-sm">
                        <option>Last 24 Hours</option>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>All Time</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Hazard Type</label>
                      <select className="w-full mt-1 p-2 border rounded-md text-sm">
                        <option>All Types</option>
                        <option>Cyclone</option>
                        <option>Flooding</option>
                        <option>Erosion</option>
                        <option>Pollution</option>
                      </select>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="shadow-card-custom border-accent">
              <CardHeader>
                <CardTitle className="text-lg text-accent">Regional Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <Badge variant="destructive" className="text-xs">URGENT</Badge>
                  </div>
                  <p className="text-sm font-medium">Cyclone Approach</p>
                  <p className="text-xs text-muted-foreground">Odisha Coast - ETA 18 hours</p>
                </div>
                
                <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-center gap-2 mb-2">
                    <MapIcon className="h-4 w-4 text-accent" />
                    <Badge variant="secondary" className="text-xs">WARNING</Badge>
                  </div>
                  <p className="text-sm font-medium">High Tide Alert</p>
                  <p className="text-xs text-muted-foreground">West Bengal - Next 6 hours</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <Badge className="bg-green-100 text-green-800 text-xs">INFO</Badge>
                  </div>
                  <p className="text-sm font-medium text-green-800">System Update</p>
                  <p className="text-xs text-green-600">New sensors deployed in Kerala</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapDashboard;