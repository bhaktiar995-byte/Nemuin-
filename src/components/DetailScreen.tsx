import { useEffect } from 'react';
import { ChevronLeft, MapPin, Clock, Phone, Star, Share, Heart, MessageCircle } from 'lucide-react';
import { Restaurant, MenuItem } from '../data/mock';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix generic icon issue with react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const foodIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3180/3180182.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36]
});

interface DetailScreenProps {
  restaurant: Restaurant;
  cart: Record<string, number>;
  onUpdateCart: (itemId: string, delta: number) => void;
  onBack: () => void;
  onChat: () => void;
  onOrder: () => void;
}

function DetailMapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export function DetailScreen({ restaurant, cart, onUpdateCart, onBack, onChat, onOrder }: DetailScreenProps) {
  // Group menu by category
  const menuByCategory = restaurant.menu.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const totalItems = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const totalPrice = restaurant.menu.reduce((sum, item) => sum + (item.price * (cart[item.id] || 0)), 0);



  return (
    <div className={`flex-1 w-full flex flex-col bg-white h-full relative overflow-y-auto ${totalItems > 0 && restaurant.isAvailableOnline ? 'pb-32' : 'pb-8'}`}>
      
      {/* Header Image & Actions */}
      <div className="relative h-64 w-full shrink-0">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#4B2E2A]" />
        
        {/* Top Navbar */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-10 flex justify-between items-center z-10">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#FF611D] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#FF611D] transition-colors">
              <Share className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#FF611D] transition-colors border border-white/40">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-10 left-6 right-6 text-white pb-2">
          {!restaurant.isAvailableOnline && (
            <div className="px-3 py-1 mb-2 bg-[#4B2E2A]/80 backdrop-blur border border-white/20 rounded-lg text-xs font-bold tracking-wider inline-block">
              ⚠️ Khusus Dine-in / Offline
            </div>
          )}
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-[#FF611D] rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">
              {restaurant.type}
            </span>
            <div className="flex items-center text-sm font-semibold">
              <Star className="w-4 h-4 fill-current text-yellow-400 mr-1" />
              {restaurant.rating} ({restaurant.reviewCount})
            </div>
          </div>
          <h1 className="text-3xl font-bold leading-tight">{restaurant.name}</h1>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white mx-4 mt-[-2rem] relative z-20 rounded-3xl p-6 border border-[#E7E5E4] shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-start text-[#4B2E2A]">
            <MapPin className="w-5 h-5 mr-3 shrink-0 text-[#A8A29E] mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-[#4B2E2A]">{restaurant.address}</p>
              <p className="text-xs text-[#78716C] mt-0.5 font-medium">{restaurant.distance} away</p>
            </div>
          </div>
          
          {/* Small Map Location */}
          <div className="ml-8 mt-2 h-32 rounded-2xl overflow-hidden border border-[#E7E5E4] shadow-sm z-0 relative">
            <MapContainer 
              center={restaurant.coords} 
              zoom={15} 
              scrollWheelZoom={false} 
              zoomControl={false}
              dragging={false}
              className="w-full h-full relative z-0"
            >
              <DetailMapResizer />
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <Marker position={restaurant.coords} icon={foodIcon} />
            </MapContainer>
          </div>

          <div className="h-px bg-[#E7E5E4] mt-2" />
          <div className="flex items-center text-[#4B2E2A]">
            <Clock className="w-5 h-5 mr-3 shrink-0 text-[#A8A29E]" />
            <p className="text-sm font-bold text-[#4B2E2A]">{restaurant.hours}</p>
          </div>
          <div className="h-px bg-[#E7E5E4]" />
          <div className="flex items-center text-[#4B2E2A]">
            <Phone className="w-5 h-5 mr-3 shrink-0 text-[#A8A29E]" />
            <p className="text-sm font-bold text-[#4B2E2A] flex-1">{restaurant.phone}</p>
            <button 
              onClick={onChat}
              className="bg-[#4B2E2A] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm hover:opacity-80 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              Chat
            </button>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="mx-4 mt-4 bg-[#4B2E2A] rounded-3xl p-6 text-[#F6F1EA] shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-white">Popular Menu</h2>
        
        <div className="flex flex-col gap-8">
          {Object.entries(menuByCategory).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-bold text-[#78716C] uppercase tracking-widest mb-4">{category}</h3>
              <div className="flex flex-col gap-4">
                {items.map((item, idx) => (
                  <div key={item.id} className={`flex gap-4 items-start ${idx !== items.length - 1 ? 'border-b border-white/10 pb-4' : ''}`}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 py-1 flex flex-col gap-1">
                      <h4 className="font-bold text-white text-sm leading-tight pr-2">{item.name}</h4>
                      <p className="text-[11px] text-[#A8A29E] line-clamp-2 leading-relaxed mb-1">
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center mt-auto pt-1">
                        <p className="text-sm font-bold text-[#F6F1EA]">
                          Rp{item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
