import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, AlertTriangle, Info, Volume2, VolumeX } from 'lucide-react';

interface TickerItem {
  id: string;
  type: 'emergency' | 'hotline' | 'advisory';
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  contact?: string;
}

const EmergencyTicker = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const tickerItems: TickerItem[] = [
    {
      id: '1',
      type: 'emergency',
      message: '🚨 EMERGENCY HOTLINE: 1070 - 24/7 Coastal Emergency Response',
      timestamp: new Date().toISOString(),
      priority: 'high',
      contact: '1070'
    },
    {
      id: '2', 
      type: 'hotline',
      message: '📞 REPORT HAZARDS: Call 1070 or use our mobile app to report coastal hazards',
      timestamp: new Date().toISOString(),
      priority: 'high',
      contact: '1070'
    },
    {
      id: '3',
      type: 'advisory',
      message: '🌊 ADVISORY: High tide expected at 2:30 PM. Avoid low-lying coastal areas.',
      timestamp: new Date().toISOString(),
      priority: 'medium'
    },
    {
      id: '4',
      type: 'emergency',
      message: '⚠️ COAST GUARD: 1554 for maritime emergencies and rescue operations',
      timestamp: new Date().toISOString(),
      priority: 'high',
      contact: '1554'
    },
    {
      id: '5',
      type: 'advisory',
      message: '📡 WEATHER ALERT: Moderate to rough sea conditions predicted for next 24 hours',
      timestamp: new Date().toISOString(),
      priority: 'medium'
    },
    {
      id: '6',
      type: 'hotline',
      message: '🏥 MEDICAL EMERGENCY: 108 - Free ambulance service available across India',
      timestamp: new Date().toISOString(),
      priority: 'high',
      contact: '108'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerItems.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, tickerItems.length]);

  const getItemIcon = (type: string, priority: string) => {
    if (type === 'emergency' || priority === 'high') {
      return <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />;
    }
    if (type === 'hotline') {
      return <Phone className="h-4 w-4 text-orange-500" />;
    }
    return <Info className="h-4 w-4 text-blue-500" />;
  };

  const getBackgroundClass = (type: string, priority: string) => {
    if (type === 'emergency' || priority === 'high') {
      return 'emergency-ticker';
    }
    return 'bg-gradient-wave text-white';
  };

  const currentItem = tickerItems[currentIndex];

  return (
    <>
      {/* Desktop Version - Sticky Sidebar */}
      <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 z-50 w-80">
        <Card className={`${getBackgroundClass(currentItem.type, currentItem.priority)} border-0 shadow-lg`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getItemIcon(currentItem.type, currentItem.priority)}
                <span className="text-xs font-semibold uppercase tracking-wide">
                  {currentItem.type === 'emergency' ? 'EMERGENCY' : 
                   currentItem.type === 'hotline' ? 'HOTLINE' : 'ADVISORY'}
                </span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              </Button>
            </div>
            
            <div className="text-sm font-medium leading-relaxed mb-3">
              {currentItem.message}
            </div>
            
            {currentItem.contact && (
              <div className="flex items-center justify-between">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                  onClick={() => window.open(`tel:${currentItem.contact}`)}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Call {currentItem.contact}
                </Button>
                <div className="text-xs opacity-75">
                  {new Date(currentItem.timestamp).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            )}
            
            {/* Progress Indicator */}
            <div className="mt-3 flex space-x-1">
              {tickerItems.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Mobile Version - Top Ticker */}
      <div className="lg:hidden sticky top-16 z-40">
        <div className={`${getBackgroundClass(currentItem.type, currentItem.priority)} overflow-hidden`}>
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                {getItemIcon(currentItem.type, currentItem.priority)}
                <div className="text-sm font-medium truncate">
                  {currentItem.message}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                {currentItem.contact && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2 text-white hover:bg-white/20"
                    onClick={() => window.open(`tel:${currentItem.contact}`)}
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    {currentItem.contact}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Quick Actions - Fixed Bottom for Mobile */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <div className="flex flex-col space-y-2">
          <Button
            size="sm"
            className="emergency-ticker shadow-lg"
            onClick={() => window.open('tel:1070')}
          >
            <Phone className="h-4 w-4 mr-1" />
            Emergency 1070
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
            onClick={() => window.open('tel:1554')}
          >
            <AlertTriangle className="h-4 w-4 mr-1" />
            Coast Guard
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmergencyTicker;