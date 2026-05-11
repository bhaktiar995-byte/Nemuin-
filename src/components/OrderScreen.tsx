import { useState } from 'react';
import { ChevronLeft, MapPin, CheckCircle, Package } from 'lucide-react';
import { Restaurant } from '../data/mock';

interface OrderScreenProps {
  restaurant: Restaurant;
  cart: Record<string, number>;
  onBack: () => void;
  onSuccess: () => void;
}

export function OrderScreen({ restaurant, cart, onBack, onSuccess }: OrderScreenProps) {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cartItems = restaurant.menu.filter(item => cart[item.id] > 0);
  const total = cartItems.reduce((sum, item) => sum + (item.price * cart[item.id]), 0);

  const handlePlaceOrder = () => {
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex-1 w-full flex flex-col bg-[#F6F1EA] h-full justify-center items-center p-6 text-center z-50 absolute inset-0">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl mb-6">
          <CheckCircle className="w-16 h-16 text-[#FF611D]" />
        </div>
        <h2 className="text-2xl font-bold text-[#4B2E2A] mb-3">Pesanan Berhasil!</h2>
        <p className="text-[#78716C] font-medium leading-relaxed max-w-[280px]">
          Pesananmu sedang disiapkan. Silakan ambil pesanan secara mandiri di <span className="text-[#FF611D]">{restaurant.name}</span> dalam waktu 15 menit.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col bg-white h-full relative overflow-y-auto pb-24">
      {/* Header */}
      <div className="pt-10 px-4 pb-4 bg-[#F6F1EA] sticky top-0 z-10 border-b border-[#E7E5E4] flex items-center gap-3 shadow-sm">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-[#F6F1EA] rounded-2xl flex items-center justify-center text-[#4B2E2A] hover:bg-[#E7E5E4] transition-colors border border-[#E7E5E4]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-[#4B2E2A] leading-tight">Checkout Pick-up</h2>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Pickup Info Alert */}
        <div className="bg-[#FF611D]/10 border border-[#FF611D]/20 rounded-2xl p-4 flex gap-3 text-[#4B2E2A]">
          <Package className="w-6 h-6 text-[#FF611D] shrink-0" />
          <div>
            <h3 className="text-sm font-bold mb-1">Metode Pengambilan</h3>
            <p className="text-xs text-[#78716C] font-medium">Beli online dan ambil sendiri pesanan Anda langsung ke restoran tanpa antre.</p>
          </div>
        </div>

        {/* Pickup Location */}
        <div className="bg-white rounded-3xl p-5 border border-[#E7E5E4] shadow-sm">
          <div className="flex items-center gap-3 mb-3 border-b border-[#E7E5E4] pb-3">
            <div className="w-10 h-10 bg-[#F6F1EA] rounded-2xl flex items-center justify-center shrink-0 border border-[#E7E5E4]">
              <MapPin className="w-5 h-5 text-[#4B2E2A]" />
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-[#78716C] uppercase tracking-widest mb-0.5">Lokasi Pengambilan</h3>
              <p className="text-sm font-bold text-[#4B2E2A]">{restaurant.name}</p>
            </div>
          </div>
          <p className="text-xs text-[#78716C] leading-relaxed font-medium">
            {restaurant.address}
          </p>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-3xl p-5 border border-[#E7E5E4] shadow-sm">
          <div className="flex flex-col gap-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-[#F6F1EA] border border-[#E7E5E4] flex items-center justify-center shrink-0 text-xs font-bold text-[#44403C]">
                  {cart[item.id]}x
                </div>
                <div className="flex-1 mt-0.5">
                  <p className="text-sm font-bold text-[#4B2E2A] leading-tight mb-1">{item.name}</p>
                  <p className="text-sm font-bold text-[#78716C]">Rp{(item.price * cart[item.id]).toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <div className="mt-6 pt-5 border-t border-dashed border-[#A8A29E] flex flex-col gap-3">
            <div className="flex justify-between text-sm font-bold text-[#78716C]">
              <span>Subtotal</span>
              <span>Rp{total.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#78716C]">
              <span>Biaya Aplikasi</span>
              <span className="text-[#FF611D]">Gratis / Bebas Antre</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-[#4B2E2A] mt-3 pt-4 border-t border-[#E7E5E4]">
              <span>Total Bayar</span>
              <span className="text-[#4B2E2A]">Rp{total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E7E5E4] pb-safe z-50">
        <button 
          onClick={handlePlaceOrder}
          disabled={isOrdering}
          className="w-full bg-[#4B2E2A] text-white rounded-2xl h-14 flex items-center justify-center font-bold shadow-xl hover:opacity-90 transition-all disabled:opacity-75 disabled:scale-95"
        >
          {isOrdering ? 'Memproses Pesanan...' : 'Bayar & Proses Pesanan'}
        </button>
      </div>
    </div>
  );
}
