import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, User, ExternalLink, Filter, Search } from 'lucide-react';

interface HazardReport {
  id: string;
  title: string;
  type: string;
  location: string;
  reporter: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'investigating' | 'resolved';
  description: string;
  coordinates: { lat: number; lng: number };
}

const RecentReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hazardTypeFilter, setHazardTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Sample reports data
  const reports: HazardReport[] = [
    {
      id: 'HR001',
      title: 'Severe Storm Surge Warning',
      type: 'Storm Surge',
      location: 'Mumbai, Maharashtra',
      reporter: 'Coast Guard Station',
      timestamp: '2024-01-15T10:30:00Z',
      severity: 'critical',
      status: 'active',
      description: 'High storm surge expected with 3-4 meter waves',
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    {
      id: 'HR002',
      title: 'High Wave Activity',
      type: 'High Waves',
      location: 'Chennai, Tamil Nadu',
      reporter: 'Local Fisherman',
      timestamp: '2024-01-15T09:15:00Z',
      severity: 'high',
      status: 'investigating',
      description: 'Unusual wave patterns observed near Marina Beach',
      coordinates: { lat: 13.0827, lng: 80.2707 }
    },
    {
      id: 'HR003',
      title: 'Dangerous Rip Current',
      type: 'Rip Current',
      location: 'Puducherry',
      reporter: 'Lifeguard Team',
      timestamp: '2024-01-15T11:45:00Z',
      severity: 'high',
      status: 'active',
      description: 'Strong rip current detected at Paradise Beach',
      coordinates: { lat: 11.9416, lng: 79.8083 }
    },
    {
      id: 'HR004',
      title: 'Oil Spill Incident',
      type: 'Pollution',
      location: 'Goa Coast',
      reporter: 'Environmental Agency',
      timestamp: '2024-01-15T08:20:00Z',
      severity: 'medium',
      status: 'resolved',
      description: 'Small oil spill from fishing vessel contained',
      coordinates: { lat: 15.2993, lng: 74.1240 }
    },
    {
      id: 'HR005',
      title: 'Beach Erosion Alert',
      type: 'Erosion',
      location: 'Trivandrum, Kerala',
      reporter: 'Local Authority',
      timestamp: '2024-01-15T12:10:00Z',
      severity: 'medium',
      status: 'investigating',
      description: 'Significant beach erosion observed after recent storms',
      coordinates: { lat: 8.5241, lng: 76.9366 }
    },
    {
      id: 'HR006',
      title: 'Tsunami Warning System Test',
      type: 'System Alert',
      location: 'Andaman Islands',
      reporter: 'INCOIS',
      timestamp: '2024-01-15T14:00:00Z',
      severity: 'low',
      status: 'resolved',
      description: 'Scheduled tsunami warning system test completed',
      coordinates: { lat: 11.7401, lng: 92.6586 }
    }
  ];

  const getHazardIcon = (type: string) => {
    switch (type) {
      case 'Storm Surge': return '🌪';
      case 'High Waves': return '🌊';
      case 'Rip Current': return '🌊';
      case 'Pollution': return '🛢';
      case 'Erosion': return '🏖';
      case 'System Alert': return '⚠️';
      default: return '📍';
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'low': return 'severity-low';
      case 'medium': return 'severity-medium';
      case 'high': return 'severity-high';
      case 'critical': return 'severity-critical';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 border-red-200';
      case 'investigating': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Filter reports based on selected filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHazardType = hazardTypeFilter === 'all' || report.type === hazardTypeFilter;
    const matchesSeverity = severityFilter === 'all' || report.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || report.location.includes(locationFilter);

    return matchesSearch && matchesHazardType && matchesSeverity && matchesStatus && matchesLocation;
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Recent Hazard Reports</h2>
            <p className="text-muted-foreground">Live updates from coastal monitoring network</p>
          </div>
          <Badge variant="outline" className="text-sm">
            {filteredReports.length} Reports
          </Badge>
        </div>

        {/* Filters */}
        <Card className="mb-6 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Filter className="h-5 w-5 mr-2" />
              Filter Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={hazardTypeFilter} onValueChange={setHazardTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Hazard Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Storm Surge">Storm Surge</SelectItem>
                  <SelectItem value="High Waves">High Waves</SelectItem>
                  <SelectItem value="Rip Current">Rip Current</SelectItem>
                  <SelectItem value="Pollution">Pollution</SelectItem>
                  <SelectItem value="Erosion">Erosion</SelectItem>
                  <SelectItem value="System Alert">System Alert</SelectItem>
                </SelectContent>
              </Select>

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                  <SelectItem value="Goa">Goa</SelectItem>
                  <SelectItem value="Andaman">Andaman</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setHazardTypeFilter('all');
                  setSeverityFilter('all');
                  setStatusFilter('all');
                  setLocationFilter('all');
                }}
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="glass-card hover:shadow-ocean transition-all duration-300 group">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getHazardIcon(report.type)}</span>
                    <div>
                      <CardTitle className="text-sm font-semibold line-clamp-1">
                        {report.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">{report.id}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getSeverityClass(report.severity)}`}>
                    {report.severity.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {report.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {report.location}
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="h-3 w-3 mr-1" />
                    {report.reporter}
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimestamp(report.timestamp)}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge variant="outline" className={getStatusColor(report.status)}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </Badge>
                  
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <MapPin className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card className="text-center py-8 glass-card">
            <CardContent>
              <p className="text-muted-foreground">No reports found matching your filters.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setHazardTypeFilter('all');
                  setSeverityFilter('all');
                  setStatusFilter('all');
                  setLocationFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RecentReports;