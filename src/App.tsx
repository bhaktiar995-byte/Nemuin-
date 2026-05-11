/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Home, List as MenuIcon, MapPin, Compass, PlusCircle, User, UtensilsCrossed, RefreshCw, Search } from 'lucide-react';
import { MapScreen } from './components/MapScreen';
import { ListScreen } from './components/ListScreen';
import { DetailScreen } from './components/DetailScreen';
import { ChatScreen } from './components/ChatScreen';
import { OrderScreen } from './components/OrderScreen';
import { FeedScreen } from './components/FeedScreen';
import { CreateMenuScreen } from './components/CreateMenuScreen';
import { AddFormsScreen } from './components/AddFormsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SpinWheelScreen } from './components/SpinWheelScreen';
import { RESTAURANTS, Restaurant, FOOD_POSTS } from './data/mock';

type ViewMode = 'map' | 'list' | 'detail' | 'chat' | 'order' | 'feed' | 'create_menu' | 'create_resto' | 'create_post' | 'profile' | 'spin';

export default function App() {
  const [view, setView] = useState<ViewMode>('list');
  const [prevView, setPrevView] = useState<'map' | 'list'>('list');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelectRestaurant = (restaurant: Restaurant, from: 'map' | 'list') => {
    if (selectedRestaurant?.id !== restaurant.id) {
      setCart({});
    }
    setSelectedRestaurant(restaurant);
    setPrevView(from);
    setView('detail');
  };

  const handleUpdateCart = (itemId: string, delta: number) => {
    setCart(prev => {
      const newQ = Math.max(0, (prev[itemId] || 0) + delta);
      const newCart = { ...prev };
      if (newQ === 0) delete newCart[itemId];
      else newCart[itemId] = newQ;
      return newCart;
    });
  };

  return (
    <div className="min-h-screen bg-white flex text-[#4B2E2A] font-sans overflow-hidden relative">
      {/* Sidebar Navigation */}
      <div 
        className={`hidden lg:flex flex-col bg-[#F6F1EA] h-screen sticky top-0 border-r border-[#E7E5E4] transition-all duration-300 z-[102] ${
          isSidebarOpen ? 'w-72' : 'w-20'
        }`}
      >
        <div className={`p-6 flex flex-col h-full ${!isSidebarOpen ? 'items-center' : ''}`}>
          <div className={`flex items-center mb-8 ${isSidebarOpen ? 'justify-end' : 'justify-center'}`}>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-[#E7E5E4] rounded-xl transition-colors text-[#78716C] shrink-0"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: 'list', label: 'Home', icon: Home },
              { id: 'map', label: 'Explore Map', icon: MapPin },
              { id: 'feed', label: 'Social Feed', icon: Compass },
              { id: 'profile', label: 'My Profile', icon: User },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setView(item.id as any); setPrevView('list'); }}
                title={!isSidebarOpen ? item.label : ''}
                className={`flex items-center rounded-2xl transition-all duration-300 font-bold group h-12 ${
                  isSidebarOpen ? 'px-4 gap-4' : 'justify-center w-12 mx-auto'
                } ${
                  view === item.id 
                    ? 'bg-[#FF611D] text-white shadow-lg shadow-orange-900/20' 
                    : 'text-[#78716C] hover:text-[#FF611D] hover:bg-white'
                }`}
              >
                <item.icon className={`shrink-0 ${view === item.id ? 'w-5 h-5 stroke-[2.5px]' : 'w-5 h-5 stroke-2'}`} />
                {isSidebarOpen && <span className="truncate">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <button 
              onClick={() => { setView('create_menu'); }}
              title={!isSidebarOpen ? 'Add New Space' : ''}
              className={`bg-[#4B2E2A] text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center transition-all shadow-xl active:scale-95 hover:bg-[#FF611D] ${
                isSidebarOpen ? 'w-full py-4 gap-2 px-4' : 'w-12 h-12 mx-auto'
              }`}
            >
              <PlusCircle className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="truncate">Add New Space</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Fallback for smaller screens if needed) */}
      <div className="flex-1 flex flex-col relative h-[100dvh] lg:h-screen overflow-hidden">
        {/* Main Content Area */}
        <div className="bg-white w-full h-full overflow-hidden flex flex-col relative z-0">
          <div className="flex-1 overflow-hidden relative">
            {view === 'map' && (
              <MapScreen 
                restaurants={RESTAURANTS} 
                onSelect={(r) => handleSelectRestaurant(r, 'map')} 
              />
            )}
            {view === 'list' && (
              <ListScreen 
                restaurants={RESTAURANTS} 
                onSelect={(r) => handleSelectRestaurant(r, 'list')} 
                onOpenSpinWheel={() => setView('spin')}
              />
            )}
            {view === 'spin' && (
              <SpinWheelScreen
                restaurants={RESTAURANTS}
                onSelect={(r) => handleSelectRestaurant(r, 'list')}
                onBack={() => setView('list')}
              />
            )}
            {view === 'detail' && selectedRestaurant && (
              <DetailScreen 
                restaurant={selectedRestaurant} 
                cart={cart}
                onUpdateCart={handleUpdateCart}
                onBack={() => setView(prevView)} 
                onChat={() => setView('chat')}
                onOrder={() => setView('order')}
              />
            )}
            {view === 'chat' && selectedRestaurant && (
              <ChatScreen 
                restaurant={selectedRestaurant} 
                onBack={() => setView('detail')} 
              />
            )}
            {view === 'order' && selectedRestaurant && (
              <OrderScreen 
                restaurant={selectedRestaurant} 
                cart={cart}
                onBack={() => setView('detail')} 
                onSuccess={() => {
                  setCart({});
                  setView('list');
                }}
              />
            )}
            {view === 'feed' && (
              <FeedScreen posts={FOOD_POSTS} />
            )}
            {view === 'create_menu' && (
              <CreateMenuScreen 
                onSelect={(action) => setView(action === 'add_resto' ? 'create_resto' : 'create_post')} 
                onBack={() => setView('feed')} 
              />
            )}
            {view === 'create_resto' && (
              <AddFormsScreen type="resto" onBack={() => setView('create_menu')} onSuccess={() => setView('list')} />
            )}
            {view === 'create_post' && (
              <AddFormsScreen type="post" onBack={() => setView('create_menu')} onSuccess={() => setView('feed')} />
            )}
            {view === 'profile' && (
              <ProfileScreen />
            )}
          </div>

          {/* Bottom Navigation (hide on detail view) */}
          {view !== 'detail' && view !== 'chat' && view !== 'order' && view !== 'create_resto' && view !== 'create_post' && view !== 'create_menu' && view !== 'spin' && (
            <div className="lg:hidden bg-[#F6F1EA] border-t border-[#E7E5E4] flex justify-around items-center h-20 px-2 pb-safe shrink-0 absolute bottom-0 left-0 right-0 z-[9999] shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
              <button 
                onClick={() => { setView('list'); setPrevView('list'); }}
                className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${view === 'list' ? 'text-[#FF611D]' : 'text-[#A8A29E]'}`}
              >
                <Home className={`w-6 h-6 mb-1 ${view === 'list' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                <span className="text-[10px] font-bold text-center">Home</span>
              </button>

              <button 
                onClick={() => { setView('map'); setPrevView('map'); }}
                className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${view === 'map' ? 'text-[#FF611D]' : 'text-[#A8A29E]'}`}
              >
                <MapPin className={`w-6 h-6 mb-1 ${view === 'map' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                <span className="text-[10px] font-bold text-center">Map</span>
              </button>
              
              <button 
                onClick={() => setView('create_menu')}
                className="flex items-center justify-center w-14 h-14 bg-[#4B2E2A] text-white rounded-full -translate-y-5 shadow-xl hover:bg-[#FF611D] transition-all duration-300 border-[6px] border-white active:scale-95"
              >
                <PlusCircle className="w-7 h-7" />
              </button>

              <button 
                onClick={() => { setView('feed'); setPrevView('list'); }}
                className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${view === 'feed' ? 'text-[#FF611D]' : 'text-[#A8A29E]'}`}
              >
                <Compass className={`w-6 h-6 mb-1 ${view === 'feed' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                <span className="text-[10px] font-bold text-center">Feed</span>
              </button>

              <button 
                onClick={() => { setView('profile'); setPrevView('list'); }}
                className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${view === 'profile' ? 'text-[#FF611D]' : 'text-[#A8A29E]'}`}
              >
                <User className={`w-6 h-6 mb-1 ${view === 'profile' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                <span className="text-[10px] font-bold text-center">Profile</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

