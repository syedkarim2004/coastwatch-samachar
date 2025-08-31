import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layers, Satellite, MapPin, Clock, Target } from 'lucide-react';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface HazardPoint {
  id: string;
  lat: number;
  lng: number;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  title: string;
}

interface CoastalMapProps {
  showControls?: boolean;
  height?: string;
  onHazardClick?: (hazard: HazardPoint) => void;
  onLocationSelect?: (location: { lat: number; lng: number; address?: string }) => void;
}

const CoastalMap: React.FC<CoastalMapProps> = ({ 
  showControls = true, 
  height = "400px",
  onHazardClick 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [mapStyle, setMapStyle] = useState<'street' | 'satellite' | 'terrain'>('street');
  const [visibleLayers, setVisibleLayers] = useState({
    hazards: true,
    weather: true,
    evacuation: false,
    population: false
  });
  const [timeRange, setTimeRange] = useState(72); // hours

  // Sample hazard data
  const hazardPoints: HazardPoint[] = [
    { id: '1', lat: 19.0760, lng: 72.8777, type: 'Storm Surge', severity: 'high', timestamp: '2024-01-15T10:30:00Z', title: 'Mumbai Coastal Flooding' },
    { id: '2', lat: 13.0827, lng: 80.2707, type: 'High Waves', severity: 'medium', timestamp: '2024-01-15T09:15:00Z', title: 'Chennai Beach Warning' },
    { id: '3', lat: 11.9416, lng: 79.8083, type: 'Rip Current', severity: 'critical', timestamp: '2024-01-15T11:45:00Z', title: 'Puducherry Dangerous Current' },
    { id: '4', lat: 15.2993, lng: 74.1240, type: 'Pollution', severity: 'low', timestamp: '2024-01-15T08:20:00Z', title: 'Goa Oil Spill' },
    { id: '5', lat: 8.5241, lng: 76.9366, type: 'Erosion', severity: 'medium', timestamp: '2024-01-15T12:10:00Z', title: 'Trivandrum Beach Erosion' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#22c55e';
      case 'medium': return '#eab308';
      case 'high': return '#ef4444';
      case 'critical': return '#9333ea';
      default: return '#6b7280';
    }
  };

  const getHazardIcon = (type: string) => {
    switch (type) {
      case 'Storm Surge': return '🌪';
      case 'High Waves': return '🌊';
      case 'Rip Current': return '🌊';
      case 'Pollution': return '🛢';
      case 'Erosion': return '🏖';
      default: return '⚠️';
    }
  };

  const getTileLayer = (style: string) => {
    switch (style) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current, {
      center: [15.2993, 74.1240], // India's coastline
      zoom: 6,
      zoomControl: false
    });

    // Add tile layer
    L.tileLayer(getTileLayer(mapStyle), {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Add custom zoom control
    L.control.zoom({ position: 'topright' }).addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing layers
    map.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        map.current?.removeLayer(layer);
      }
    });

    // Add hazard markers if visible
    if (visibleLayers.hazards) {
      hazardPoints.forEach(hazard => {
        const marker = L.circleMarker([hazard.lat, hazard.lng], {
          radius: 8,
          fillColor: getSeverityColor(hazard.severity),
          color: '#ffffff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        });

        const popupContent = `
          <div class="p-2">
            <div class="font-semibold text-sm">${getHazardIcon(hazard.type)} ${hazard.title}</div>
            <div class="text-xs text-gray-600 mt-1">Type: ${hazard.type}</div>
            <div class="text-xs text-gray-600">Severity: ${hazard.severity}</div>
            <div class="text-xs text-gray-600">Time: ${new Date(hazard.timestamp).toLocaleString()}</div>
          </div>
        `;

        marker.bindPopup(popupContent);
        
        marker.on('click', () => {
          onHazardClick?.(hazard);
        });

        marker.addTo(map.current!);
      });
    }
  }, [visibleLayers, hazardPoints, onHazardClick]);

  useEffect(() => {
    if (!map.current) return;

    // Update tile layer when style changes
    map.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.current?.removeLayer(layer);
      }
    });

    L.tileLayer(getTileLayer(mapStyle), {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);
  }, [mapStyle]);

  const toggleLayer = (layer: keyof typeof visibleLayers) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  return (
    <div className="relative w-full" style={{ height }}>
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden shadow-lg" />
      
      {showControls && (
        <>
          {/* Map Style Controls */}
          <Card className="absolute top-4 left-4 p-2 glass-card z-[1000]">
            <div className="flex gap-1">
              <Button
                size="sm"
                variant={mapStyle === 'street' ? 'default' : 'outline'}
                onClick={() => setMapStyle('street')}
                className="text-xs"
              >
                <MapPin className="h-3 w-3 mr-1" />
                Street
              </Button>
              <Button
                size="sm"
                variant={mapStyle === 'satellite' ? 'default' : 'outline'}
                onClick={() => setMapStyle('satellite')}
                className="text-xs"
              >
                <Satellite className="h-3 w-3 mr-1" />
                Satellite
              </Button>
              <Button
                size="sm"
                variant={mapStyle === 'terrain' ? 'default' : 'outline'}
                onClick={() => setMapStyle('terrain')}
                className="text-xs"
              >
                <Layers className="h-3 w-3 mr-1" />
                Terrain
              </Button>
            </div>
          </Card>

          {/* Layer Controls */}
          <Card className="absolute top-4 right-4 p-3 glass-card z-[1000] w-48">
            <h4 className="font-semibold text-sm mb-2 flex items-center">
              <Layers className="h-4 w-4 mr-1" />
              Map Layers
            </h4>
            <div className="space-y-2 text-xs">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={visibleLayers.hazards}
                  onChange={() => toggleLayer('hazards')}
                  className="rounded"
                />
                <span>Hazard Points</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={visibleLayers.weather}
                  onChange={() => toggleLayer('weather')}
                  className="rounded"
                />
                <span>Weather Stations</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={visibleLayers.evacuation}
                  onChange={() => toggleLayer('evacuation')}
                  className="rounded"
                />
                <span>Evacuation Routes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={visibleLayers.population}
                  onChange={() => toggleLayer('population')}
                  className="rounded"
                />
                <span>Population Density</span>
              </label>
            </div>
          </Card>

          {/* Time Slider */}
          <Card className="absolute bottom-4 left-4 right-4 p-3 glass-card z-[1000]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Time Range: Last {timeRange}h</span>
              </div>
              <input
                type="range"
                min="1"
                max="168"
                value={timeRange}
                onChange={(e) => setTimeRange(Number(e.target.value))}
                className="flex-1 mx-4"
              />
              <Button size="sm" variant="outline" onClick={() => setTimeRange(72)}>
                <Target className="h-3 w-3 mr-1" />
                Reset
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default CoastalMap;