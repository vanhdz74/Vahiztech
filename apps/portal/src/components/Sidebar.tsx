import React from 'react';
import { 
  Home, 
  LayoutGrid, 
  Folder, 
  ShoppingBag,
  ShieldCheck,
  Rocket,
  Sparkles
} from 'lucide-react';
import { KeycloakUser } from '../types/auth';

export type SidebarTab = 'home' | 'apps' | 'files' | 'create' | 'marketplace';

interface SidebarProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  onOpenSSODrawer: () => void;
  currentUser: KeycloakUser | null;
}

const navItems = [
  {
    id: 'home' as SidebarTab,
    label: 'Trang chủ',
    icon: Home,
  },
  {
    id: 'apps' as SidebarTab,
    label: 'Ứng dụng',
    icon: LayoutGrid,
  },
  {
    id: 'files' as SidebarTab,
    label: 'Tài nguyên',
    icon: Folder,
  },
  {
    id: 'create' as SidebarTab,
    label: 'AI Studio',
    icon: Rocket,
  },
  {
    id: 'marketplace' as SidebarTab,
    label: 'Hệ sinh thái',
    icon: ShoppingBag,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onOpenSSODrawer,
  currentUser,
}) => {
  return (
    <>
      {/* 1. Desktop Left Sidebar (hidden on mobile, visible on md and up) */}
      <aside className="hidden md:flex w-[86px] min-h-[calc(100vh-3.5rem)] bg-[#eef4fc]/95 dark:bg-[#0c1017]/95 backdrop-blur-md border-r border-blue-100/90 dark:border-slate-800 flex-col justify-between py-4 select-none shrink-0 transition-colors duration-200">
        {/* Top Navigation Icons */}
        <nav className="flex flex-col items-center gap-2.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-[68px] flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-white dark:bg-[#151c2b] text-blue-700 dark:text-blue-400 shadow-md shadow-blue-500/10 border border-blue-100/80 dark:border-slate-750 font-bold scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${
                  isActive ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400' : 'group-hover:scale-110 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[11px] mt-1 text-center leading-tight line-clamp-1 ${
                  isActive ? 'text-blue-700 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-400 font-medium'
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
            className="w-[68px] flex flex-col items-center justify-center p-2 rounded-2xl bg-white dark:bg-[#131926] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 transition group shadow-2xs hover:shadow-md"
            title="Mở Bảng Điều Khiển SSO & Keycloak IAM"
          >
            <div className="relative">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[10px] mt-1 font-mono font-bold text-emerald-700 dark:text-emerald-400">
              SSO Hub
            </span>
          </button>
        </div>
      </aside>

      {/* 2. Mobile Bottom Navigation Bar (visible only on mobile md:hidden, app-like experience) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0e131d]/95 backdrop-blur-xl border-t border-blue-100 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around select-none shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 font-medium'
              }`}
            >
              <div className={`p-1 rounded-lg transition-colors ${
                isActive ? 'bg-blue-50 dark:bg-blue-950/60' : ''
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400 stroke-[2.3]' : 'text-slate-500 dark:text-slate-400'}`} />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Quick SSO Hub Icon on Mobile */}
        <button
          onClick={onOpenSSODrawer}
          className="flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl text-emerald-600 dark:text-emerald-400 active:scale-95 transition"
        >
          <div className="relative p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 stroke-[2.3]" />
            <span className="absolute 0.5 top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-tight mt-0.5 leading-none">
            SSO
          </span>
        </button>
      </nav>
    </>
  );
};
