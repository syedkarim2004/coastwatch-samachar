import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  MapPin,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const stats = [
  {
    title: "Active Reports",
    value: "156",
    change: "+23",
    trend: "up",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    title: "Resolved Cases",
    value: "2,847",
    change: "+89",
    trend: "up",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Active Users",
    value: "12,439",
    change: "+156",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Coverage Areas",
    value: "8,452",
    change: "+12",
    trend: "up",
    icon: MapPin,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

const reportsData = [
  { day: 'Mon', reports: 24 },
  { day: 'Tue', reports: 31 },
  { day: 'Wed', reports: 28 },
  { day: 'Thu', reports: 35 },
  { day: 'Fri', reports: 42 },
  { day: 'Sat', reports: 38 },
  { day: 'Sun', reports: 29 }
];

const hazardTypeData = [
  { name: 'High Waves', value: 35, color: '#ef4444' },
  { name: 'Storm Surge', value: 28, color: '#f97316' },
  { name: 'Coastal Flooding', value: 20, color: '#eab308' },
  { name: 'Rip Currents', value: 12, color: '#22c55e' },
  { name: 'Pollution', value: 5, color: '#8b5cf6' }
];

const LiveDashboard = () => {
  return (
    <div className="space-y-6 p-6 bg-muted/30">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Live Dashboard</h2>
          <p className="text-muted-foreground">Real-time coastal hazard monitoring</p>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Live Updates
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendIcon className={`h-4 w-4 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Reports Over Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={reportsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="reports" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hazard Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Reports by Hazard Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={hazardTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {hazardTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium">API Services</p>
                <p className="text-sm text-muted-foreground">All systems operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium">Data Feeds</p>
                <p className="text-sm text-muted-foreground">Real-time updates active</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium">Alert System</p>
                <p className="text-sm text-muted-foreground">2 stations in maintenance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveDashboard;