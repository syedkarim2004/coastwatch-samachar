import React from 'react';
import CoastalMap from '@/components/CoastalMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LiveMap = () => {
  const navigate = useNavigate();

  const handleHazardClick = (hazard: any) => {
    console.log('Hazard clicked:', hazard);
    // Navigate to incident detail page
    // navigate(`/incidents/${hazard.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Live Coastal Map</h1>
                <p className="text-sm text-muted-foreground">
                  Interactive hazard monitoring and layer visualization
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share Map
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-height Map */}
      <div className="h-[calc(100vh-120px)]">
        <CoastalMap 
          height="100%" 
          showControls={true}
          onHazardClick={handleHazardClick}
        />
      </div>

      {/* Map Legend */}
      <Card className="absolute bottom-20 left-4 glass-card z-[1000] w-64">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center">
            <Layers className="h-4 w-4 mr-1" />
            Map Legend
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs space-y-2">
          <div className="space-y-1">
            <div className="font-semibold">Hazard Severity</div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Low Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>Critical Risk</span>
            </div>
          </div>
          
          <div className="border-t pt-2 space-y-1">
            <div className="font-semibold">Hazard Types</div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div>🌪 Storm Surge</div>
              <div>🌊 High Waves</div>
              <div>🛢 Pollution</div>
              <div>🏖 Erosion</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveMap;