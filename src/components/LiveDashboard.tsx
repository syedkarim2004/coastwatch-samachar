import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertTriangle, Users, MapPin, CheckCircle } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LiveDashboard = () => {
  // Sample data for charts
  const reportsData = [
    { day: 'Mon', reports: 12 },
    { day: 'Tue', reports: 8 },
    { day: 'Wed', reports: 15 },
    { day: 'Thu', reports: 10 },
    { day: 'Fri', reports: 18 },
    { day: 'Sat', reports: 22 },
    { day: 'Sun', reports: 14 }
  ];

  const hazardTypeData = [
    { name: 'Storm Surge', value: 35, color: '#ef4444' },
    { name: 'High Waves', value: 28, color: '#3b82f6' },
    { name: 'Pollution', value: 20, color: '#8b5cf6' },
    { name: 'Erosion', value: 17, color: '#f59e0b' }
  ];

  const kpiCards = [
    {
      title: 'Active Reports',
      value: '47',
      change: '+12%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      title: 'Resolved Cases',
      value: '234',
      change: '+8%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Coverage Area',
      value: '7,516 km',
      change: '+3%',
      trend: 'up',
      icon: MapPin,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="w-full space-y-6 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
            Live Coastal Monitoring Dashboard
          </h2>
          <p className="text-muted-foreground mt-2">
            Real-time hazard monitoring and response coordination
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiCards.map((kpi, index) => (
            <Card key={index} className="glass-card hover:shadow-ocean transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className={`text-xs flex items-center ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {kpi.change} from last week
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Reports Trend Chart */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Reports Over Last 7 Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportsData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="reports" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Hazard Types Distribution */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                Hazard Types Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={hazardTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {hazardTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-green-600 text-2xl font-bold">NORMAL</div>
              <div className="text-sm text-muted-foreground">Overall Status</div>
              <div className="mt-2 h-2 bg-green-100 rounded-full">
                <div className="h-2 bg-green-500 rounded-full w-3/4"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-yellow-600 text-2xl font-bold">WATCH</div>
              <div className="text-sm text-muted-foreground">Alert Level</div>
              <div className="mt-2 h-2 bg-yellow-100 rounded-full">
                <div className="h-2 bg-yellow-500 rounded-full w-1/2"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-blue-600 text-2xl font-bold">98.7%</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
              <div className="mt-2 h-2 bg-blue-100 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full w-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;