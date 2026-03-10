import { TripFormData } from "@/components/TripPlannerForm";
import { TripItinerary } from "@/components/TripResults";

export function generateMockItinerary(data: TripFormData): TripItinerary {
  const totalDistance = data.days * 250;
  const fuelCost = Math.round((totalDistance / data.bikeMileage) * 105);
  const stayCost = Math.round(data.days * (data.budget * 0.3 / data.days));
  const foodCost = Math.round(data.days * 600);
  const emergency = Math.round(data.budget * 0.1);

  const days = Array.from({ length: data.days }, (_, i) => ({
    day: i + 1,
    route: i === 0
      ? `${data.startLocation} → Highway stop → Midway town`
      : i === data.days - 1
        ? `Rest stop → Scenic route → ${data.destination}`
        : `Day ${i + 1} scenic highway stretch`,
    distance: `${200 + Math.round(Math.random() * 100)} km`,
    rideTime: `${4 + Math.round(Math.random() * 3)}h ${Math.round(Math.random() * 50)}m`,
    stay: i === data.days - 1 ? `Hotel in ${data.destination}` : `Budget stay near highway`,
    stayCost: `₹${800 + Math.round(Math.random() * 700)}`,
    foodStops: ["Highway dhaba", "Local restaurant"],
    attractions: i === 0
      ? ["Fort viewpoint", "River crossing"]
      : i === data.days - 1
        ? [`${data.destination} beach/market`, "Sunset point"]
        : ["Mountain pass", "Waterfall stop"],
    fuelStops: 1 + Math.round(Math.random()),
  }));

  return {
    summary: `An epic ${data.days}-day motorcycle journey from ${data.startLocation} to ${data.destination} on your ${data.bikeType} bike. This route covers scenic highways, mountain passes, and coastal roads — optimized for adventure and safety.`,
    totalDistance: `~${totalDistance} km`,
    days,
    budget: {
      fuel: fuelCost,
      stay: stayCost,
      food: foodCost,
      emergency,
      total: fuelCost + stayCost + foodCost + emergency,
    },
    packingList: [
      "Helmet (ISI certified)",
      "Riding jacket",
      "Riding gloves",
      "Rain gear",
      "First aid kit",
      "Toolkit & puncture kit",
      "Phone mount & charger",
      "Power bank",
      "Bungee cords",
      "Water bottle",
      "Snacks & energy bars",
      "Documents (RC, DL, Insurance)",
      "Cash + UPI backup",
      "Torch / headlamp",
      "Sunscreen",
    ],
  };
}
