import { Store, Camera, ChevronLeft } from 'lucide-react';

interface CreateMenuScreenProps {
  onSelect: (action: 'add_resto' | 'add_post') => void;
  onBack: () => void;
}

export function CreateMenuScreen({ onSelect, onBack }: CreateMenuScreenProps) {
  return (
    <div className="flex-1 w-full bg-white h-full flex flex-col p-4 pt-10">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#4B2E2A] shadow-sm border border-[#E7E5E4] hover:bg-[#E7E5E4] transition-colors mr-3">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-[#4B2E2A]">Tambah Sesuatu</h1>
      </div>

      <div className="flex flex-col gap-4">
        <button 
          onClick={() => onSelect('add_post')}
          className="bg-white p-6 rounded-3xl border border-[#E7E5E4] shadow-sm hover:shadow-md transition-all text-left flex items-start gap-4"
        >
          <div className="w-14 h-14 bg-[#FF611D]/10 flex items-center justify-center rounded-2xl shrink-0">
            <Camera className="w-7 h-7 text-[#FF611D]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#4B2E2A] mb-1">Tulis Postingan Makanan</h2>
            <p className="text-sm text-[#78716C] leading-snug">Berbagi pengalaman makan enak dan temukan hidden gem makanan di sekitarmu.</p>
          </div>
        </button>

        <button 
          onClick={() => onSelect('add_resto')}
          className="bg-white p-6 rounded-3xl border border-[#E7E5E4] shadow-sm hover:shadow-md transition-all text-left flex items-start gap-4"
        >
          <div className="w-14 h-14 bg-[#4B2E2A]/5 flex items-center justify-center rounded-2xl shrink-0 border border-[#E7E5E4]">
            <Store className="w-7 h-7 text-[#4B2E2A]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#4B2E2A] mb-1">Tambah Resto/Toko Makanan</h2>
            <p className="text-sm text-[#78716C] leading-snug">Daftarkan tempat makan baru agar orang lain dapat menemukannya di peta.</p>
          </div>
        </button>
      </div>
    </div>
  );
}
