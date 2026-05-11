import { useState } from 'react';
import { Heart, MessageCircle, MapPin, Share2, UtensilsCrossed, X, Send } from 'lucide-react';
import { FoodPost } from '../data/mock';

interface FeedScreenProps {
  posts: FoodPost[];
}

export function FeedScreen({ posts }: FeedScreenProps) {
  const [showComments, setShowComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const selectedPost = posts.find(p => p.id === showComments);

  return (
    <div className="flex-1 w-full flex flex-col bg-white h-full relative overflow-hidden">
      {/* Header */}
      <div className="pt-12 px-6 pb-6 bg-[#F6F1EA] sticky top-0 z-10 border-b border-[#E7E5E4] shadow-sm">
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
      </div>

      {/* Feed List */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-[2rem] overflow-hidden border border-[#E7E5E4] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
              {/* Post Header */}
              <div className="p-5 flex items-center justify-between border-b border-[#F6F1EA]">
                <div className="flex items-center gap-3">
                  <img 
                    src={post.userAvatar} 
                    alt={post.user} 
                    className="w-10 h-10 rounded-full object-cover border border-[#E7E5E4]" 
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${post.user}&background=random` }}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-[#4B2E2A] hover:underline cursor-pointer">{post.user}</h3>
                    <p className="text-[10px] text-[#A8A29E] font-bold uppercase tracking-wider">{post.timeAgo}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#F6F1EA] flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-[#A8A29E]" />
                </div>
              </div>

              {/* Post Image */}
              <div className="w-full bg-[#E7E5E4] relative aspect-[4/3] overflow-hidden group">
                <img 
                  src={post.image} 
                  alt="Food discovery" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800' }}
                />
                {post.location && (
                  <div className="absolute bottom-4 left-4 bg-[#4B2E2A]/80 backdrop-blur text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg border border-white/20">
                    <MapPin className="w-3.5 h-3.5 text-[#FF611D]" />
                    {post.location}
                  </div>
                )}
              </div>

              {/* Post Text */}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-sm text-[#4B2E2A] leading-relaxed mb-6 line-clamp-3 italic">"{post.content}"</p>
                
                {/* Actions */}
                <div className="mt-auto flex items-center justify-between border-t border-[#F6F1EA] pt-5">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-[#78716C] hover:text-[#FF611D] transition-colors group">
                      <Heart className="w-5 h-5 group-hover:fill-current" />
                      <span className="text-xs font-bold">{post.likes}</span>
                    </button>
                    <button 
                      onClick={() => setShowComments(post.id)}
                      className="flex items-center gap-2 text-[#78716C] hover:text-[#FF611D] transition-colors group"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-xs font-bold">{post.comments}</span>
                    </button>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest text-[#FF611D] bg-[#F6F1EA] px-4 py-2 rounded-lg">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Prototype View (Bottom Sheet overlay) */}
      {showComments && selectedPost && (
        <div className="absolute inset-0 z-[10000] bg-black/60 flex items-end">
          <div className="w-full bg-white rounded-t-3xl h-[80%] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Sheet Header */}
            <div className="p-4 flex items-center justify-between border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#4B2E2A]">Komentar</h3>
                <span className="bg-[#F6F1EA] text-[#78716C] px-2 py-0.5 rounded text-xs font-bold">{selectedPost.comments}</span>
              </div>
              <button 
                onClick={() => setShowComments(null)}
                className="w-10 h-10 flex items-center justify-center bg-[#F6F1EA] rounded-full text-[#78716C] hover:bg-[#E7E5E4]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comments List (Prototype) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF611D]/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#FF611D]">AF</span>
                </div>
                <div className="flex-1 bg-[#F6F1EA] p-3 rounded-2xl rounded-tl-none">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-bold text-[#4B2E2A]">Afandika_11</span>
                    <span className="text-[10px] text-[#A8A29E]">5 menit yang lalu</span>
                  </div>
                  <p className="text-sm text-[#4B2E2A]">Wah beneran merjosari sebelah mana nih bang? Jadi pengen nyoba tar malem!</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-blue-600">KK</span>
                </div>
                <div className="flex-1 bg-[#F6F1EA] p-3 rounded-2xl rounded-tl-none">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-bold text-[#4B2E2A]">Kak_Kulang</span>
                    <span className="text-[10px] text-[#A8A29E]">12 menit yang lalu</span>
                  </div>
                  <p className="text-sm text-[#4B2E2A]">Sumpah emang enak bgt, sambelnya juara sih disitu.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 py-6">
                <div className="h-px bg-[#E7E5E4] flex-1" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#A8A29E]">Belum ada komentar lain</span>
                <div className="h-px bg-[#E7E5E4] flex-1" />
              </div>
            </div>

            {/* Input Fixed at Bottom */}
            <div className="p-4 border-t border-[#E7E5E4] pb-safe bg-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4B2E2A] flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-white">SF</span>
              </div>
              <div className="flex-1 bg-[#F6F1EA] rounded-2xl px-4 py-2 flex items-center border border-transparent focus-within:border-[#FF611D] transition-colors">
                <input 
                  type="text" 
                  placeholder="Tambah komentar..." 
                  className="flex-1 bg-transparent border-none focus:outline-none text-sm text-[#4B2E2A]"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button className={`ml-2 p-1.5 rounded-full transition-colors ${commentText.trim() ? 'bg-[#FF611D] text-white' : 'text-[#A8A29E]'}`}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
