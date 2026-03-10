import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Zap,
  Wind,
  Wrench,
  Smartphone,
  Eye,
  Droplets,
  Package,
  Star,
  CheckCircle2,
  ChevronDown,
  Bike,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Accessory {
  id: string;
  name: string;
  category: string;
  priority: "Essential" | "Recommended" | "Optional";
  icon: ReactNode;
  description: string;
  tips: string[];
  tags: string[];
}

const accessories: Accessory[] = [
  {
    id: "helmet",
    name: "Full-Face Helmet",
    category: "Safety",
    priority: "Essential",
    icon: <Shield className="w-6 h-6" />,
    description:
      "A DOT/ISI certified full-face helmet is your #1 lifesaver. Provides maximum protection for your head, face, and chin in a crash. Look for helmets with MIPS (Multi-directional Impact Protection System) for superior rotational impact protection.",
    tips: [
      "Always buy helmets with DOT, ECE 22.06 or ISI certification",
      "Replace your helmet every 5 years or after any significant impact",
      "Ensure a snug fit — no wobble, no pressure points",
      "Anti-fog visor is a must for monsoon and winter riding",
    ],
    tags: ["Safety", "Head Protection", "Legal Requirement"],
  },
  {
    id: "riding-jacket",
    name: "Riding Jacket with CE Armour",
    category: "Safety",
    priority: "Essential",
    icon: <Shield className="w-6 h-6" />,
    description:
      "A proper riding jacket with CE Level 2 armour at shoulders, elbows and a back protector slot is non-negotiable. Abrasion-resistant materials like Cordura or leather protect your skin in a slide.",
    tips: [
      "Look for CE Level 2 certified armour on shoulders & elbows",
      "Ventilated jackets for summer, waterproof shell for monsoon",
      "A spine protector insert is highly recommended",
      "Bright Hi-Vis colours or reflective panels improve visibility",
    ],
    tags: ["Safety", "Armour", "Abrasion Resistance"],
  },
  {
    id: "gloves",
    name: "Riding Gloves",
    category: "Safety",
    priority: "Essential",
    icon: <Shield className="w-6 h-6" />,
    description:
      "Hands are your first point of contact with the ground in a fall. Gauntlet-style gloves with palm sliders, knuckle protection and wrist bracing can prevent serious injuries.",
    tips: [
      "Never ride without gloves, even on short trips",
      "Summer: mesh gloves | Monsoon: waterproof gloves | Winter: insulated gauntlets",
      "Check that touchscreen-compatible fingertips work with your phone",
      "Wrist closure straps prevent gloves from flying off in a crash",
    ],
    tags: ["Safety", "Hand Protection", "Weather"],
  },
  {
    id: "boots",
    name: "Riding Boots",
    category: "Safety",
    priority: "Essential",
    icon: <Shield className="w-6 h-6" />,
    description:
      "Ankle protection, oil-resistant soles, and toe cap reinforcement make riding boots a vital safety item. They protect against crush injuries, twists, and abrasion.",
    tips: [
      "Look for CE certified ankle protection",
      "Oil and slip-resistant sole is critical at fuel stops",
      "Over-ankle height gives better protection than low-cuts",
      "Waterproof membranes (Gore-Tex) are great for long tours",
    ],
    tags: ["Safety", "Foot Protection", "Ankle Support"],
  },
  {
    id: "riding-pants",
    name: "Riding Pants / Trousers",
    category: "Safety",
    priority: "Recommended",
    icon: <Shield className="w-6 h-6" />,
    description:
      "Riding pants with CE knee and hip armour complete your protective gear suite. Many come with removable liners making them all-season capable.",
    tips: [
      "Must have CE Level 1 or Level 2 knee and hip armour",
      "Waterproof outer shell for monsoon touring",
      "Thermal liner is useful for Himalayan and winter rides",
      "Check compatibility with jacket zipper connection for single-piece protection",
    ],
    tags: ["Safety", "Leg Protection", "Hip & Knee Armour"],
  },
  {
    id: "phone-mount",
    name: "Phone / GPS Mount",
    category: "Navigation",
    priority: "Essential",
    icon: <Smartphone className="w-6 h-6" />,
    description:
      "A sturdy handlebar phone mount lets you use Google Maps or OsmAnd for navigation hands-free. Vibration-damping mounts protect your phone's camera OIS module on long rides.",
    tips: [
      "Use vibration-damping mounts to protect phone internals",
      "Quad-lock style mounts are the most secure",
      "Always carry a clip that locks from multiple sides",
      "Pair with a wireless charger mount for all-day navigation",
    ],
    tags: ["Navigation", "Convenience", "Tech"],
  },
  {
    id: "intercom",
    name: "Bluetooth Intercom / Headset",
    category: "Communication",
    priority: "Recommended",
    icon: <Zap className="w-6 h-6" />,
    description:
      "A helmet-mounted Bluetooth intercom lets you take calls, listen to directions, and communicate with fellow riders. Essential for group tours and long solo adventures.",
    tips: [
      "Sena, Cardo, and FreedConn are popular brands in India",
      "Mesh intercom (Cardo Packtalk) allows up to 15 rider group communication",
      "Look for at least 10+ hours battery life",
      "Noise-cancelling mic ensures clear audio at highway speeds",
    ],
    tags: ["Communication", "Tech", "Group Riding"],
  },
  {
    id: "tool-kit",
    name: "Emergency Tool Kit",
    category: "Repair",
    priority: "Essential",
    icon: <Wrench className="w-6 h-6" />,
    description:
      "A compact tool kit including a tubeless tyre puncture repair kit, Allen keys, combination wrenches, cable ties, and zip ties can save your ride when help is miles away.",
    tips: [
      "Tubeless tyre puncture kit (mushroom plugs + CO₂ inflator) is a must",
      "Include Allen keys, combination spanners matching your bike's bolts",
      "Carry a 12V mini air compressor for tube-type tyres",
      "Fuses, cable ties, electrical tape are cheap lifesavers",
    ],
    tags: ["Repair", "Emergency", "Self-Reliance"],
  },
  {
    id: "first-aid",
    name: "First Aid Kit",
    category: "Safety",
    priority: "Essential",
    icon: <Shield className="w-6 h-6" />,
    description:
      "A motorcycle-specific first aid kit includes wound dressings, antiseptic wipes, bandages, ORS sachets, pain relievers, and emergency contact card. Critical for remote riding.",
    tips: [
      "Store in a waterproof pouch or hard case",
      "Include prescription medicines for multi-day trips",
      "Add emergency space blanket for cold weather scenarios",
      "Know basic first aid — a kit is useless without knowledge",
    ],
    tags: ["Safety", "Medical", "Emergency"],
  },
  {
    id: "luggage",
    name: "Saddlebags / Tank Bag / Top Box",
    category: "Luggage",
    priority: "Recommended",
    icon: <Package className="w-6 h-6" />,
    description:
      "Proper luggage solutions keep your weight centered and hands free. Soft saddlebags are versatile; a tank bag provides quick access; a top box offers hard-sided security.",
    tips: [
      "Waterproof bags or rain covers are essential for touring",
      "Keep weight balanced: equal load on both sides",
      "Tank bags with map/phone windows are multi-functional",
      "Hard top boxes offer superior theft protection at stops",
    ],
    tags: ["Luggage", "Touring", "Storage"],
  },
  {
    id: "hydration",
    name: "Hydration Pack",
    category: "Comfort",
    priority: "Recommended",
    icon: <Droplets className="w-6 h-6" />,
    description:
      "Dehydration is dangerous on long rides, especially in summer. A hydration backpack lets you sip water through a tube without stopping. Many combine storage with the bladder.",
    tips: [
      "2-3 litre bladder is ideal for a full day of riding",
      "Clean the bladder regularly to prevent mould",
      "Insulated bladders keep water cool in hot conditions",
      "Some hydration packs double as back armour carriers",
    ],
    tags: ["Hydration", "Safety", "Comfort"],
  },
  {
    id: "visibility",
    name: "Reflective Vest / Hi-Vis Vest",
    category: "Visibility",
    priority: "Recommended",
    icon: <Eye className="w-6 h-6" />,
    description:
      "Being seen is half the battle in road safety. Night riding or overcast monsoon days significantly reduce your visibility to other motorists. A reflective vest dramatically helps.",
    tips: [
      "Mandatory for night riding in many Indian states",
      "Wear over your riding jacket for maximum visibility",
      "Check local traffic rules — some areas require it by law",
      "LED wearable strips are a modern alternative",
    ],
    tags: ["Visibility", "Safety", "Night Riding"],
  },
  {
    id: "windshield",
    name: "Aftermarket Windshield / Visor",
    category: "Comfort",
    priority: "Optional",
    icon: <Wind className="w-6 h-6" />,
    description:
      "A taller windshield dramatically reduces wind fatigue on highway touring. It deflects insects, rain and debris away from your body at speed. Worth the investment for long-distance riders.",
    tips: [
      "Taller shields work better for >180cm riders",
      "Adjustable windshields offer the best versatility",
      "A slight tilt angle prevents buffeting at speed",
      "Anti-scratch polycarbonate is more durable than acrylic",
    ],
    tags: ["Comfort", "Wind Protection", "Touring"],
  },
  {
    id: "usb-charger",
    name: "USB / 12V Power Outlet",
    category: "Tech",
    priority: "Recommended",
    icon: <Zap className="w-6 h-6" />,
    description:
      "A bike-mounted USB-C / 12V power outlet lets you charge your phone, GPS device and action camera while riding. Heated gear also connects here in cold conditions.",
    tips: [
      "Look for 3A fast-charge USB-C ports",
      "Use a fused and weatherproof wiring kit for installation",
      "Dual-port adapters let you charge phone + camera simultaneously",
      "A power bank as backup prevents navigation blackout",
    ],
    tags: ["Tech", "Charging", "Navigation"],
  },
  {
    id: "action-cam",
    name: "Action Camera",
    category: "Tech",
    priority: "Optional",
    icon: <Eye className="w-6 h-6" />,
    description:
      "A helmet or handlebar-mounted action camera records your journey and serves as a dashcam in case of accidents. Great for memories, vlogging, and insurance evidence.",
    tips: [
      "GoPro Hero, Insta360, and DJI Osmo Action are top picks",
      "Front + rear cameras offer full coverage",
      "Loop recording mode automatically overwrites old footage",
      "Waterproof cameras handle Indian monsoons effortlessly",
    ],
    tags: ["Tech", "Safety", "Travel Memory"],
  },
];

const categories = ["All", "Safety", "Navigation", "Repair", "Luggage", "Comfort", "Tech", "Communication", "Visibility"];
const priorities = ["All", "Essential", "Recommended", "Optional"];

const priorityColor: Record<string, string> = {
  Essential: "text-red-400 bg-red-400/10 border-red-400/30",
  Recommended: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  Optional: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
};

const categoryIcon: Record<string, ReactNode> = {
  Safety: <Shield className="w-4 h-4" />,
  Navigation: <Smartphone className="w-4 h-4" />,
  Repair: <Wrench className="w-4 h-4" />,
  Luggage: <Package className="w-4 h-4" />,
  Comfort: <Wind className="w-4 h-4" />,
  Tech: <Zap className="w-4 h-4" />,
  Communication: <Zap className="w-4 h-4" />,
  Visibility: <Eye className="w-4 h-4" />,
};

const AccessoryCard = ({ item, index }: { item: Accessory; index: number }) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`glass-card rounded-xl overflow-hidden border transition-all duration-300 ${
        checked ? "border-primary/60 shadow-[0_0_20px_hsl(32_95%_52%/0.15)]" : "border-border/50"
      }`}
    >
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            {/* Checkbox */}
            <button
              onClick={() => setChecked(!checked)}
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${
                checked
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 hover:border-primary/50"
              }`}
              aria-label="Mark as packed"
            >
              {checked && <CheckCircle2 className="w-4 h-4" />}
            </button>

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <div className="text-primary">{item.icon}</div>
                <h3
                  className={`font-display text-lg font-bold transition-colors ${
                    checked ? "line-through text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {item.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${priorityColor[item.priority]}`}
                >
                  {item.priority}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  {categoryIcon[item.category]}
                  {item.category}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all"
            aria-label="Expand details"
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <p className={`text-sm text-foreground/70 mt-3 leading-relaxed line-clamp-2 ${open ? "hidden" : ""}`}>
          {item.description}
        </p>
      </div>

      {/* Expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-border/30 pt-4">
              <p className="text-sm text-foreground/75 leading-relaxed">{item.description}</p>

              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5" /> Pro Tips
                </h4>
                <ul className="space-y-1.5">
                  {item.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const BikeAccessories = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriority, setActivePriority] = useState("All");

  const filtered = accessories.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchPri = activePriority === "All" || a.priority === activePriority;
    return matchCat && matchPri;
  });

  const essentialCount = accessories.filter((a) => a.priority === "Essential").length;
  const recommendedCount = accessories.filter((a) => a.priority === "Recommended").length;
  const optionalCount = accessories.filter((a) => a.priority === "Optional").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(32 95% 52% / 0.12), hsl(220 15% 8% / 0.97))",
          }}
        />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, hsl(32 95% 52%), transparent 50%), radial-gradient(circle at 80% 20%, hsl(220 80% 60%), transparent 40%)"
          }}
        />

        <div className="relative z-10 container mx-auto px-4 pt-8 pb-12">
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Trip Planner
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Bike className="w-10 h-10 text-primary" />
              <h1 className="font-display text-5xl md:text-6xl font-bold text-gradient">
                Biker's Gear Guide
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything a serious rider should pack before hitting the road.{" "}
              <span className="text-primary font-semibold">Tap any item to check it off your list.</span>
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            {[
              { label: "Essential", count: essentialCount, color: "text-red-400" },
              { label: "Recommended", count: recommendedCount, color: "text-amber-400" },
              { label: "Optional", count: optionalCount, color: "text-emerald-400" },
            ].map(({ label, count, color }) => (
              <div key={label} className="glass-card rounded-xl px-5 py-3 flex items-center gap-2">
                <span className={`font-display text-2xl font-bold ${color}`}>{count}</span>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/40 shadow-lg">
        <div className="container mx-auto px-4 py-3 space-y-2">
          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Priority filter */}
          <div className="flex gap-2">
            {priorities.map((p) => (
              <button
                key={p}
                onClick={() => setActivePriority(p)}
                className={`shrink-0 text-xs font-medium px-3 py-1 rounded-full border transition-all duration-200 ${
                  activePriority === p
                    ? p === "Essential"
                      ? "bg-red-500/20 border-red-400 text-red-300"
                      : p === "Recommended"
                      ? "bg-amber-500/20 border-amber-400 text-amber-300"
                      : p === "Optional"
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                      : "bg-primary/20 border-primary text-primary"
                    : "border-border/40 text-muted-foreground hover:border-border"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accessories Grid */}
      <div className="container mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-muted-foreground"
            >
              No accessories found for these filters.
            </motion.div>
          ) : (
            <motion.div
              key={`${activeCategory}-${activePriority}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filtered.map((item, i) => (
                <AccessoryCard key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-card rounded-xl p-6 text-center border border-primary/20"
        >
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">💡 Tip:</span> Click the circle on each
            card to mark items as packed. A well-geared rider is a safe rider —{" "}
            <span className="text-foreground/80">ride smart, ride proud.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BikeAccessories;
