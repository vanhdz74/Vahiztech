import React from 'react';
import { 
  Home, 
  LayoutGrid, 
  Folder, 
  PenTool, 
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { KeycloakUser } from '../types/auth';

export type SidebarTab = 'home' | 'apps' | 'files' | 'create' | 'marketplace';

interface SidebarProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  onOpenSSODrawer: () => void;
  currentUser: KeycloakUser | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onOpenSSODrawer,
  currentUser,
}) => {
  const navItems = [
    {
      id: 'home' as SidebarTab,
      label: 'Trang chủ',
      altLabel: 'Головна',
      icon: Home,
    },
    {
      id: 'apps' as SidebarTab,
      label: 'Ứng dụng',
      icon: LayoutGrid,
    },
    {
      id: 'files' as SidebarTab,
      label: 'Tệp',
      icon: Folder,
    },
    {
      id: 'create' as SidebarTab,
      label: 'Tạo',
      icon: PenTool,
    },
    {
      id: 'marketplace' as SidebarTab,
      label: 'Stock & Marketplace',
      icon: ShoppingBag,
    },
  ];

  return (
    <aside className="w-[84px] min-h-[calc(100vh-3.5rem)] bg-[#131417] border-r border-[#22252a] flex flex-col justify-between py-4 select-none shrink-0">
      {/* Top Navigation Icons */}
      <nav className="flex flex-col items-center gap-3">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-16 flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl transition-all group ${
                isActive
                  ? 'bg-[#22252c] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a1c21]'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition ${isActive ? 'bg-[#2e333d]' : 'group-hover:scale-105'}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
              </div>
              <span className={`text-[10.5px] mt-1 text-center font-medium leading-tight line-clamp-2 ${
                isActive ? 'text-white font-semibold' : 'text-slate-400'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Hub & SSO Info Button */}
      <div className="flex flex-col items-center px-1">
        <button
          onClick={onOpenSSODrawer}
          className="w-16 flex flex-col items-center justify-center p-2 rounded-2xl bg-[#191b20] hover:bg-[#20232a] border border-[#262a33] text-slate-400 hover:text-white transition group shadow-sm"
          title="Mở Bảng Điều Khiển SSO & Keycloak IAM"
        >
          <div className="relative">
            <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-[10px] mt-1 font-mono font-medium text-emerald-300">
            SSO Hub
          </span>
        </button>
      </div>
    </aside>
  );
};
