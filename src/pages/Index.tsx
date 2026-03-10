import { useState } from "react";
import { motion } from "framer-motion";
import { Bike, LogIn, LogOut, User, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TripPlannerForm, { TripFormData } from "@/components/TripPlannerForm";
import TripResults, { TripItinerary } from "@/components/TripResults";
import EmergencyMode from "@/components/EmergencyMode";
import { generateMockItinerary } from "@/lib/mockTripData";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ride.jpg";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: TripFormData) => {
    setIsLoading(true);
    // Simulate AI processing
    await new Promise((r) => setTimeout(r, 1500));
    setItinerary(generateMockItinerary(data));
    setIsLoading(false);
  };

  const handleReset = () => setItinerary(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-end p-4">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-foreground/70 flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {user.user_metadata?.full_name || user.email}
            </span>
            <Button variant="outline" size="sm" onClick={signOut} className="gap-1.5 border-border/50">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => navigate("/auth")} className="gap-1.5 border-border/50">
            <LogIn className="w-3.5 h-3.5" /> Sign In
          </Button>
        )}
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Motorcycle on mountain road" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Bike className="w-10 h-10 text-primary" />
              <h1 className="font-display text-5xl md:text-6xl font-bold text-gradient">
                RideMate AI
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Your AI-powered travel companion for motorcycle adventures. Plan safe routes, find stays, and ride with confidence.
            </p>
          </motion.div>

          {/* Accessories CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex justify-center mb-8"
          >
            <button
              onClick={() => navigate("/accessories")}
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-primary/40 bg-primary/10 hover:bg-primary/20 hover:border-primary/70 text-primary font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_20px_hsl(32_95%_52%/0.2)]"
            >
              <Package className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              🏍️ Biker's Accessories Guide
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-bold">NEW</span>
            </button>
          </motion.div>

          {!itinerary && <TripPlannerForm onSubmit={handleSubmit} isLoading={isLoading} />}
        </div>
      </div>

      {/* Results */}
      {itinerary && (
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-gradient">Your Trip Plan</h2>
            <button
              onClick={handleReset}
              className="text-sm text-primary hover:text-primary/80 font-display font-semibold transition-colors"
            >
              ← Plan New Trip
            </button>
          </div>
          <TripResults itinerary={itinerary} />
        </div>
      )}

      <EmergencyMode />
    </div>
  );
};

export default Index;
