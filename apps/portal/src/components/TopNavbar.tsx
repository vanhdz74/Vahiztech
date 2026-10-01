import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  HelpCircle, 
  Bell, 
  Cloud, 
  ChevronDown, 
  Check, 
  Sparkles, 
  Shield, 
  LogOut, 
  Key, 
  Layers, 
  ExternalLink,
  Sun,
  Moon,
  X
} from 'lucide-react';
import { KeycloakUser } from '../types/auth';

interface TopNavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenPlans: () => void;
  onOpenSSODrawer: () => void;
  onOpenLoginModal: () => void;
  onOpenRegisterModal: () => void;
  onLogout: () => void;
  currentUser: KeycloakUser | null;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenPlans,
  onOpenSSODrawer,
  onOpenLoginModal,
  onOpenRegisterModal,
  onLogout,
  currentUser,
  isDarkMode,
  onToggleTheme,
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-14 bg-white/90 dark:bg-[#0e131d]/90 backdrop-blur-md border-b border-blue-100/90 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between select-none sticky top-0 z-40 transition-colors duration-200 shadow-[0_1px_4px_rgba(37,99,235,0.04)] dark:shadow-none">
      {/* 1. Mobile Search Overlay (when active) */}
      {isMobileSearchOpen ? (
        <div className="flex-1 flex items-center gap-2 sm:hidden animate-in fade-in duration-150">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm kiếm ứng dụng..."
              className="w-full h-9 pl-9 pr-8 bg-blue-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 rounded-full border border-blue-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400"
              >
                ✕
              </button>
            )}
          </div>
          <button
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-1.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <>
          {/* Brand Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="font-black text-sm sm:text-base tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Vahiztech
              </span>
              <span className="hidden sm:inline-block font-black text-sm sm:text-base tracking-tight text-slate-800 dark:text-slate-100 ml-1">
                Hub
              </span>
            </div>
          </div>

          {/* Desktop Search Bar (hidden on small mobile) */}
          <div className="hidden sm:flex flex-1 max-w-md mx-3 lg:mx-6">
            <div className="relative w-full flex items-center">
              <Search className="w-4 h-4 text-blue-500 dark:text-blue-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tìm ứng dụng (CourseDemy, VihoTask, AI...)"
                className="w-full h-9 pl-9 pr-8 bg-blue-50/50 dark:bg-slate-900 hover:bg-blue-50/80 dark:hover:bg-slate-850 focus:bg-white dark:focus:bg-slate-900 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-full border border-blue-200/80 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 focus:outline-none transition font-normal shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 justify-end shrink-0">
            {/* Mobile Search Button (visible on mobile only) */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="sm:hidden w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 transition"
              title="Tìm kiếm"
            >
              <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-amber-300 hover:text-blue-600 dark:hover:text-amber-200 bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200/60 dark:border-slate-700 transition active:scale-95 shadow-2xs"
              title={isDarkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600 animate-in spin-in-180 duration-200" />
              )}
            </button>

            {/* "Xem các gói" Button (desktop/tablet) */}
            <button
              onClick={onOpenPlans}
              className="hidden md:flex h-8 px-3 rounded-full border border-blue-200 dark:border-blue-800 hover:border-blue-300 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-950/40 hover:bg-blue-100/60 transition items-center gap-1.5 shadow-2xs active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Xem gói</span>
            </button>

            {/* "Đăng ký / Tạo Workspace" Button */}
            <button
              onClick={onOpenRegisterModal}
              className="h-8 px-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-blue-500/20 active:scale-95"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng ký / Tạo Workspace</span>
              <span className="sm:hidden">Đăng ký</span>
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition relative"
                title="Thông báo"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 text-left animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Thông Báo Hệ Sinh Thái</h4>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold px-2 py-0.5 rounded-full">3 mới</span>
                  </div>
                  <div className="space-y-2.5 mt-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700">
                      <div className="text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        CourseDemy v2.1 Live
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Hệ thống bài giảng E-Learning đã tích hợp xác thực OIDC PKCE.</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-teal-50/60 dark:bg-slate-800/60 border border-teal-100 dark:border-slate-700">
                      <div className="text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        VihoTask Sprint Board
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Kanban realtime đã sẵn sàng cho các đội nhóm Scrum.</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-purple-50/60 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700">
                      <div className="text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        Vahiz AI Assistant
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Sắp ra mắt phiên bản thử nghiệm trợ lý AI đa phương thức.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar Dropdown */}
            <div className="relative pl-0.5" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-blue-100 dark:ring-slate-700 hover:ring-blue-400 transition shadow-sm"
                title="Hồ sơ người dùng & Cài đặt"
              >
                {currentUser?.preferred_username ? currentUser.preferred_username[0].toUpperCase() : 'A'}
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 text-left animate-in fade-in duration-150">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow">
                      {currentUser?.preferred_username ? currentUser.preferred_username[0].toUpperCase() : 'U'}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{currentUser?.name || currentUser?.preferred_username || 'Vahiztech User'}</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 truncate">{currentUser?.email || 'user@vahiztech.com'}</div>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        onOpenSSODrawer();
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-300 flex items-center justify-between transition"
                    >
                      <span className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Quản lý SSO & Licenses</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        {currentUser?.licenses?.length || 0} active
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        onOpenRegisterModal();
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2 transition"
                    >
                      <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Tạo Không gian làm việc mới (Tenant)</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        onOpenPlans();
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Nâng cấp Vahiztech Suite Pro</span>
                    </button>

                    <button
                      onClick={() => {
                        onToggleTheme();
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-300 flex items-center justify-between transition"
                    >
                      <span className="flex items-center gap-2">
                        {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-600" />}
                        <span>Giao diện: {isDarkMode ? 'Chế độ tối (Dark)' : 'Chế độ sáng (Light)'}</span>
                      </span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    {currentUser ? (
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 transition"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Đăng xuất khỏi SSO Hub</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          onOpenLoginModal();
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow"
                      >
                        <Key className="w-3.5 h-3.5" />
                        <span>Đăng nhập Keycloak IAM</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};
