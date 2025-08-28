import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Reports",
      value: "23",
      change: "+12%",
      trend: "up",
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      title: "Resolved Cases",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Active Users",
      value: "1,247",
      change: "+15%",
      trend: "up",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Coverage Areas",
      value: "45",
      change: "+3",
      trend: "up",
      icon: MapPin,
      color: "text-accent"
    }
  ];

  const recentReports = [
    {
      id: "CHM-2025-001",
      type: "Cyclone Warning",
      location: "Paradip, Odisha",
      status: "active",
      severity: "high",
      time: "2 hours ago",
      reporter: "Local Fisherman"
    },
    {
      id: "CHM-2025-002",
      type: "Coastal Flooding",
      location: "Kochi, Kerala", 
      status: "investigating",
      severity: "medium",
      time: "4 hours ago",
      reporter: "Coast Guard"
    },
    {
      id: "CHM-2025-003",
      type: "Marine Pollution",
      location: "Chennai Beach",
      status: "resolved",
      severity: "low",
      time: "6 hours ago",
      reporter: "Environmental Group"
    },
    {
      id: "CHM-2025-004",
      type: "Beach Erosion",
      location: "Goa Coastline",
      status: "active",
      severity: "medium",
      time: "8 hours ago",
      reporter: "Tourist"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-destructive text-destructive-foreground";
      case "investigating": return "bg-accent text-accent-foreground";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <XCircle className="h-3 w-3" />;
      case "investigating": return <AlertCircle className="h-3 w-3" />;
      case "resolved": return <CheckCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-accent text-accent-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <section id="dashboard" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Monitoring Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time overview of coastal hazard reports and system status
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card-custom hover:shadow-ocean transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-primary/10 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Reports */}
          <Card className="lg:col-span-2 shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Recent Hazard Reports
              </CardTitle>
              <CardDescription>
                Latest reports from coastal monitoring network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-foreground">{report.id}</span>
                        <Badge className={getSeverityColor(report.severity)}>
                          {report.severity}
                        </Badge>
                        <Badge variant="outline" className={`${getStatusColor(report.status)} flex items-center gap-1`}>
                          {getStatusIcon(report.status)}
                          {report.status}
                        </Badge>
                      </div>
                      <p className="font-medium text-foreground">{report.type}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {report.location}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Reported by {report.reporter} • {report.time}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="government" className="w-full">
                  View All Reports
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ocean" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report New Hazard
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  View Live Map
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Community Reports
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card-custom border-accent">
              <CardHeader>
                <CardTitle className="text-lg text-accent">System Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm font-medium text-accent">High Wind Alert</p>
                    <p className="text-xs text-muted-foreground">West Bengal coastline - Wind speeds 40+ kmph expected</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-700">System Online</p>
                    <p className="text-xs text-muted-foreground">All monitoring stations operational</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;