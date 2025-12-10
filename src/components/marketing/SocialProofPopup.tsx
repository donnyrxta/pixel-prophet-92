import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, MapPin, X } from 'lucide-react';

interface Order {
  name: string;
  location: string;
  product: string;
  time: string;
}

const recentOrders: Order[] = [
  // Harare CBD & Surrounds
  { name: 'Tendai M.', location: 'Harare CBD', product: 'Business Cards (500)', time: '2 minutes ago' },
  { name: 'Sarah K.', location: 'Borrowdale', product: 'Company Brochures (200)', time: '5 minutes ago' },
  { name: 'Grace M.', location: 'Avondale', product: 'Flyers (1000)', time: '8 minutes ago' },
  { name: 'Peter Z.', location: 'Eastlea', product: 'T-Shirt Printing (50)', time: '12 minutes ago' },
  { name: 'Mike C.', location: 'Highlands', product: 'Letterheads & Envelopes', time: '15 minutes ago' },
  { name: 'Tatenda P.', location: 'Greendale', product: 'Shop Signage', time: '18 minutes ago' },
  { name: 'Rumbidzai T.', location: 'Mount Pleasant', product: 'Corporate Diaries (100)', time: '22 minutes ago' },
  { name: 'Blessing N.', location: 'Mbare', product: 'Event Posters (500)', time: '25 minutes ago' },
  { name: 'Nyasha K.', location: 'Hatfield', product: 'Menu Design & Print', time: '28 minutes ago' },
  { name: 'Farai D.', location: 'Belvedere', product: 'Invoice Books (50)', time: '32 minutes ago' },
  
  // Other Major Cities
  { name: 'James T.', location: 'Bulawayo', product: 'Logo Design Package', time: '35 minutes ago' },
  { name: 'Chipo N.', location: 'Mutare', product: 'Wedding Invitations (150)', time: '38 minutes ago' },
  { name: 'David R.', location: 'Gweru', product: 'Roll-up Banners (2)', time: '42 minutes ago' },
  { name: 'Linda S.', location: 'Chitungwiza', product: 'Vehicle Branding', time: '45 minutes ago' },
  { name: 'Simba M.', location: 'Masvingo', product: 'Church Banners (5)', time: '48 minutes ago' },
  { name: 'Rudo C.', location: 'Kwekwe', product: 'Business Stamps Set', time: '52 minutes ago' },
  { name: 'Tapiwa H.', location: 'Kadoma', product: 'Branded Caps (100)', time: '55 minutes ago' },
  { name: 'Memory Z.', location: 'Chinhoyi', product: 'School Uniforms Quote', time: '58 minutes ago' },
  
  // Electronics & Tech
  { name: 'Collins P.', location: 'Harare CBD', product: 'CCTV System (4 Cameras)', time: '1 hour ago' },
  { name: 'Munyaradzi B.', location: 'Msasa', product: 'Samsung Galaxy A15', time: '1 hour ago' },
  { name: 'Patricia K.', location: 'Westgate', product: 'WiFi Router Setup', time: '1 hour ago' },
  { name: 'Tinashe R.', location: 'Ruwa', product: 'Laptop Accessories', time: '1 hour ago' },
  
  // Printing & Stationery
  { name: 'Joseph M.', location: 'Graniteside', product: 'NCR Books (100)', time: '1 hour ago' },
  { name: 'Elizabeth W.', location: 'Waterfalls', product: 'Calendar Printing (500)', time: '1 hour ago' },
  { name: 'Charles N.', location: 'Sunningdale', product: 'Certificates (200)', time: '2 hours ago' },
  { name: 'Angela T.', location: 'Mabelreign', product: 'ID Cards (50)', time: '2 hours ago' },
  { name: 'Robert K.', location: 'Marlborough', product: 'Booklet Printing (100)', time: '2 hours ago' },
  
  // Branding & Signage
  { name: 'Faith C.', location: 'Glen View', product: 'Full Brand Identity', time: '2 hours ago' },
  { name: 'Emmanuel S.', location: 'Southerton', product: 'Outdoor Billboard', time: '2 hours ago' },
  { name: 'Precious M.', location: 'Arcadia', product: 'Neon Sign Design', time: '3 hours ago' },
  { name: 'Tawanda G.', location: 'Budiriro', product: 'A-Frame Signs (2)', time: '3 hours ago' },
  { name: 'Vimbai H.', location: 'Dzivaresekwa', product: 'Window Graphics', time: '3 hours ago' },
  
  // Corporate & Events
  { name: 'Sandra P.', location: 'Newlands', product: 'Conference Materials', time: '3 hours ago' },
  { name: 'Brian M.', location: 'Alexandra Park', product: 'Exhibition Stand', time: '4 hours ago' },
  { name: 'Joyce N.', location: 'Emerald Hill', product: 'Annual Report Design', time: '4 hours ago' },
  { name: 'Kevin T.', location: 'Vainona', product: 'Company Profile', time: '4 hours ago' },
  { name: 'Stella K.', location: 'Chisipite', product: 'Corporate Gift Set', time: '5 hours ago' },
  
  // Promotional Items
  { name: 'Owen D.', location: 'Norton', product: 'Branded Umbrellas (50)', time: '5 hours ago' },
  { name: 'Tendai S.', location: 'Epworth', product: 'Promotional Pens (500)', time: '5 hours ago' },
  { name: 'Mercy L.', location: 'Zimre Park', product: 'Branded Water Bottles', time: '6 hours ago' },
  { name: 'Gift M.', location: 'Kuwadzana', product: 'USB Flash Drives (100)', time: '6 hours ago' },
  { name: 'Nelson R.', location: 'Marondera', product: 'Tote Bags (200)', time: '6 hours ago' },
];

export function SocialProofPopup() {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [orderIndex, setOrderIndex] = useState(0);

  useEffect(() => {
    if (isDismissed) return;

    // Show first popup after 5 seconds
    const initialDelay = setTimeout(() => {
      setCurrentOrder(recentOrders[0]);
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialDelay);
  }, [isDismissed]);

  useEffect(() => {
    if (!isVisible || isDismissed) return;

    // Hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Show next after 15-25 seconds
    const nextTimer = setTimeout(() => {
      const nextIndex = (orderIndex + 1) % recentOrders.length;
      setOrderIndex(nextIndex);
      setCurrentOrder(recentOrders[nextIndex]);
      setIsVisible(true);
    }, 15000 + Math.random() * 10000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isVisible, orderIndex, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('socialProofDismissed', 'true');
  };

  // Check if already dismissed this session
  useEffect(() => {
    if (sessionStorage.getItem('socialProofDismissed') === 'true') {
      setIsDismissed(true);
    }
  }, []);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && currentOrder && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-24 left-4 z-50 max-w-xs"
        >
          <div className="bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-2xl p-4 pr-10">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss notifications"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {currentOrder.name}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  just ordered <span className="font-medium text-foreground">{currentOrder.product}</span>
                </p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{currentOrder.location}</span>
                  <span className="mx-1">•</span>
                  <span>{currentOrder.time}</span>
                </div>
              </div>
            </div>

            {/* Verified badge */}
            <div className="mt-2 pt-2 border-t border-border/50 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Verified order</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
