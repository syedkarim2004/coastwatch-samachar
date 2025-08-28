import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HazardReportForm from "@/components/HazardReportForm";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Dashboard />
        <HazardReportForm />
      </main>
    </div>
  );
};

export default Index;
