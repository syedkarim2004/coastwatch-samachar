import Header from "@/components/Header";
import CoastalMap from "@/components/CoastalMap";
import LiveDashboard from "@/components/LiveDashboard";
import RecentReports from "@/components/RecentReports";
import EmergencyTicker from "@/components/EmergencyTicker";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <EmergencyTicker />
      <main>
        {/* Map-First Design - Full Width Coastal Map */}
        <section className="w-full">
          <CoastalMap height="70vh" showControls={true} />
        </section>
        
        {/* Live Dashboard */}
        <LiveDashboard />
        
        {/* Recent Hazard Reports */}
        <RecentReports />
      </main>
    </div>
  );
};

export default Index;
