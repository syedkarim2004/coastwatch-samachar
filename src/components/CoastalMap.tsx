import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Layers, 
  Navigation, 
  Waves, 
  Radio, 
  Route, 
  Users,
  ZoomIn,
  ZoomOut,
  Locate
} from 'lucide-react';

// Custom marker icons
const createCustomIcon = (color: string) => new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`)}`,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24]
});

const hazardIcon = createCustomIcon('#ef4444');
const stationIcon = createCustomIcon('#3b82f6');
const evacuationIcon = createCustomIcon('#f59e0b');

// Sample hazard data
const hazardPoints = [
  { id: 1, lat: 8.5241, lng: 76.9366, type: 'High Waves', severity: 'High', time: '2 hours ago', location: 'Thiruvananthapuram Coast' },
  { id: 2, lat: 9.9312, lng: 76.2673, type: 'Storm Surge', severity: 'Medium', time: '4 hours ago', location: 'Kochi Harbor' },
  { id: 3, lat: 11.7401, lng: 79.8083, type: 'Coastal Flooding', severity: 'High', time: '1 hour ago', location: 'Puducherry Beach' },
  { id: 4, lat: 13.0827, lng: 80.2707, type: 'Rip Current', severity: 'Low', time: '6 hours ago', location: 'Marina Beach, Chennai' },
  { id: 5, lat: 19.0760, lng: 72.8777, type: 'Pollution Alert', severity: 'Medium', time: '3 hours ago', location: 'Mumbai Coast' },
];

const weatherStations = [
  { id: 1, lat: 8.5074, lng: 76.9570, name: 'Thiruvananthapuram Station', status: 'Active' },
  { id: 2, lat: 9.9252, lng: 76.2876, name: 'Kochi Marine Station', status: 'Active' },
  { id: 3, lat: 13.0475, lng: 80.2824, name: 'Chennai Coastal Station', status: 'Maintenance' },
];

const MapControls = () => {
  const map = useMap();
  
  const handleZoomIn = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();
  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 12 });
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <Button
        size="icon"
        variant="outline"
        className="bg-white shadow-lg"
        onClick={handleZoomIn}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="bg-white shadow-lg"
        onClick={handleZoomOut}
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="bg-white shadow-lg"
        onClick={handleLocate}
      >
        <Locate className="h-4 w-4" />
      </Button>
    </div>
  );
};

interface CoastalMapProps {
  height?: string;
  showControls?: boolean;
  onIncidentSelect?: (incident: any) => void;
}

const CoastalMap: React.FC<CoastalMapProps> = ({ 
  height = "70vh", 
  showControls = true,
  onIncidentSelect 
}) => {
  const [layers, setLayers] = useState({
    hazardPoints: true,
    weatherStations: false,
    evacuationRoutes: false,
    populationDensity: false
  });
  
  const [baseMap, setBaseMap] = useState('street');
  const [timeRange, setTimeRange] = useState([72]);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      case 'Low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTileUrl = () => {
    switch (baseMap) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  return (
    <div className="relative w-full" style={{ height }}>
      {/* Layer Controls */}
      {showControls && (
        <Card className="absolute top-4 left-4 z-[1000] p-4 bg-white/95 backdrop-blur">
          <div className="space-y-4 min-w-[250px]">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Map Layers
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hazard-points" className="flex items-center gap-2">
                    <Waves className="h-4 w-4" />
                    Hazard Points
                  </Label>
                  <Switch
                    id="hazard-points"
                    checked={layers.hazardPoints}
                    onCheckedChange={(checked) => 
                      setLayers(prev => ({ ...prev, hazardPoints: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="weather-stations" className="flex items-center gap-2">
                    <Radio className="h-4 w-4" />
                    Weather Stations
                  </Label>
                  <Switch
                    id="weather-stations"
                    checked={layers.weatherStations}
                    onCheckedChange={(checked) => 
                      setLayers(prev => ({ ...prev, weatherStations: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="evacuation-routes" className="flex items-center gap-2">
                    <Route className="h-4 w-4" />
                    Evacuation Routes
                  </Label>
                  <Switch
                    id="evacuation-routes"
                    checked={layers.evacuationRoutes}
                    onCheckedChange={(checked) => 
                      setLayers(prev => ({ ...prev, evacuationRoutes: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="population-density" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Population Density
                  </Label>
                  <Switch
                    id="population-density"
                    checked={layers.populationDensity}
                    onCheckedChange={(checked) => 
                      setLayers(prev => ({ ...prev, populationDensity: checked }))
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Base Map</h4>
              <div className="flex gap-1">
                {['street', 'satellite', 'terrain'].map((type) => (
                  <Button
                    key={type}
                    size="sm"
                    variant={baseMap === type ? "default" : "outline"}
                    onClick={() => setBaseMap(type)}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Time Range (hours)</h4>
              <Slider
                value={timeRange}
                onValueChange={setTimeRange}
                max={168}
                min={1}
                step={1}
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground">
                Showing data from last {timeRange[0]} hours
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Map Container */}
      <MapContainer
        center={[10.8505, 76.2711]} // Kerala center
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url={getTileUrl()}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {showControls && <MapControls />}

        {/* Hazard Points */}
        {layers.hazardPoints && hazardPoints.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={hazardIcon}
            eventHandlers={{
              click: () => {
                setSelectedIncident(point);
                onIncidentSelect?.(point);
              }
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold mb-1">{point.type}</h3>
                <p className="text-sm text-muted-foreground mb-2">{point.location}</p>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getSeverityColor(point.severity)}>
                    {point.severity}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{point.time}</span>
                </div>
                <Button size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Weather Stations */}
        {layers.weatherStations && weatherStations.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={stationIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold mb-1">{station.name}</h3>
                <Badge variant={station.status === 'Active' ? 'default' : 'secondary'}>
                  {station.status}
                </Badge>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      {showControls && layers.hazardPoints && (
        <Card className="absolute bottom-4 left-4 z-[1000] p-3 bg-white/95 backdrop-blur">
          <h4 className="font-semibold mb-2 text-sm">Severity Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Low Risk</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CoastalMap;