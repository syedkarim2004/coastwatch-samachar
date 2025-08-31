import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  AlertTriangle, 
  Info, 
  Clock,
  Play,
  Pause,
  ExternalLink
} from 'lucide-react';

const emergencyData = [
  {
    id: 1,
    type: 'hotline',
    title: 'Emergency Coastal Helpline',
    content: 'Call 1077 for immediate coastal emergency assistance',
    phone: '1077',
    priority: 'high',
    timestamp: '24/7 Available'
  },
  {
    id: 2,
    type: 'alert',
    title: 'High Wave Alert - Chennai',
    content: 'Wave heights expected to reach 3-4 meters. Avoid beach activities.',
    priority: 'high',
    timestamp: '2 mins ago'
  },
  {
    id: 3,
    type: 'hotline',
    title: 'NDRF Emergency Response',
    content: 'National Disaster Response Force - Call 011-26701700',
    phone: '011-26701700',
    priority: 'medium',
    timestamp: '24/7 Available'
  },
  {
    id: 4,
    type: 'advisory',
    title: 'Fishing Advisory - Kerala Coast',
    content: 'Fishermen advised not to venture into sea till further notice',
    priority: 'medium',
    timestamp: '15 mins ago'
  },
  {
    id: 5,
    type: 'alert',
    title: 'Storm Surge Warning - Mumbai',
    content: 'Coastal areas may experience flooding. Move to higher ground.',
    priority: 'high',
    timestamp: '1 hour ago'
  },
  {
    id: 6,
    type: 'hotline',
    title: 'Coast Guard Emergency',
    content: 'For marine emergencies call 1554',
    phone: '1554',
    priority: 'high',
    timestamp: '24/7 Available'
  }
];

const EmergencyTicker = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % emergencyData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-orange-500 text-white';
      case 'low':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotline':
        return <Phone className="h-4 w-4" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />;
      case 'advisory':
        return <Info className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const currentItem = emergencyData[currentIndex];

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 z-50 w-80">
        <Card className="bg-orange-50 border-orange-200 shadow-lg">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <h3 className="font-semibold text-orange-800">Emergency Updates</h3>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-6 w-6 p-0"
                >
                  {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {emergencyData.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-orange-100 border-orange-300 shadow-sm' 
                      : 'bg-white border-orange-100'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`p-1 rounded ${getPriorityColor(item.priority)}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-orange-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-orange-700 mb-2 line-clamp-2">
                        {item.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-orange-600">
                          <Clock className="h-3 w-3" />
                          <span>{item.timestamp}</span>
                        </div>
                        {item.phone && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-xs border-orange-300 text-orange-700 hover:bg-orange-100"
                            onClick={() => window.open(`tel:${item.phone}`)}
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-orange-200">
              <div className="flex items-center justify-between text-xs text-orange-700">
                <span>{currentIndex + 1} of {emergencyData.length}</span>
                <Badge variant="outline" className="text-orange-700 border-orange-300">
                  Live Updates
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Mobile Top Ticker */}
      <div className="lg:hidden sticky top-16 z-40 bg-orange-500 text-white shadow-md">
        <div className="overflow-hidden">
          <div className="flex items-center p-3">
            <div className="flex items-center gap-2 mr-4 shrink-0">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">ALERT</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  {getTypeIcon(currentItem.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {currentItem.title}
                  </h4>
                  <p className="text-xs opacity-90 truncate">
                    {currentItem.content}
                  </p>
                </div>
                {currentItem.phone && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0 h-8 text-xs bg-white text-orange-600 border-white hover:bg-orange-50"
                    onClick={() => window.open(`tel:${currentItem.phone}`)}
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                )}
              </div>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsPlaying(!isPlaying)}
              className="shrink-0 h-8 w-8 p-0 text-white hover:bg-orange-600 ml-2"
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="h-1 bg-orange-600">
          <div 
            className="h-full bg-white transition-all duration-[4000ms] ease-linear"
            style={{ 
              width: isPlaying ? '100%' : '0%',
              transition: isPlaying ? 'width 4s linear' : 'none'
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EmergencyTicker;