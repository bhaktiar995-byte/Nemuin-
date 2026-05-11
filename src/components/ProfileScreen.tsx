import { User, Settings, LogOut, ChevronRight, Award, Heart, MessageSquare } from 'lucide-react';

export function ProfileScreen() {
  return (
    <div className="flex-1 w-full flex flex-col bg-white h-full overflow-y-auto">
      {/* Header Profile */}
      <div className="pt-16 pb-8 px-6 bg-[#F6F1EA] border-b border-[#E7E5E4] flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full border-4 border-[#FF611D] p-1 bg-white shadow-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" 
              alt="User" 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute bottom-1 right-1 bg-[#FF611D] p-1.5 rounded-full border-2 border-white shadow-sm">
            <Award className="w-4 h-4 text-white" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-[#4B2E2A]">Surya Firdaus</h2>
        <p className="text-sm text-[#78716C] font-medium">Local Guide Level 4 • Malang</p>
      </div>

      {/* Stats Area */}
      <div className="flex justify-around bg-white py-4 border-b border-[#E7E5E4] shadow-sm">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-[#4B2E2A]">12</span>
          <span className="text-[10px] uppercase font-bold text-[#A8A29E] tracking-wider">Posts</span>
        </div>
        <div className="w-px h-8 bg-[#E7E5E4] self-center"></div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-[#4B2E2A]">482</span>
          <span className="text-[10px] uppercase font-bold text-[#A8A29E] tracking-wider">Likes</span>
        </div>
        <div className="w-px h-8 bg-[#E7E5E4] self-center"></div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-[#4B2E2A]">45</span>
          <span className="text-[10px] uppercase font-bold text-[#A8A29E] tracking-wider">Comments</span>
        </div>
      </div>

      {/* Profile Menu */}
      <div className="p-4 flex flex-col gap-2 pb-24">
        {[
          { icon: Heart, label: 'Koleksi Tersimpan', color: 'text-rose-500' },
          { icon: MessageSquare, label: 'Ulasan Anda', color: 'text-blue-500' },
          { icon: Settings, label: 'Pengaturan Akun', color: 'text-[#78716C]' },
          { icon: LogOut, label: 'Keluar', color: 'text-rose-600' },
        ].map((item, idx) => (
          <button key={idx} className="w-full bg-white p-4 rounded-2xl flex items-center justify-between border border-[#E7E5E4] shadow-sm active:bg-[#F6F1EA] transition-colors">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-[#F6F1EA] ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-[#4B2E2A]">{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A8A29E]" />
          </button>
        ))}
      </div>
    </div>
  );
}
