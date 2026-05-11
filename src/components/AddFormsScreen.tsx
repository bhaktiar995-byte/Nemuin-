import { useState, FormEvent } from 'react';
import { ChevronLeft, Camera, Send, Store } from 'lucide-react';

interface MockFormProps {
  type: 'resto' | 'post';
  onBack: () => void;
  onSuccess: () => void;
}

export function AddFormsScreen({ type, onBack, onSuccess }: MockFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1000);
  };

  const isResto = type === 'resto';

  return (
    <div className="flex-1 w-full flex flex-col bg-white h-full overflow-y-auto pb-safe">
      <div className="pt-10 px-4 pb-4 bg-[#F6F1EA] sticky top-0 z-10 border-b border-[#E7E5E4] flex items-center justify-between shadow-sm">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-[#4B2E2A]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-[#4B2E2A]">
          {isResto ? 'Tambah Tempat Makan' : 'Post Makanan'}
        </h1>
        <div className="w-10" />
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-6">
        {/* Mock Image Picker */}
        <div className="w-full h-48 bg-[#E7E5E4] rounded-3xl border-2 border-dashed border-[#A8A29E] flex flex-col items-center justify-center text-[#78716C] cursor-pointer hover:bg-[#D6D3D1] transition-colors">
          <Camera className="w-8 h-8 mb-2" />
          <span className="text-sm font-bold">Tekan untuk ambil foto</span>
        </div>

        <div className="flex flex-col gap-4">
          {isResto ? (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#78716C] uppercase tracking-widest pl-1">Nama Tempat</label>
                <input required type="text" placeholder="Cth: Ayam Bakar Pak Kumis" className="w-full h-12 bg-white rounded-xl px-4 text-sm font-medium border border-[#E7E5E4] focus:outline-none focus:border-[#FF611D]" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#78716C] uppercase tracking-widest pl-1">Kategori (Pilih salah satu)</label>
                <select className="w-full h-12 bg-white rounded-xl px-4 text-sm font-medium border border-[#E7E5E4] focus:outline-none focus:border-[#FF611D]">
                  <option>Lalapan</option>
                  <option>Ayam</option>
                  <option>Bakso</option>
                  <option>Nasi Goreng</option>
                  <option>Mie</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#78716C] uppercase tracking-widest pl-1">Alamat Lengkap</label>
                <input required type="text" placeholder="Detail lokasi / patokan" className="w-full h-12 bg-white rounded-xl px-4 text-sm font-medium border border-[#E7E5E4] focus:outline-none focus:border-[#FF611D]" />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#78716C] uppercase tracking-widest pl-1">Tulis Postingan Sesuatu</label>
                <textarea required placeholder="Wah gila bener ini ayamnya..." className="w-full h-32 bg-white rounded-xl p-4 text-sm font-medium border border-[#E7E5E4] focus:outline-none focus:border-[#FF611D] resize-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#78716C] uppercase tracking-widest pl-1">Tandai Lokasi (Opsional)</label>
                <div className="relative">
                  <Store className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
                  <input type="text" placeholder="Cari nama resto..." className="w-full h-12 bg-white rounded-xl pl-10 pr-4 text-sm font-medium border border-[#E7E5E4] focus:outline-none focus:border-[#FF611D]" />
                </div>
              </div>
            </>
          )}
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="mt-4 w-full h-14 bg-[#FF611D] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : (
            <>
              {isResto ? 'Kirim Pendaftaran' : 'Posting Sekarang'}
              <Send className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
