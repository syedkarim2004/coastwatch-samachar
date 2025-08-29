import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Layers, Zap } from 'lucide-react';

interface MapProps {
  onLocationSelect?: (location: { lat: number; lng: number; address?: string }) => void;
  showHazardPoints?: boolean;
  height?: string;
}

const Map: React.FC<MapProps> = ({ 
  onLocationSelect, 
  showHazardPoints = false, 
  height = "400px" 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);

  // Sample hazard data for coastal India
  const hazardPoints = [
    { 
      id: 1, 
      coordinates: [85.8245, 20.2961], // Paradip, Odisha
      type: 'Cyclone Warning',
      severity: 'high',
      status: 'active'
    },
    { 
      id: 2, 
      coordinates: [76.2673, 9.9312], // Kochi, Kerala
      type: 'Coastal Flooding',
      severity: 'medium',
      status: 'investigating'
    },
    { 
      id: 3, 
      coordinates: [80.2707, 13.0827], // Chennai Beach
      type: 'Marine Pollution',
      severity: 'low',
      status: 'resolved'
    },
    { 
      id: 4, 
      coordinates: [73.8567, 15.2993], // Goa Coastline
      type: 'Beach Erosion',
      severity: 'medium',
      status: 'active'
    }
  ];

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [80.2707, 13.0827], // Centered on Chennai
      zoom: 6,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add geolocate control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'top-right'
    );

    // Add click handler for location selection
    if (onLocationSelect) {
      map.current.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        
        // Add marker
        new mapboxgl.Marker({
          color: 'hsl(var(--primary))'
        })
          .setLngLat([lng, lat])
          .addTo(map.current!);

        onLocationSelect({ lat, lng });
      });
    }

    // Add hazard points if enabled
    if (showHazardPoints) {
      map.current.on('load', () => {
        addHazardLayer();
      });
    }
  };

  const addHazardLayer = () => {
    if (!map.current) return;

    // Add data source
    map.current.addSource('hazards', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: hazardPoints.map(point => ({
          type: 'Feature',
          properties: {
            id: point.id,
            type: point.type,
            severity: point.severity,
            status: point.status
          },
          geometry: {
            type: 'Point',
            coordinates: point.coordinates
          }
        }))
      },
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50
    });

    // Add cluster circles
    map.current.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'hazards',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          'hsl(var(--accent))',
          100,
          'hsl(var(--destructive))',
          750,
          'hsl(var(--destructive))'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40
        ]
      }
    });

    // Add cluster count labels
    map.current.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'hazards',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      },
      paint: {
        'text-color': '#ffffff'
      }
    });

    // Add individual hazard points
    map.current.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'hazards',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': [
          'case',
          ['==', ['get', 'severity'], 'high'], 'hsl(var(--destructive))',
          ['==', ['get', 'severity'], 'medium'], 'hsl(var(--accent))',
          'hsl(var(--secondary))'
        ],
        'circle-radius': 8,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff'
      }
    });

    // Add popup on click
    map.current.on('click', 'unclustered-point', (e) => {
      const feature = e.features![0];
      const coordinates = (feature.geometry as any).coordinates.slice();
      const properties = feature.properties;

      new mapboxgl.Popup()
        .setLngLat(coordinates as [number, number])
        .setHTML(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">${properties!.type}</h3>
            <p class="text-xs text-muted-foreground">Severity: ${properties!.severity}</p>
            <p class="text-xs text-muted-foreground">Status: ${properties!.status}</p>
          </div>
        `)
        .addTo(map.current!);
    });

    // Change cursor on hover
    map.current.on('mouseenter', 'clusters', () => {
      map.current!.getCanvas().style.cursor = 'pointer';
    });
    map.current.on('mouseleave', 'clusters', () => {
      map.current!.getCanvas().style.cursor = '';
    });

    // Handle cluster clicks
    map.current.on('click', 'clusters', (e) => {
      const features = map.current!.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      });
      const clusterId = features[0].properties!.cluster_id;
      const source = map.current!.getSource('hazards') as mapboxgl.GeoJSONSource;
      source.getClusterExpansionZoom(
        clusterId,
        (err, zoom) => {
          if (err) return;
          map.current!.easeTo({
            center: (features[0].geometry as any).coordinates,
            zoom: zoom
          });
        }
      );
    });
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Setup Map Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Get your free token from{' '}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
            <Input
              id="mapbox-token"
              type="password"
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJ..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTokenSubmit()}
            />
          </div>
          <Button onClick={handleTokenSubmit} className="w-full">
            <Layers className="h-4 w-4 mr-2" />
            Initialize Map
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-card-custom">
      <div ref={mapContainer} style={{ height }} className="w-full" />
      {onLocationSelect && (
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Click to select location
          </p>
        </div>
      )}
      {showHazardPoints && (
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-destructive"></div>
              <span>High</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span>Low</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;