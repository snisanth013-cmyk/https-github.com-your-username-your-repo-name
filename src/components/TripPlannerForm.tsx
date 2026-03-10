import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Fuel, IndianRupee, Bike, ArrowRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface TripFormData {
  startLocation: string;
  destination: string;
  days: number;
  budget: number;
  bikeMileage: number;
  bikeType: string;
}

interface TripPlannerFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading: boolean;
}

const TripPlannerForm = ({ onSubmit, isLoading }: TripPlannerFormProps) => {
  const [form, setForm] = useState<TripFormData>({
    startLocation: "",
    destination: "",
    days: 3,
    budget: 10000,
    bikeMileage: 40,
    bikeType: "sport",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      onSubmit={handleSubmit}
      className="glass-card rounded-lg p-6 md:p-8 space-y-6 max-w-2xl mx-auto"
    >
      <h2 className="font-display text-2xl font-bold text-gradient">Plan Your Ride</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 text-primary" /> Start Location
          </Label>
          <Input
            placeholder="e.g. Mumbai"
            value={form.startLocation}
            onChange={(e) => setForm({ ...form, startLocation: e.target.value })}
            required
            className="bg-secondary border-border"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 text-primary" /> Destination
          </Label>
          <Input
            placeholder="e.g. Goa"
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            required
            className="bg-secondary border-border"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4 text-primary" /> Number of Days
          </Label>
          <Input
            type="number"
            min={1}
            max={30}
            value={form.days}
            onChange={(e) => setForm({ ...form, days: Number(e.target.value) })}
            required
            className="bg-secondary border-border"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground text-sm">
            <IndianRupee className="w-4 h-4 text-primary" /> Budget (₹)
          </Label>
          <Input
            type="number"
            min={1000}
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
            required
            className="bg-secondary border-border"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground text-sm">
            <Fuel className="w-4 h-4 text-primary" /> Bike Mileage (km/l)
          </Label>
          <Input
            type="number"
            min={5}
            value={form.bikeMileage}
            onChange={(e) => setForm({ ...form, bikeMileage: Number(e.target.value) })}
            required
            className="bg-secondary border-border"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground text-sm">
            <Bike className="w-4 h-4 text-primary" /> Bike Type
          </Label>
          <Select value={form.bikeType} onValueChange={(v) => setForm({ ...form, bikeType: v })}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sport">Sport</SelectItem>
              <SelectItem value="cruiser">Cruiser</SelectItem>
              <SelectItem value="adventure">Adventure / Tourer</SelectItem>
              <SelectItem value="commuter">Commuter</SelectItem>
              <SelectItem value="offroad">Off-Road</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full glow font-display text-lg h-12">
        {isLoading ? "Generating Route..." : (
          <>Generate Trip Plan <ArrowRight className="ml-2 w-5 h-5" /></>
        )}
      </Button>
    </motion.form>
  );
};

export default TripPlannerForm;
