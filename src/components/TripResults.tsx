import { motion } from "framer-motion";
import { MapPin, Bed, Utensils, Camera, Fuel, Clock } from "lucide-react";

export interface DayPlan {
  day: number;
  route: string;
  distance: string;
  rideTime: string;
  stay: string;
  stayCost: string;
  foodStops: string[];
  attractions: string[];
  fuelStops: number;
}

export interface TripItinerary {
  summary: string;
  totalDistance: string;
  days: DayPlan[];
  budget: {
    fuel: number;
    stay: number;
    food: number;
    emergency: number;
    total: number;
  };
  packingList: string[];
}

const TripResults = ({ itinerary }: { itinerary: TripItinerary }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-3xl mx-auto"
    >
      {/* Summary */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="font-display text-2xl font-bold text-gradient mb-2">Trip Summary</h2>
        <p className="text-foreground/80">{itinerary.summary}</p>
        <p className="text-muted-foreground mt-2 text-sm">Total Distance: {itinerary.totalDistance}</p>
      </div>

      {/* Day by day */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-semibold text-foreground">Daily Itinerary</h3>
        {itinerary.days.map((day, i) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-lg p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-display text-lg font-bold text-primary">Day {day.day}</h4>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {day.rideTime}
              </span>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground/80">{day.route} — <span className="text-muted-foreground">{day.distance}</span></span>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <Bed className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground/80">{day.stay} <span className="text-muted-foreground">({day.stayCost})</span></span>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <Fuel className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground/80">{day.fuelStops} fuel stop(s)</span>
            </div>

            {day.attractions.length > 0 && (
              <div className="flex items-start gap-2 text-sm">
                <Camera className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground/80">{day.attractions.join(", ")}</span>
              </div>
            )}

            {day.foodStops.length > 0 && (
              <div className="flex items-start gap-2 text-sm">
                <Utensils className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground/80">{day.foodStops.join(", ")}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Budget */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="font-display text-xl font-semibold text-gradient mb-4">Budget Breakdown</h3>
        <div className="space-y-2 text-sm">
          {[
            ["Fuel", itinerary.budget.fuel],
            ["Accommodation", itinerary.budget.stay],
            ["Food", itinerary.budget.food],
            ["Emergency Buffer", itinerary.budget.emergency],
          ].map(([label, amount]) => (
            <div key={String(label)} className="flex justify-between text-foreground/80">
              <span>{label}</span>
              <span>₹{Number(amount).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t border-border pt-2 flex justify-between font-bold text-primary">
            <span>Total</span>
            <span>₹{itinerary.budget.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Packing */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="font-display text-xl font-semibold text-gradient mb-4">Packing Checklist</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {itinerary.packingList.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TripResults;
