import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HazardReportForm from "@/components/HazardReportForm";
import Dashboard from "@/components/Dashboard";
import MapDashboard from "@/components/MapDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Dashboard />
        <MapDashboard />
        <HazardReportForm />
      </main>
    </div>
  );
};

export default Index;
