import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Phone, Wrench, Hospital, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmergencyMode = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 bg-destructive hover:bg-destructive/90 animate-pulse-glow"
        style={{ boxShadow: "0 0 30px hsl(0 72% 51% / 0.4)" }}
      >
        <AlertTriangle className="w-6 h-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-lg p-8 max-w-md w-full space-y-6 relative"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-3" />
                <h2 className="font-display text-2xl font-bold text-destructive">Emergency Mode</h2>
                <p className="text-muted-foreground text-sm mt-1">Quick access to help when you need it</p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Phone, label: "Call Emergency Contact", desc: "Share your live location", color: "text-destructive" },
                  { icon: Hospital, label: "Nearest Hospital", desc: "Find hospitals within 10km", color: "text-primary" },
                  { icon: Wrench, label: "Nearest Mechanic", desc: "Bike repair shops nearby", color: "text-primary" },
                  { icon: MapPin, label: "Share Location", desc: "Send GPS to saved contacts", color: "text-primary" },
                ].map(({ icon: Icon, label, desc, color }) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-4 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-left"
                  >
                    <Icon className={`w-6 h-6 ${color} shrink-0`} />
                    <div>
                      <p className="font-display font-semibold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EmergencyMode;
