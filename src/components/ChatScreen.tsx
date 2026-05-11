import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import { Restaurant } from '../data/mock';

interface ChatScreenProps {
  restaurant: Restaurant;
  onBack: () => void;
}

export function ChatScreen({ restaurant, onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState([
    { id: 1, text: `Hi! Welcome to ${restaurant.name}. How can we help you today?`, sender: 'resto' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMsgId = Date.now();
    setMessages(prev => [...prev, { id: newMsgId, text: input, sender: 'user' }]);
    setInput('');
    
    // Simulate auto-reply from resto
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now(), 
          text: "Thanks for reaching out! We have received your message and will be with you shortly.", 
          sender: 'resto' 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="flex-1 w-full flex flex-col bg-white h-full relative overflow-hidden">
      {/* Header */}
      <div className="pt-10 px-4 pb-4 bg-[#F6F1EA] sticky top-0 z-10 border-b border-[#E7E5E4] flex items-center gap-3 shadow-sm">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-[#F6F1EA] rounded-2xl flex items-center justify-center text-[#4B2E2A] hover:bg-[#E7E5E4] transition-colors border border-[#E7E5E4]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-[#4B2E2A] leading-tight">{restaurant.name}</h2>
          <p className="text-[11px] text-[#78716C] font-semibold flex items-center gap-1.5 uppercase tracking-wide mt-0.5">
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Online
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map(m => (
          <div 
            key={m.id} 
            className={`max-w-[80%] rounded-2xl p-3.5 shadow-sm ${
              m.sender === 'user' 
                ? 'bg-[#FF611D] text-white self-end rounded-br-sm' 
                : 'bg-white text-[#4B2E2A] border border-[#E7E5E4] self-start rounded-bl-sm'
            }`}
          >
            <p className="text-sm font-medium leading-relaxed">{m.text}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-[#E7E5E4] pb-safe z-10">
        <div className="flex gap-2 w-full">
          <div className="flex-1 bg-[#F6F1EA] rounded-2xl border border-[#E7E5E4] flex items-center px-4 h-14">
            <input 
              type="text"
              placeholder="Type your message..."
              className="flex-1 h-full bg-transparent border-none focus:outline-none text-sm font-medium text-[#4B2E2A]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
          </div>
          <button 
            onClick={handleSend}
            className="w-14 h-14 bg-[#4B2E2A] rounded-2xl flex items-center justify-center shrink-0 text-white shadow-md hover:opacity-90 transition-opacity"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
