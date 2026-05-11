import { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Star, UtensilsCrossed, RefreshCw } from 'lucide-react';
import { Restaurant } from '../data/mock';

interface ListScreenProps {
  restaurants: Restaurant[];
  onSelect: (r: Restaurant) => void;
  onOpenSpinWheel?: () => void;
}

export function ListScreen({ restaurants, onSelect, onOpenSpinWheel }: ListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const filtered = restaurants.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        r.foodCategories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCategory = activeCategory ? r.foodCategories.includes(activeCategory) || r.type === activeCategory : true;
    return matchSearch && matchCategory;
  });

  return (
    <div className="flex-1 w-full flex flex-col bg-white h-full">
      {/* Header */}
      <div className="pt-12 px-6 pb-6 bg-[#F6F1EA] sticky top-0 z-10 border-b border-[#E7E5E4] shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#FF611D] to-[#FFB80E] rounded-2xl shadow-lg shadow-orange-200">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF611D] to-[#FFB80E]">
                Nemuin
              </h1>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-[#78716C] -mt-1 ml-0.5">
                Semuanya pasti ketemu di nemuin
              </p>
            </div>
          </div>
          <button 
            onClick={onOpenSpinWheel}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-10 h-10 bg-[#FF611D] rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            </div>
            <span className="text-[8px] font-black uppercase text-[#4B2E2A] tracking-tighter">Lucky Spin</span>
          </button>
        </div>
        
        <div className="mt-6 flex gap-2 w-full">
          <div className="flex-1 bg-white rounded-2xl border border-[#E7E5E4] shadow-sm flex items-center px-4 h-12 text-wrap">
            <Search className="w-5 h-5 text-[#A8A29E]" />
            <input 
              type="text"
              placeholder="Cari makanan atau tempat..."
              className="flex-1 h-full bg-transparent border-none focus:outline-none px-3 text-sm text-[#4B2E2A]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="w-12 h-12 bg-white border border-[#E7E5E4] shadow-sm rounded-2xl flex items-center justify-center shrink-0 text-[#A8A29E]">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
        
        {/* Chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none pointer-events-auto">
          {['Lalapan', 'Ayam', 'Bakso', 'Nasi Goreng', 'Mie'].map(category => (
            <button 
              key={category} 
              onClick={() => setActiveCategory(activeCategory === category ? null : category)}
              className={`px-4 py-1.5 shadow-sm rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${activeCategory === category ? 'bg-[#4B2E2A] text-white border-[#4B2E2A]' : 'bg-white text-[#44403C] border-[#E7E5E4]'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col gap-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((r, i) => (
            <div 
              key={r.id} 
              className="bg-white rounded-3xl p-4 shadow-sm border border-[#E7E5E4] cursor-pointer translate-y-0 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              onClick={() => onSelect(r)}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <img 
                src={r.image} 
                alt={r.name} 
                className="w-full h-48 object-cover justify-center rounded-2xl mb-4" 
                referrerPolicy="no-referrer"
              />
              <div className="p-1">
                <div className="flex justify-between items-start mb-1">
                  <h2 className="text-lg font-bold text-[#4B2E2A] line-clamp-1">{r.name}</h2>
                  <div className="flex items-center bg-[#FF611D] text-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm shrink-0">
                    <Star className="w-3 h-3 fill-current mr-1" />
                    {r.rating}
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-[#78716C] mb-4 uppercase tracking-wider line-clamp-1">{r.foodCategories.join(' • ')}</p>
                
                <div className="flex items-center justify-between text-xs font-medium border-t border-[#F6F1EA] pt-4">
                  <span className="flex items-center text-[#A8A29E]">
                    <MapPin className="w-3 h-3 mr-1" />
                    {r.distance}
                  </span>
                  <span className="font-bold text-[#FF611D]">{r.priceRange}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-[#A8A29E] py-10">
            <Search className="w-12 h-12 mb-2 opacity-50" />
            <p className="font-bold">Makanannya tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}

