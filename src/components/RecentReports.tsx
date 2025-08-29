import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Share2, 
  Filter,
  Search,
  Clock,
  User,
  Waves,
  Zap,
  Droplets,
  Wind,
  Trash2,
  AlertTriangle
} from 'lucide-react';

const hazardIcons = {
  'High Waves': Waves,
  'Storm Surge': Zap,
  'Coastal Flooding': Droplets,
  'Rip Current': Wind,
  'Pollution Alert': Trash2,
  'Tsunami Warning': AlertTriangle
};

const recentReports = [
  {
    id: 'HR-2024-001',
    title: 'High Waves Alert',
    type: 'High Waves',
    location: 'Marina Beach, Chennai',
    reporter: 'Coastal Guard Station',
    timestamp: '2 minutes ago',
    severity: 'High',
    status: 'Active',
    state: 'Tamil Nadu',
    district: 'Chennai'
  },
  {
    id: 'HR-2024-002',
    title: 'Storm Surge Warning',
    type: 'Storm Surge',
    location: 'Kochi Harbor',
    reporter: 'Local Fisherman',
    timestamp: '15 minutes ago',
    severity: 'Medium',
    status: 'Investigating',
    state: 'Kerala',
    district: 'Ernakulam'
  },
  {
    id: 'HR-2024-003',
    title: 'Coastal Flooding',
    type: 'Coastal Flooding',
    location: 'Puducherry Beach',
    reporter: 'Tourist',
    timestamp: '1 hour ago',
    severity: 'High',
    status: 'Active',
    state: 'Puducherry',
    district: 'Puducherry'
  },
  {
    id: 'HR-2024-004',
    title: 'Rip Current Advisory',
    type: 'Rip Current',
    location: 'Calangute Beach, Goa',
    reporter: 'Lifeguard',
    timestamp: '2 hours ago',
    severity: 'Low',
    status: 'Resolved',
    state: 'Goa',
    district: 'North Goa'
  },
  {
    id: 'HR-2024-005',
    title: 'Pollution Alert',
    type: 'Pollution Alert',
    location: 'Mumbai Coast',
    reporter: 'Environmental Agency',
    timestamp: '3 hours ago',
    severity: 'Medium',
    status: 'Active',
    state: 'Maharashtra',
    district: 'Mumbai'
  },
  {
    id: 'HR-2024-006',
    title: 'Tsunami Warning',
    type: 'Tsunami Warning',
    location: 'Vishakhapatnam Port',
    reporter: 'INCOIS',
    timestamp: '4 hours ago',
    severity: 'High',
    status: 'Resolved',
    state: 'Andhra Pradesh',
    district: 'Vishakhapatnam'
  }
];

const RecentReports = () => {
  const [filters, setFilters] = useState({
    hazardType: '',
    severity: '',
    state: '',
    status: '',
    timeRange: '',
    search: ''
  });

  const [filteredReports, setFilteredReports] = useState(recentReports);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-500 text-white';
      case 'Medium':
        return 'bg-orange-500 text-white';
      case 'Low':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Investigating':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Apply filters
    let filtered = recentReports;
    
    if (newFilters.hazardType) {
      filtered = filtered.filter(report => report.type === newFilters.hazardType);
    }
    if (newFilters.severity) {
      filtered = filtered.filter(report => report.severity === newFilters.severity);
    }
    if (newFilters.state) {
      filtered = filtered.filter(report => report.state === newFilters.state);
    }
    if (newFilters.status) {
      filtered = filtered.filter(report => report.status === newFilters.status);
    }
    if (newFilters.search) {
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(newFilters.search.toLowerCase()) ||
        report.location.toLowerCase().includes(newFilters.search.toLowerCase())
      );
    }
    
    setFilteredReports(filtered);
  };

  const clearFilters = () => {
    setFilters({
      hazardType: '',
      severity: '',
      state: '',
      status: '',
      timeRange: '',
      search: ''
    });
    setFilteredReports(recentReports);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recent Hazard Reports</h2>
          <p className="text-muted-foreground">Latest coastal hazard incidents and alerts</p>
        </div>
        <Badge variant="outline" className="text-blue-600 border-blue-200">
          {filteredReports.length} Reports
        </Badge>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <CardTitle className="text-lg">Filters</CardTitle>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search reports..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="hazard-type">Hazard Type</Label>
              <Select value={filters.hazardType} onValueChange={(value) => handleFilterChange('hazardType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="High Waves">High Waves</SelectItem>
                  <SelectItem value="Storm Surge">Storm Surge</SelectItem>
                  <SelectItem value="Coastal Flooding">Coastal Flooding</SelectItem>
                  <SelectItem value="Rip Current">Rip Current</SelectItem>
                  <SelectItem value="Pollution Alert">Pollution Alert</SelectItem>
                  <SelectItem value="Tsunami Warning">Tsunami Warning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="severity">Severity</Label>
              <Select value={filters.severity} onValueChange={(value) => handleFilterChange('severity', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Levels</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <Select value={filters.state} onValueChange={(value) => handleFilterChange('state', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All States</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                  <SelectItem value="Goa">Goa</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Gujarat">Gujarat</SelectItem>
                  <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                  <SelectItem value="Odisha">Odisha</SelectItem>
                  <SelectItem value="West Bengal">West Bengal</SelectItem>
                  <SelectItem value="Puducherry">Puducherry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Investigating">Investigating</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="time-range">Time Range</Label>
              <Select value={filters.timeRange} onValueChange={(value) => handleFilterChange('timeRange', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Time</SelectItem>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((report) => {
          const HazardIcon = hazardIcons[report.type as keyof typeof hazardIcons] || AlertTriangle;
          
          return (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <HazardIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">ID: {report.id}</p>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(report.severity)}>
                    {report.severity}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{report.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Reported by {report.reporter}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{report.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MapPin className="h-4 w-4 mr-1" />
                      View on Map
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Reports Found</h3>
            <p className="text-muted-foreground">
              No hazard reports match your current filters. Try adjusting your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecentReports;